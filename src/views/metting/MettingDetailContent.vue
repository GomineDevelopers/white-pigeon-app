<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="会议详情" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="doctor_detail">
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">产品</span>
        <span>{{ metting.product_name }}-{{metting.specification}}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">会议主题</span>
        <span>{{ metting.product_topic }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">医院</span>
        <span>{{ metting.hospital_name }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">所属科室</span>
        <span>{{ metting.section_name }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">开始时间</span>
        <span>{{ metting.start_time }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">演讲人</span>
        <span>{{ metting.speaker }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">人数</span>
        <span>{{ metting.num }}</span>
      </van-row>
      <van-row class="doctor_detail_item">
        <span>照片上传</span>
        <van-row class="visit_photo">
          <img v-if="metting.personnel_image" :src="metting.personnel_image" />
          <img v-if="metting.personnel_image_two" :src="metting.personnel_image_two" />
          <img v-if="metting.sign_image" :src="metting.sign_image" />
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
      metting: {
        product_name: "",
        product_topic: "",
        hospital_name: "",
        section_name: "",
        start_time: "",
        speaker: "",
        num: "",
        personnel_image: "",
        personnel_image_two: "",
        sign_image: "",
        specification:""
      }
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
    this.getMetting();
  },
  methods: {
    onBack() {
      history.back();
    },
    //获取会议详情
    getMetting() {
      this.$toast.loading({
        message: "数据加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner"
      });
      // console.log("会议id", this.$route.query.id);
      let params = { meeting_id: this.$route.query.id };
      this.$api
        .meetingDetail(params)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$toast.clear();
            this.metting = res.meeting_detail[0];
          }
        })
        .catch(error => {
          console.log(error);
        });
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
.doctor_detail_item span:nth-child(1) {
  white-space: nowrap;
  margin-right: 1rem;
}
.doctor_detail_item span:nth-child(2) {
  color: #a8aec1;
  text-align: right;
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
