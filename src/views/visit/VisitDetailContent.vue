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
        <span>{{ detail.visit_channel == 1 ? "非面对面拜访" : "" }}</span>
        <span>{{ detail.visit_channel == 2 ? "面对面拜访" : "" }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">产品</span>
        <span>{{ detail.product_name }}-{{ detail.package }}</span>
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
        <span>{{ doctorFeedback }}</span>
      </van-row>
      <van-row
        v-if="detail.refuse_reason"
        class="doctor_detail_item flex flex_align_center justify_between border_bom"
      >
        <span class="flex_1">拒绝理由</span>
        <span>{{ detail.refuse_reason }}</span>
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
      detail: {},
      doctorFeedback: "",
      doctorFeedbackList: [
        { id: 1, text: "这个产品安全性高，不错" },
        { id: 2, text: "产品资料感觉还不错，可以考虑试试" },
        { id: 3, text: "患者反馈副作用小" },
        { id: 4, text: "平时用的不多，以后尽量多用些。" },
        { id: 5, text: "同类产品多，尽力而为" },
        { id: 6, text: "患者信赖厂家产品" },
        { id: 7, text: "疗效不理想，患者依从性差" },
        { id: 8, text: "疗效尚可" },
        { id: 9, text: "相同症状有些疗效显著" },
        { id: 10, text: "表示了解，并会尝试使用" },
        { id: 11, text: "安全性高可靠" },
        { id: 12, text: "表示认可，会处方" },
        { id: 13, text: "临床效果不错" },
        { id: 14, text: "不良反应较小，患者依从性高" },
      ],
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
        loadingType: "spinner",
      });
      this.$api
        .visitDetail({ visit_id })
        .then((res) => {
          this.$toast.clear();
          if (res.code == 200) {
            this.detail = res.visit_detail;
            this.doctorFeedback = this.doctorFeedbackList.find((item) => {
              return item.id == res.visit_detail.doctor_feedback;
            }).text;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    onBack() {
      history.back();
    },
  },
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
