<template>
  <van-row>
    <van-nav-bar title="找回密码" left-arrow @click-left="onBack()" />
    <van-row class="login_main_body">
      <van-row class="name_input">
        <van-field v-model="phone" type="number" placeholder="请输入手机号" />
      </van-row>
      <van-row class="name_input">
        <van-field v-model="password" type="password" placeholder="请输入新密码" />
      </van-row>
      <van-row class="name_input">
        <van-field v-model="passwordAgain" type="password" placeholder="再次输入新密码" />
      </van-row>
      <van-row class="password_input">
        <van-col span="14">
          <van-field v-model="authCode" placeholder="请输入验证码" />
        </van-col>
        <van-col span="10" class="forget_password_btn">
          <span></span>
          <i v-if="isDisable" @click="getAuthCode">获取验证码</i>
          <i v-if="!isDisable" class="disabled_i">获取验证码</i>
        </van-col>
      </van-row>
      <van-row class="login_btn" @click="confirmInfo">
        <van-button type="info">确&nbsp;定</van-button>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
import { setInterval } from "timers";
import { minDate } from "../../js/public";
export default {
  name: "retrivepassword",
  data() {
    return {
      isDisable: true,
      phone: "",
      password: "",
      passwordAgain: "",
      authCode: ""
    };
  },
  created() {
    // H5 plus事件处理
    function plusReady() {
      // 设置系统状态栏背景为白色
      plus.navigator.setStatusBarBackground("#FFF");
      plus.navigator.setStatusBarStyle("dark");
    }
    if (window.plus) {
      plusReady();
    } else {
      document.addEventListener("plusready", plusReady, false);
    }
  },
  methods: {
    onBack() {
      history.back();
    },
    // cutDown() {
    //   this.time = 60;
    //   this.isDisable = false;
    //   this.timer = setInterval(() => {
    //     this.time--;
    //     console.log(this.time);
    //     if (this.time <= 0) {
    //       this.isDisable = true;
    //       clearInterval(this.timer);
    //       this.timer = null;
    //     }
    //   }, 1000);
    //   this.$once("hook:beforeDestroy", () => {
    //     clearInterval(this.timer);
    //   });
    // },
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
      let postData = {
        mobile: this.phone,
        type: 2
      };
      if (this.isDisable) {
        this.$api
          .authCode(postData)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              this.isDisable = false;
              this.$toast.success("验证码发送成功！");
              setTimeout(() => {
                this.isDisable = true;
              }, 60000);
            } else if (res.code == 2004) {
              this.$toast.fail("此手机号还没注册！");
            } else if (res.code == 2003) {
              vm.isDisable = false;
              this.$toast.fail("验证码发送失败！");
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$toast.fail("操作频繁，请稍后再试！");
      }
    },
    //点击确定
    confirmInfo() {
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
      let postData = {
        mobile: this.phone,
        password: this.password,
        confirmPasswd: this.passwordAgain,
        code: this.authCode
      };
      this.$api
        .forgetPassword(postData)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$toast.success("找回密码成功！");
            localStorage.removeItem("token");
            this.$router.push({ path: "/" });
          } else {
            this.$toast.fail(res.message);
          }
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
      // this.$router.push({ path: "/" });
    }
  }
};
</script>
