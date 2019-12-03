<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="医生详情" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="doctor_detail">
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">医生姓名</span>
        <span>{{ doctor.doctor_name }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">所属医院</span>
        <span>{{ doctor.hospital_name }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">科室</span>
        <span>{{ doctor.section_name }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">性别</span>
        <span>{{ doctor.sex }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">客户状态</span>
        <span>{{ doctor.doctor_status }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">职务</span>
        <span>{{ doctor.duty }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">学历</span>
        <span>{{ doctor.educate }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">专业人士分类</span>
        <span>{{ doctor.doctor_type }}</span>
      </van-row>
      <van-row class="doctor_detail_item flex flex_align_center justify_between border_bom">
        <span class="flex_1">学术头衔</span>
        <span>{{ doctor.academic_title }}</span>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
import {
  setSex,
  setStatus,
  setDoctorDuty,
  setEducation,
  setDoctorType,
  setAcademicTitle
} from "../../js/public";
export default {
  name: "doctordetail",
  data() {
    return {
      doctor: {
        doctor_name: "",
        hospital_name: "",
        section_name: "",
        sex: "",
        doctor_status: "",
        duty: "",
        educate: "",
        doctor_type: "",
        academic_title: ""
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
    this.getDoctorDetail();
    this.$toast.loading({
      message: "数据加载中...",
      forbidClick: true,
      duration: 0,
      loadingType: "spinner"
    });
  },
  methods: {
    onBack() {
      history.back();
    },
    getDoctorDetail() {
      console.log("接收id", this.$route.query.id);
      let params = { doctor_id: this.$route.query.id };
      this.$api
        .doctorDetail(params)
        .then(res => {
          console.log(res);
          let data = res.doctor_detail;
          if (res.code == 200) {
            this.$toast.clear();
            this.doctor = {
              doctor_name: data.doctor_name,
              hospital_name: data.hospital_name,
              section_name: data.section_name,
              sex: setSex(data.sex),
              doctor_status: setStatus(data.doctor_status),
              duty: setDoctorDuty(data.duty),
              educate: setEducation(data.educate),
              doctor_type: setDoctorType(data.doctor_type),
              academic_title: setAcademicTitle(data.academic_title)
            };
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
  margin-right: 0.625rem;
}
.doctor_detail_item span:nth-child(2) {
  color: #a8aec1;
  text-align: right;
}
</style>
