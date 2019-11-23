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
          <van-field v-model="phone" type="number" placeholder="请输入手机号" />
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
          <van-button type="info" @click="login">登&nbsp;录</van-button>
        </van-row>
        <van-row class="other_operation flex">
          <van-col span="12" class="justify_left">
            <router-link :to="{ path: '/' }">密码登录</router-link>
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
  name: "loginsms",
  data() {
    return {
      phone: "",
      authCode: ""
    };
  },
  methods: {
    login() {
      let regs = /^1[3456789]\d{9}$/;
      if (!regs.test(this.phone)) {
        this.$notify({
          type: "warning",
          message: "手机号码有误，请重新输入！"
        });
        return false;
      }
      if (this.authCode.length == 0) {
        this.$notify({
          type: "warning",
          message: "请输入验证码！"
        });
        return false;
      }
      this.$router.push({ path: "/answer" }); //跳转到识别测试
    },
    getAuthCode() {
      let regs = /^1[3456789]\d{9}$/;
      if (!regs.test(this.phone)) {
        this.$notify({
          type: "warning",
          message: "手机号码有误，请重新输入！"
        });
        return false;
      }
    }
  }
};
</script>

<style scpoed>
</style>