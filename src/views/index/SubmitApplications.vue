<template>
  <van-row class="submitapplications">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="提交开发" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row class="applications_info">
        <van-row class="drug_name bgm_white"
          >{{ productData.productName }}-{{ productData.package }}</van-row
        >
        <van-row class="flex_align_center bgm_white padding_3 border_bom">
          <span class="title">
            承诺月均销量<i>*</i>
            <van-icon name="question" @click="readTips(0)" />
            <p class="tips" :class="{ active: tips == 0 }">
              请按实际情况填写，此项目为重点评估项，避免因填写不当影响申请结果。
            </p>
          </span>
          <span class="sales_input">
            <van-field v-model="sales" type="number" placeholder="请输入" />
          </span>
        </van-row>
        <van-row class="bgm_white padding_3 border_bom">
          <span class="title">
            预估开发时间<i>*</i>
            <van-icon name="question" @click="readTips(1)" />
            <p class="tips" :class="{ active: tips == 1 }" style="left: 5.4rem">
              请按实际开发情况填写，此项目为重点评估项，避免因填写不当影响申请结果。
            </p>
          </span>
          <span class="icon_right flex flex_align_center" @click="timeShow = true">
            <span class="flex_1 time_select">{{ time ? time : "请选择" }}</span>
            <van-icon name="arrow" />
          </span>
        </van-row>
        <van-row class="know_more padding_3">
          <van-row class="flex flex_align_center competing_goods">
            <span class="title2">医院了解<i>*</i></span>
            <!-- <van-icon name="question" /> -->
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
            <!-- <van-icon name="question" /> -->
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
        <button @click="goApproveindex">提交开发</button>
      </van-row>
    </van-row>
    <!-- 以下为会议页的选项 -->
    <!-- 产品 -->
    <transition name="van-slide-up">
      <van-popup v-model="timeShow" position="bottom">
        <van-picker
          show-toolbar
          title="预估时间选择"
          :columns="timeOption"
          @cancel="timeShow = false"
          @confirm="timeConfirm"
        />
      </van-popup>
    </transition>
  </van-row>
</template>
<script>
import { timeFormat } from "@/js/public";
export default {
  nama: "submitapplications",
  data() {
    return {
      productData: null, //接收路由传的数据
      sales: "",
      time: "",
      timeId: "",
      timeShow: false,
      timeOption: [
        { text: "1个月", id: 1 },
        { text: "2个月", id: 2 },
        { text: "3个月", id: 3 },
        { text: "4个月", id: 4 },
        { text: "5个月", id: 5 },
        { text: "6个月", id: 6 },
        { text: "7个月", id: 7 },
        { text: "8个月", id: 8 },
        { text: "9个月", id: 9 }
      ],
      date: "", //完成时间
      message: "",
      tips: -1,
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
      this.$router.push({ path: "/" });
    },
    // 查看提示
    readTips(id) {
      this.tips == id ? (this.tips = -1) : (this.tips = id);
    },
    //接收路由数据
    getRouterData() {
      this.productData = this.$route.query.data;
    },
    timeConfirm(value) {
      // console.log(value);
      this.timeShow = false;
      this.time = value.text;
      this.timeId = value.id;

      //计算完成时间  2019-11-29
      let mouthNum = value.id;
      let nowDate = new Date();
      let date = nowDate.setMonth(nowDate.getMonth() + mouthNum);
      this.date = timeFormat(nowDate);
      // console.log(this.date);
    },
    chooseTag(tag) {
      // console.log(tag);
      this.message += tag + ",";
    },
    goApproveindex() {
      if (this.sales && this.time && this.message) {
        this.$toast.loading({
          message: "开发提交中...",
          forbidClick: true,
          duration: 0,
          loadingType: "spinner",
          overlay: true
        });
        // console.log("准备提交开发");
        let postData = {
          hospital_id: this.productData.hospitalId,
          product_id: this.productData.productId,
          promise_sales: this.sales,
          estimated_month: this.timeId,
          complete_time: this.date,
          hospital_know: this.message,
          commodity_know: this.message2
        };
        // 1-已开发  2-不可开发  3-空白医院  4-开发中
        if (this.productData.hospitailStatus == 3) {
          console.log("空白医院的提交");
          this.$api
            .hospitalApply(postData)
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$toast.clear();
                this.$dialog
                  .alert({
                    title: "提示",
                    message:
                      "您的申请已提交成功！工作人员将在三个工作日内与您取得联系，请保持手机畅通，谢谢！"
                  })
                  .then(() => {
                    this.$router.push({ path: "/productapply" });
                  });
              } else {
                this.$toast.fail(res.message);
                setTimeout(() => {
                  this.$router.push({ path: "/" });
                }, 1500);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else if (this.productData.hospitailStatus == 4) {
          console.log("开发中医院的提交");
          this.$api
            .hospitalDevelopmentApply(postData)
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$toast.clear();
                this.$dialog
                  .alert({
                    title: "提示",
                    message:
                      "您的申请已提交成功！工作人员将在三个工作日内与您取得联系，请保持手机畅通，谢谢！"
                  })
                  .then(() => {
                    this.$router.push({ path: "/productapply" });
                  });
              } else {
                this.$toast.fail(res.message);
                setTimeout(() => {
                  this.$router.push({ path: "/" });
                }, 1500);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else if (this.productData.hospitailStatus == 1) {
          console.log("已开发医院的提交");
          this.$api
            .hospitalDevelopdApply(postData)
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$toast.clear();
                this.$dialog
                  .alert({
                    title: "提示",
                    message:
                      "您的申请已提交成功！工作人员将在三个工作日内与您取得联系，请保持手机畅通，谢谢！"
                  })
                  .then(() => {
                    this.$router.push({ path: "/productapply" });
                  });
              } else {
                this.$toast.fail(res.message);
                setTimeout(() => {
                  this.$router.push({ path: "/" });
                }, 1500);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      } else {
        this.$toast.fail("请填写必填信息");
      }
    }
  }
};
</script>
<style>
.sales_input .van-cell {
  font-size: 0.625rem !important;
}
.title .van-icon,
.title2 .van-icon,
.padding_3 .van-icon {
  color: #d2d7de !important;
  font-size: 0.75rem;
  vertical-align: -2px;
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
  position: relative;
  display: block;
  margin-right: 0.375rem;
  margin-bottom: 0.2rem;
  font-size: 0.625rem;
}
.title .tips,
.title2 .tips {
  font-size: 0.5rem;
  position: absolute;
  margin: 0;
  left: 5.2rem;
  z-index: 10;
  top: -5px;
  width: 56%;
  background: #fff;
  padding: 0.2rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.1875rem;
  display: none;
}
.title .tips.active,
.title2 .tips.active {
  display: inline-block;
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
