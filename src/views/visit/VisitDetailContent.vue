<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="拜访详情" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="doctor_detail">
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">医院</span>
        <span>{{ detail.hospital_name }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">客户</span>
        <span>{{ detail.doctor_name }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">开始时间</span>
        <span>{{ detail.start_time }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">拜访目的</span>
        <span>{{ detail.visit_goal }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">拜访渠道</span>
        <span>{{ detail.visit_channel == 1 ? "面对面拜访" : "" }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">产品</span>
        <span>{{ detail.product_name }}-{{ detail.specification }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">宣传主题</span>
        <span>{{ detail.propaganda }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">拜访定位</span>
        <span>{{ detail.visit_position }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">医生反馈</span>
        <span>{{ detail.doctor_feedback }}</span>
      </van-row>
      <van-row class="doctor_detail_item">
        <span>照片上传</span>
        <van-row class="visit_photo">
          <img v-if="detail.visit_image != null" :src="detail.visit_image" />
          <img v-if="detail.visit_image_two != null" :src="detail.visit_image_two" />
          <img v-if="detail.visit_image_three != null" :src="detail.visit_image_three" />
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
      detail: {}
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
  mounted() {
    let visit_id = this.$route.query.id;
    this.getVistDetail(visit_id);
  },
  methods: {
    // 获取拜访详情数据
    getVistDetail(visit_id) {
      this.$toast.loading({
        message: "数据加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner"
      });
      this.$api
        .visitDetail({ visit_id })
        .then(res => {
          this.$toast.clear();
          if (res.code == 200) {
            this.detail = res.visit_detail;
          }
        })
        .catch(err => {
          this.$toast.clear();
          console.log(err);
        });
    },
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
.doctor_detail_item span:nth-child(1) {
  white-space: nowrap;
  margin-right: 1rem;
}
.doctor_detail_item span:nth-child(2) {
  color: #a8aec1;
}
.visit_photo img {
  margin-top: 10px;
  width: 31%;
  height: 4.1rem;
  margin-right: 0.3125rem;
}
.visit_photo img:nth-child(3n) {
  margin-right: 0rem;
}
</style>
