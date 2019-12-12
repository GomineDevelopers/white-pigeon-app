<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="关于小白" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="setting_body">
      <van-row class="setting_item flex flex_align_center justify_between">
        <span class="flex_1">联系我们</span>
        <span>7345-43631515</span>
      </van-row>
      <van-row class="setting_item flex flex_align_center justify_between">
        <span class="flex_1">意见反馈</span>
        <span>mog@famcigmic.ne</span>
      </van-row>
      <!-- <van-row class="setting_item flex flex_align_center justify_between">
        <span class="flex_1">使用协议</span>
        <van-icon name="arrow" class="right_icon" />
      </van-row> -->
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "usersetting",
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
.setting_item span:nth-child(2) {
  color: #a8aec1;
}
</style>
