<template>
  <van-row>
    <van-nav-bar title="登录" />
    <van-row class="login_main_body">
      <van-row class="header_text">
        您好，
        <br />欢迎来到小白鸽！
      </van-row>
      <van-row>
        <van-row class="name_input">
          <van-field v-model="userName" placeholder="请输入手机号" />
        </van-row>
        <van-row class="password_input">
          <van-col span="16">
            <van-field v-model="password" type="password" placeholder="请输入密码" />
          </van-col>
          <van-col span="8" class="forget_password_btn">
            <span></span>
            <router-link :to="{ path: '/RetrievePassword' }">忘记密码</router-link>
          </van-col>
        </van-row>
        <van-row class="login_btn">
          <van-button type="info" @click="login">登&nbsp;录</van-button>
        </van-row>
        <van-row class="other_operation flex">
          <van-col span="12" class="justify_left">
            <router-link :to="{ path: '/loginsms' }">短信验证码登录</router-link>
          </van-col>
          <van-col span="12" class="justify_right">
            <router-link :to="{ path: '/register' }">新用户注册</router-link>
          </van-col>
        </van-row>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "loginpassword",
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$router.push({ path: "/answer" }); //跳转到识别测试
    }
  }
};
</script>

<style scpoed>
</style>