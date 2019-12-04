<template>
  <van-row class="self_study">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="新人自学" left-arrow @click-left="onBack()" />
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "selfstudy",
  data() {
    return {};
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
<style scoped></style>
