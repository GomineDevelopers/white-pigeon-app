<template>
  <van-row class="nav_bgm">
    <van-nav-bar title="修改密码" left-arrow @click-left="onBack()" />
    <van-row class="login_main_body">
      <van-row class="name_input">
        <van-field v-model="oldPassword" placeholder="请输入原密码" />
      </van-row>
      <van-row class="name_input">
        <van-field v-model="newPassword" type="password" placeholder="请输入新密码" />
      </van-row>
      <van-row class="name_input">
        <van-field v-model="newPasswordAgain" type="password" placeholder="再次输入新密码" />
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
        <van-button type="info">确&nbsp;定</van-button>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "changepassword",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      newPasswordAgain: "",
      authCode: ""
    };
  },
  created() {
    // H5 plus事件处理
    function plusReady() {
      // 设置系统状态栏背景为蓝色
      plus.navigator.setStatusBarBackground("#2A76FF");
      plus.navigator.setStatusBarStyle("light");
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
    }
  }
};
</script>
<style scoped>
</style>