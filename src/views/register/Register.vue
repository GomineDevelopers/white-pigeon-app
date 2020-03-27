<template>
  <van-row class="register">
    <van-nav-bar title="注册" left-arrow @click-left="onBack()" />
    <van-row class="login_main_body">
      <van-row class="name_input">
        <van-field v-model="phone" type="number" placeholder="请输入手机号" />
      </van-row>
      <van-row class="name_input">
        <van-field v-model="password" type="password" placeholder="请输入密码" />
      </van-row>
      <van-row class="name_input">
        <van-field v-model="passwordAgain" type="password" placeholder="再次输入密码" />
      </van-row>
      <van-row class="password_input">
        <van-col span="14">
          <van-field v-model="authCode" placeholder="请输入验证码" />
        </van-col>
        <van-col span="10" class="forget_password_btn">
          <span></span>
          <i v-if="isDisable" @click="getAuthCode">获取验证码</i>
          <i class="disabled_i" v-if="!isDisable">{{ time }}秒后重试</i>
        </van-col>
      </van-row>
      <van-row class="login_btn">
        <van-button
          @click="registerInfo"
          :loading="loading"
          type="info"
          loading-text="注册中..."
          text="注 册"
        />
        <!-- <van-button type="info" @click="registerInfo" :loading="loading"
          type="info"
          :loading-text="loadingText"
          text="确认">注&nbsp;册</van-button> -->
      </van-row>
    </van-row>
    <van-row class="login_protocol flex flex_align_center flex_justify_center">
      <van-checkbox v-model="checked" shape="square">我已阅读并同意</van-checkbox>
      <router-link :to="{ path: '/loginprotocol' }">《用户注册协议》</router-link>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      phone: "",
      password: "",
      passwordAgain: "",
      authCode: "",
      isDisable: true,
      checked: true,
      time: 60,
      timer: null,
      loading: false
    };
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
    onBack() {
      history.back();
    },
    //定时器
    cutDown() {
      this.time = 60;
      this.isDisable = false;
      this.timer = window.setInterval(() => {
        this.time--;
        // console.log(this.time);
        if (this.time <= 0) {
          this.isDisable = true;
          window.clearInterval(this.timer);
        }
      }, 1000);
    },
    //获取验证码
    getAuthCode() {
      let vm = this;
      let regs = /^1[3456789]\d{9}$/;
      if (!regs.test(this.phone)) {
        this.$notify({
          type: "warning",
          message: "手机号码有误，请重新输入！"
        });
        return false;
      }
      let postData = { mobile: this.phone, type: 1 };
      if (this.isDisable) {
        this.$api
          .authCode(postData)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              this.isDisable = false;
              this.$toast.success("验证码发送成功");
              this.cutDown();
            } else if (res.code == 2004) {
              this.$toast.fail("此手机号已经注册");
            } else if (res.code == 2003) {
              this.$toast.fail("验证码发送失败");
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$toast.fail("操作频繁，请稍后再试");
      }
    },
    //点击注册
    registerInfo() {
      let regs = /^1[3456789]\d{9}$/;
      if (!regs.test(this.phone)) {
        this.$notify({
          type: "warning",
          message: "手机号码有误，请重新输入！"
        });
        return false;
      }
      if (this.password == "" || this.passwordAgain == "") {
        this.$notify({
          type: "warning",
          message: "请输入密码！"
        });
        return false;
      }
      if (this.password != this.passwordAgain) {
        this.$notify({
          type: "warning",
          message: "两次输入密码不一致！"
        });
        return false;
      }
      if (this.authCode == "") {
        this.$notify({
          type: "warning",
          message: "请输入验证码！"
        });
        return false;
      }
      if (!this.checked) {
        this.$notify({
          type: "warning",
          message: "请阅读并同意《用户注册协议》！"
        });
        return false;
      }
      this.loading = true;
      let postData = {
        mobile: this.phone,
        password: this.password,
        confirmPasswd: this.passwordAgain,
        code: this.authCode
      };
      this.$api
        .register(postData)
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$toast.success("注册成功！");
            setTimeout(() => {
              this.$router.push({ path: "/loginpassword" });
            }, 1500);
          } else {
            this.$toast.fail(res.message);
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    }
  }
};
</script>

<style scpoed>
.register {
  height: 100vh;
  position: relative;
}
.login_protocol {
  /* position: absolute;
  bottom: 1.875rem;
  left: 0;
  right: 0; */
  text-align: center;
  font-size: 0.625rem;
  margin-top: 35vh;
}
.van-checkbox__icon {
  font-size: 0.75rem;
}
.login_protocol span {
  font-size: 0.625rem;
}
</style>
