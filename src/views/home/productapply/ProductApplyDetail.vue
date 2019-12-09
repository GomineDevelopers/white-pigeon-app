<template>
  <van-row class="approve_content">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="开发详情" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row class="approve_detail">
        <van-row class="approve_product_name">{{ detailContent.product_name }}</van-row>
        <ul>
          <li class="flex_li">
            <span>开发医院：</span>
            <span>{{ detailContent.hospital_name }}</span>
          </li>
          <li class="flex_li">
            <span>承诺销量：</span>
            <span>{{ detailContent.product_name }} - {{ detailContent.promise_sales }}</span>
          </li>
          <li class="flex_li">
            <span>达成时间：</span>
            <span>{{ detailContent.complete_time }}</span>
          </li>
          <li>
            <span>医院了解：</span>
            <br />
            <span class="know_detail">{{ detailContent.hospital_know }}</span>
          </li>
          <li>
            <span>竞品了解：</span>
            <br />
            <span class="know_detail">{{ detailContent.commodity_know }}</span>
          </li>
        </ul>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
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
        commodity_know: ""
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
          console.log(res);
          if (res.code == 200) {
            this.$toast.clear();
            this.detailContent = res.hospital_product_detail;
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
