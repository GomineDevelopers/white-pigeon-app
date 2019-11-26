<template>
  <van-row>
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
        <van-col span="10" class="forget_password_btn" @click="getAuthCode">
          <span></span> 获取验证码
        </van-col>
      </van-row>
      <van-row class="login_btn">
        <van-button type="info" @click="registerInfo">注&nbsp;册</van-button>
      </van-row>
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
      authCode: ""
    };
  },
  methods: {
    onBack() {
      history.back();
    },
    //获取验证码
    getAuthCode() {
      let regs = /^1[3456789]\d{9}$/;
      if (!regs.test(this.phone)) {
        this.$notify({
          type: "warning",
          message: "手机号码有误，请重新输入！"
        });
        return false;
      }
      let postData = { mobile: this.phone, type: 1 };
      this.$api
        .authCode(postData)
        .then(res => {
          console.log(res);
        })
        .catch(error => {});
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
      let data = {
        mobile: this.phone,
        password: this.password,
        confirmPasswd: this.passwordAgain,
        code: this.authCode
      };
      // $api
      //   .register()
      //   .then(res => {})
      //   .catch(error => {});

      //this.$router.push({ path: "/" });
    }
  }
};
</script>
<style scoped>
</style>