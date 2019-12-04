<template>
  <van-row class="visit">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="创建拜访" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body2">
      <visit-apply-form></visit-apply-form>
    </van-row>
  </van-row>
</template>
<script>
import VisitApplyForm from "../components/VisitApplyForm";
import { upload } from '@/js/upload'
export default {
  name: "visit",
  components: {
    "visit-apply-form": VisitApplyForm
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
    },
  }
};
</script>
<style>
.info_module .van-icon-replay {
  color: #1f95ff;
}
.info_module .van-cell {
  padding: 0.18rem 0rem 0rem 0rem;
  font-size: 0.625rem;
}

</style>
<style scoped>
.visit {
  margin-top: 2rem;
  overflow: auto;
}
.main_body2 {
  text-align: left;
  overflow-y: auto;
}
</style>