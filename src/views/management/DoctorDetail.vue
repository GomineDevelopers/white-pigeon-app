<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="医生详情" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="doctor_detail">
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">医生姓名</span>
        <span>张豆豆</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">所属医院</span>
        <span>北京协和医院</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">科室</span>
        <span>骨科</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">性别</span>
        <span>男</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">客户状态</span>
        <span>离职</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">职务</span>
        <span>副主任医师</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">学历</span>
        <span>本科</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">专业人士分类</span>
        <span>执业医师</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">学术头衔</span>
        <span>教授</span>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "doctordetail",
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
.doctor_detail {
  margin-top: 2rem;
  padding: 0rem 1rem;
}
.doctor_detail {
  text-align: left;
}
.doctor_detail_item {
  padding: 0.6rem 0rem;
}
.doctor_detail_item span:nth-child(2) {
  color: #a8aec1;
}
</style>
