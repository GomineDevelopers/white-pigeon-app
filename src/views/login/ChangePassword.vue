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
        <van-col span="10" class="forget_password_btn" @click="getCode">
          <span></span> 获取验证码
        </van-col>
      </van-row>
      <van-row class="login_btn" @click="changePassword">
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
      isDisable: true,
      oldPassword: "",
      newPassword: "",
      newPasswordAgain: "",
      authCode: "",
      phone: ""
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
  mounted() {
    this.getUserInfo();
  },
  methods: {
    onBack() {
      history.back();
    },
    getUserInfo() {
      this.$api
        .userInfo()
        .then(res => {
          if (res.code == 200) {
            this.phone = res.user.email;
          }
          // console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取验证码
    getCode() {
      console.log(this.phone);
      //修改密码type=2
      let postData = { mobile: this.phone, type: 2 };
      if (this.isDisable) {
        this.$api
          .authCode(postData)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              this.isDisable = false;
              this.$toast.success("验证码发送成功！");
            }
            setTimeout(() => {
              this.isDisable = true;
            }, 60000);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$toast.fail("操作频繁，请稍后再试！");
      }
    },
    //修改密码
    changePassword() {
      if (this.oldPassword == "" || this.newPassword == "") {
        this.$notify({
          type: "warning",
          message: "请输入密码！"
        });
        return false;
      }
      if (this.newPassword != this.newPasswordAgain) {
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
        password: this.oldPassword,
        newPassword: this.newPassword,
        confirmNewPassword: this.newPasswordAgain,
        code: this.authCode
      };
      this.$api
        .changePassword(postData)
        .then(res => {
          if (res.code == 200) {
            this.$toast.success("密码修改成功！");
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
    }
  }
};
</script>
<style scoped></style>
