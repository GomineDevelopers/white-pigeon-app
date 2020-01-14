<template>
  <van-row>
    <van-nav-bar title="登录" />
    <van-row class="login_main_body">
      <van-row class="header_text">
        您好，
        <br />欢迎来到朱鹊医访！
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
          <van-button type="info" :loading="loading" :loading-text="loadingText" @click="login"
            >登&nbsp;录</van-button
          >
        </van-row>
        <van-row class="other_operation flex">
          <!-- <van-col span="12" class="justify_left">
            <router-link :to="{ path: '/loginsms' }">短信验证码登录</router-link>
          </van-col>-->
          <van-col span="24" class="justify_left">
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
      loadingText: "登录中...",
      loading: false,
      phone: "",
      password: "",
      error: "",
      res: "",
      clientid: ""
    };
  },
  created() {
    let _this = this;
    // H5 plus事件处理
    function plusReady() {
      // 设置系统状态栏背景为白色
      plus.navigator.setStatusBarBackground("#FFF");
      plus.navigator.setStatusBarStyle("dark");

      _this.clientid = plus.push.getClientInfo().clientid;
      if (_this.clientid == null || !_this.clientid) {
        //如果获取的cid为空，说明客户端向推送服务器注册还未完成，可以使用setTimeout延时重试。
        setTimeout(() => {
          _this.clientid = plus.push.getClientInfo().clientid;
        }, 3000);
      }
    }
    if (window.plus) {
      plusReady();
    } else {
      document.addEventListener("plusready", plusReady, false);
    }
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
      this.loading = true;
      let postData = {
        email: this.phone,
        password: this.password
      };
      this.$api
        .loginPassword(postData)
        .then(res => {
          // console.log(res);
          this.loading = false;
          if (res.code == 200) {
            this.$store.commit("setToken", res.token); //设置store中token
            localStorage.setItem("token", res.token);
            this.$api
              .userInfo()
              .then(res => {
                // console.log("用户信息", res);
                if (res.code == 200) {
                  if (res.user.status != 1) {
                    this.$toast.fail("该账号已注销");
                    return false;
                  } else {
                    this.$toast.success("登录成功！");
                    this.$store.state.userInfo = res.user; //在store中存用户信息
                    if (res.user.is_regional_mangager == 1) {
                      localStorage.setItem("role", 1); //本地存储区域经理的角色  1-经理  2-普通用户
                      this.$router.replace({ path: "/approveindex" });
                    } else {
                      localStorage.setItem("role", 2);
                      this.updateCid();
                      if (
                        (res.user.invite_code == null || res.user.invite_code == "") &&
                        res.user.identify_status != 1
                      ) {
                        localStorage.setItem("isAnswer", false); //用户是否答题
                        this.$router.replace({ path: "/answer" });
                      } else {
                        localStorage.setItem("isAnswer", true); //用户是否答题
                        if (this.$route.query.redirect) {
                          console.log("重定向地址", this.$route.query.redirect);
                          this.$router.replace({
                            path: decodeURIComponent(this.$route.query.redirect)
                          });
                        } else {
                          this.$router.replace({ path: "/" });
                        }
                      }
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
          this.loading = false;
          console.log(error);
        });
    },
    updateCid() {
      if (this.clientid != null) {
        this.$api
          .updateCid({ cid: this.clientid })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style scoped>
.header_text {
  margin-top: 1rem !important;
}
</style>
