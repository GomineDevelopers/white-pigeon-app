<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="会议详情" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="doctor_detail">
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">产品</span>
        <span>产品1</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">会议主题</span>
        <span>产品介绍</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">医院</span>
        <span>上海长海医院</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">所属科室</span>
        <span>骨科</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">开始时间</span>
        <span>2019-05-20 16:00</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">演讲人</span>
        <span>XXX</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">人数</span>
        <span>15</span>
      </van-row>
      <van-row class="doctor_detail_item">
        <span>照片上传</span>
        <van-row class="visit_photo">
          <img :src="imgItem" v-for="(imgItem,index) in visitPhoto" :key="index" />
        </van-row>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "visitdetailcontent",
  data() {
    return {
      visitPhoto: [
        require("../../assets/image/img1.jpg"),
        require("../../assets/image/img2.jpg"),
        require("../../assets/image/img1.jpg")
      ]
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
.visit_photo img {
  width: 31%;
  height: 4.1rem;
  margin-right: 0.3125rem;
}
.visit_photo img:nth-child(3n) {
  margin-right: 0rem;
}
</style>
