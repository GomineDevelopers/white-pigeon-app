<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="设置" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="setting_body">
      <van-row class="setting_item flex flex_align_center justify_between" @click="editPassword">
        <span class="flex_1">修改密码</span>
        <van-icon name="arrow" class="right_icon" />
      </van-row>
      <van-row class="setting_item flex flex_align_center justify_between" @click="goBankCard">
        <span class="flex_1">银行卡管理</span>
        <van-icon name="arrow" class="right_icon" />
      </van-row>
      <van-row class="setting_item flex flex_align_center justify_between" @click="goAbout">
        <span class="flex_1">关于小白</span>
        <van-icon name="arrow" class="right_icon" />
      </van-row>
      <van-row class="setting_item flex flex_align_center justify_between" @click="goNotice">
        <span class="flex_1">平台公告</span>
        <van-icon name="arrow" class="right_icon" />
      </van-row>
      <van-row class="public_btn">
        <!-- <button @click="loginOut">退出登录</button> -->
        <van-button
          @click="loginOut"
          :loading="loading"
          type="info"
          :loading-text="loadingText"
          text="退出登录"
        />
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "usersetting",
  data() {
    return {
      loadingText: "正在退出中...",
      loading: false
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
    // 退出登录
    loginOut() {
      this.loading = true;
      this.$api
        .loginOut()
        .then(res => {
          console.log(res);
          this.loading = false;
          this.$store.commit("setToken", null);
          this.$dialog
            .alert({
              message: res.message
            })
            .then(res => {
              this.$router.replace("/loginpassword");
            });
        })
        .catch(err => {
          this.$dialog
            .alert({
              message: "请先登录"
            })
            .then(res => {
              this.$router.replace("/loginpassword");
            });
        });
    },

    onBack() {
      history.back();
    },
    editPassword() {
      this.$router.push({ path: "/changepassword" });
    },
    goAbout() {
      this.$router.push({ path: "/about" });
    },
    goBankCard() {
      this.$router.push({ path: "/bankcard" });
    },
    goNotice() {
      this.$router.push({ path: "/notice" });
    }
  }
};
</script>
<style scoped>
.setting_body {
  margin-top: 2rem;
  text-align: left;
}
.setting_item {
  border-bottom: 1px solid #eee;
  padding: 0.7rem 1rem;
}
.setting_item .right_icon {
  color: #c7c7cc;
  font-size: 0.75rem;
}
.public_btn {
  padding: 1rem;
}
</style>
