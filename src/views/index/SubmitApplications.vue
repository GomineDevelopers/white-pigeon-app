<template>
  <van-row class="submitapplications">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="提交申请" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row class="applications_info">
        <van-row class="drug_name bgm_white">{{ productData.productName }}</van-row>
        <van-row class="flex flex_align_center bgm_white padding_3 border_bom">
          <span class="title">承诺销量<i>*</i></span>
          <span class="flex_1 sales_input">
            <van-field v-model="sales" type="number" placeholder="请输入" />
          </span>
        </van-row>
        <van-row class="flex bgm_white padding_3 border_bom">
          <span class="title">完成时间<i>*</i></span>
          <span class="icon_right flex flex_1 flex_align_center">
            <span class="flex_1 time_select">{{ date ? date : "请选择" }}</span>
            <van-icon name="arrow" @click="timeShow = true" />
          </span>
        </van-row>
        <van-row class="know_more padding_3">
          <van-row class="flex flex_align_center competing_goods">
            <span class="title2">医院了解<i>*</i></span>
            <van-icon name="question" />
          </van-row>
          <van-row class="bgm_white">
            <van-cell-group>
              <van-field
                v-model="message"
                autosize
                type="textarea"
                placeholder="对医院基本情况的了解"
              />
            </van-cell-group>
          </van-row>
          <van-row class="tag_edit flex justify_between">
            <span class="flex_1">快捷标签</span>
            <!-- <span>编辑</span> -->
          </van-row>
          <van-row class="hospitall_tag flex">
            <span v-for="(tag, index) in hospitallTag" :key="index + 'c'" @click="chooseTag(tag)">{{
              tag
            }}</span>
          </van-row>
        </van-row>
        <van-row class="padding_3">
          <van-row class="flex flex_align_center competing_goods">
            <span class="title">竞品了解</span>
            <van-icon name="question" />
          </van-row>
          <van-row class="bgm_white message2">
            <van-cell-group>
              <van-field
                v-model="message2"
                autosize
                type="textarea"
                placeholder="对医院竟品情况的了解"
              />
            </van-cell-group>
          </van-row>
        </van-row>
      </van-row>
      <van-row class="public_btn">
        <button @click="goApproveindex">提交申请</button>
      </van-row>
    </van-row>
    <!-- 以下为会议页的选项 -->
    <!-- 产品 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="timeShow">
          <van-picker
            show-toolbar
            title="完成时间选择"
            :columns="timeOption"
            @cancel="timeShow = false"
            @confirm="timeConfirm"
          />
        </van-row>
      </transition>
    </van-row>
  </van-row>
</template>
<script>
export default {
  nama: "submitapplications",
  data() {
    return {
      productData: null, //接收路由传的数据
      sales: "",
      date: "",
      timeShow: false,
      timeOption: ["1个月", "2个月", "3个月", "4个月", "5个月", "6个月", "7个月", "8个月", "9个月"],
      message: "",
      hospitallTag: [
        "十分清楚竞品信息",
        "十分清楚此医院适用科室信息",
        "十分清楚此医院重点医生信息",
        "可快速进药",
        "开发成功后，用量较大",
        "可长期进药"
      ],
      message2: ""
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
    this.getRouterData();
  },
  methods: {
    onBack() {
      history.back();
    },
    //接收路由数据
    getRouterData() {
      this.productData = this.$route.query.data;
      console.log("提交申请data", this.productData);
    },
    timeConfirm(value) {
      console.log(value);
      this.timeShow = false;
      this.date = value;
      let nowDate = new Date();
      let date = myDate.setMonth(myDate.getMonth() + 1);
      console.log("date", date);
    },
    chooseTag(tag) {
      // console.log(tag);
      this.message += tag + ",";
    },
    goApproveindex() {
      if (this.sales && this.time && this.message) {
        console.log("准备提交申请");
        let postData = {
          hospital_id: this.productData.hospitalId,
          product_id: this.productData.productId,
          promise_sales: this.sales,
          complete_time: this.date,
          hospital_know: this.message,
          commodity_know: this.message2
        };
      } else {
        this.$toast.fail("请填写完必填信息");
      }
      // this.$router.push({ path: "/approveindex" });
    }
  }
};
</script>
<style>
.sales_input .van-cell {
  font-size: 0.625rem !important;
}
.padding_3 .van-icon {
  color: #d2d7de;
  font-size: 0.75rem;
}
.submitapplications .van-field__control {
  color: #969799;
}
.submitapplications textarea.van-field__control {
  height: 6.25rem !important;
  padding: 0.5rem;
  font-size: 0.625rem;
}
</style>
<style scoped>
.submitapplications .title i,
.submitapplications .title2 i {
  font-style: normal;
  color: red;
  margin-left: 0.2rem;
}
.applications_info {
  text-align: left;
  background: #fafafa;
  box-shadow: 0rem 0rem 0.3125rem #ccc;
  border-radius: 0.1875rem;
}
.bgm_white {
  background: #fff;
}
.drug_name {
  font-size: 0.75rem;
  color: #000;
  padding: 0.625rem 0.5rem 0rem 0.5rem;
  border-radius: 0.1875rem;
}
.padding_3 {
  padding: 0.5rem;
}
.title,
.title2 {
  white-space: nowrap;
  margin-right: 0.375rem;
  font-size: 0.625rem;
}
.van-cell {
  padding: 0rem;
}
.time_select {
  font-size: 0.625rem;
  color: #969799;
}
.border_bom {
  border-bottom: 1px solid #eee;
}
.know_more {
  margin-top: 0.3125rem;
}
.tag_edit span {
  font-size: 0.625rem;
  padding: 0.3125rem 0rem;
}
.hospitall_tag {
  flex-wrap: wrap;
}
.hospitall_tag span {
  min-width: 2.5rem;
  font-size: 0.625rem;
  padding: 0.125rem 0.375rem;
  border: 1px solid #a8aec1;
  margin-right: 0.5rem;
  margin-top: 0.3125rem;
  border-radius: 0.125rem;
}
.competing_goods {
  margin-bottom: 0.3125rem;
}
.message2 {
  margin-bottom: 0.625rem;
}
.showbank {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
