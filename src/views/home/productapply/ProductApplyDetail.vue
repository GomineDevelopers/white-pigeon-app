<template>
  <van-row class="approve_content">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="开发详情" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row class="approve_detail">
        <van-row class="approve_product_name"
          >{{ detailContent.product_name }}-{{ detailContent.package }}</van-row
        >
        <ul>
          <li class="flex_li">
            <span>开发医院：</span>
            <span>{{ detailContent.hospital_name }}</span>
          </li>
          <li class="flex_li">
            <span>承诺销量：</span>
            <span
              >{{ detailContent.product_name }}-{{ detailContent.package }}&nbsp;&nbsp;
              {{ detailContent.promise_sales }}</span
            >
          </li>
          <li class="flex_li">
            <span>预估开发时间：</span>
            <span v-if="detailContent.is_sign == 1">{{ detailContent.complete_time }}</span>
          </li>
          <li>
            <span>医院了解：</span>
            <br />
            <span class="know_detail">{{ detailContent.hospital_know }}</span>
          </li>
          <li>
            <span>竞品了解：</span>
            <br />
            <span class="know_detail" v-if="detailContent.commodity_know">{{
              detailContent.commodity_know
            }}</span>
            <span class="know_detail" v-else>暂无</span>
          </li>
        </ul>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
import { timeFormat } from "@/js/public";
export default {
  name: "productapplydetail",
  data() {
    return {
      detailContent: {
        product_name: "",
        hospital_name: "",
        promise_sales: "",
        complete_time: "",
        hospital_know: "",
        commodity_know: "",
        is_sign: "",
        package: ""
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
    this.$toast.loading({
      message: "数据加载中...",
      forbidClick: true,
      duration: 0,
      loadingType: "spinner"
    });
    this.getDetailData();
  },
  methods: {
    getDetailData() {
      // 获取id
      let params = { hospital_product_id: this.$route.query.id };
      this.$api
        .hospitalManagerDetail(params)
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$toast.clear();
            let data = res.hospital_product_detail;
            let modify_time =
              data.modify_time == null ? "" : new Date(data.modify_time.split(" ")[0]);
            let endDate =
              data.modify_time == null
                ? ""
                : modify_time.setMonth(modify_time.getMonth() + data.estimated_month);
            this.detailContent = {
              product_name: data.product_name,
              hospital_name: data.hospital_name,
              promise_sales: data.promise_sales,
              complete_time: timeFormat(endDate),
              hospital_know: data.hospital_know,
              commodity_know: data.commodity_know,
              is_sign: data.is_sign,
              package: data.package
            };
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onBack() {
      history.back();
    }
  }
};
</script>
<style scoped>
.approve_product_name {
  text-align: left;
  font-size: 0.75rem;
  color: #000;
  /* font-weight: bold; */
}
.approve_detail ul li {
  border-bottom: 1px solid #ecf1f8;
  text-align: left;
  padding: 0.625rem 0rem;
}
.approve_detail ul .flex_li {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
}
.approve_detail ul li span {
  font-size: 0.75rem;
}
.approve_detail ul li span:nth-child(1) {
  flex: 1;
  white-space: nowrap;
  /* font-weight: bold; */
}
.approve_detail ul li span:nth-child(2) {
  text-align: right;
  color: #a8aec1;
}
.know_detail {
  font-size: 0.625rem !important;
  color: #3a4055;
}
</style>
