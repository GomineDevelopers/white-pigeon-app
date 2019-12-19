<template>
  <van-row class="visit">
    <van-row class="approve_nav flex">
      <span :class="active ? 'active' : ''" @click="active = !active">拜访</span>
      <span :class="active ? '' : 'active'" @click="active = !active">会议</span>
    </van-row>
    <van-row class="main_body2">
      <!-- 拜访 -->
      <van-row v-show="active">
        <visit-apply-form></visit-apply-form>
      </van-row>
      <van-row v-show="!active">
        <metting-apply-form></metting-apply-form>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
import MettingApplyForm from "../../components/MettingApplyForm";
import VisitApplyForm from "../../components/VisitApplyForm";
export default {
  name: "visit",
  components: {
    "metting-apply-form": MettingApplyForm,
    "visit-apply-form": VisitApplyForm
  },
  data() {
    return {
      active: true
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
  methods: {}
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
  margin-top: 3.125rem;
  height: 86vh;
  overflow: hidden;
}
.main_body2 {
  text-align: left;
  height: 76vh;
  overflow-y: auto;
}
.approve_nav {
  height: 1.55rem;
  line-height: 1.55rem;
  width: 13.125rem;
  background: #f3f3f3;
  font-size: 0.875rem;
  color: #3399ff;
  margin: 0 auto;
  border-radius: 1.375rem;
  justify-content: space-between;
}
.approve_nav span {
  flex: 1;
  font-size: 0.75rem;
  border-radius: 1.375rem;
}
.approve_nav span.active {
  background: #3399ff;
  color: #fff;
}
</style>
