<template>
  <van-row class="newmetting">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="创建会议" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <metting-apply-form></metting-apply-form>
    </van-row>
  </van-row>
</template>
<script>
import MettingApplyForm from "../components/MettingApplyForm";
export default {
  name: "newmetting",
  components: {
    "metting-apply-form": MettingApplyForm
  },
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
