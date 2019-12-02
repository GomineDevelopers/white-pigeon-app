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
          <van-col span="16">
            <van-field v-model="password" type="password" placeholder="请输入密码" />
          </van-col>
          <van-col span="8" class="forget_password_btn">
            <span></span>
            <router-link :to="{ path: '/retrievePassword' }">忘记密码</router-link>
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
      phone: "",
      password: "",
      error: "",
      res: ""
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
      if (this.password.length == 0) {
        this.$notify({
          type: "warning",
          message: "请输入密码！"
        });
        return false;
      }
      let postData = {
        email: this.phone,
        password: this.password
      };
      this.$api
        .loginPassword(postData)
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$toast.success("登录成功！");
            this.$store.commit("setToken", res.token); //设置store中token
            localStorage.setItem("token", res.token);
            this.$api
              .userInfo()
              .then(res => {
                // console.log(res);
                if (res.user.is_regional_mangager == 1) {
                  localStorage.setItem("role", 1); //本地存储区域经理的角色  1-经理  2-普通用户
                  this.$router.push({ path: "/approveindex" });
                } else {
                  localStorage.setItem("role", 2);
                  if (
                    (res.user.invite_code == null || res.user.invite_code == "") &&
                    res.user.identify_status != 1
                  ) {
                    this.$router.push({ path: "/answer" });
                  } else {
                    if (this.$route.query.redirect) {
                      console.log("重定向地址", this.$route.query.redirect);
                      this.$router.push({ path: decodeURIComponent(this.$route.query.redirect) });
                    } else {
                      this.$router.push({ path: "/" });
                    }
                  }
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else if (res.code == 401) {
            this.$toast.fail("用户名或密码错误");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scpoed></style>
