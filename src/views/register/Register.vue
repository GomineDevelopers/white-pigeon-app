<template>
  <van-row>
    <van-nav-bar title="注册" left-arrow @click-left="onBack()" />
    <van-row class="login_main_body">
      <van-row class="name_input">
        <van-field v-model="userName" placeholder="请输入手机号" />
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
      userName: "",
      password: "",
      passwordAgain: "",
      authCode: ""
    };
  },
  methods: {
    onBack() {
      history.back();
    },
    registerInfo() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style scoped>
</style>