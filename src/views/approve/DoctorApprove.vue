<template>
  <van-row class="approve_detail">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="审批" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row>
        <ul>
          <li>
            <span>申请人：</span>
            <span>XXX</span>
          </li>
          <li>
            <span>医院：</span>
            <span>复旦大学附属眼耳鼻喉科医院</span>
          </li>
          <li>
            <span>承诺销量：</span>
            <span>产品1 - 2153/月</span>
          </li>
          <li>
            <span>申请时间：</span>
            <span>2019.10.15 15:32:32</span>
          </li>
        </ul>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "DoctorApprove",
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
  }
};
</script>
<style scoped>
</style>