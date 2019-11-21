<template>
  <van-row class="approve_content">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="审批" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row class="approve_detail">
        <van-row class="approve_product_name">头孢丙烯分散片</van-row>
        <ul>
          <li class="flex_li">
            <span>申请医院：</span>
            <span>上海长海医院</span>
          </li>
          <li class="flex_li">
            <span>承诺销量：</span>
            <span>产品1 - 2153/月</span>
          </li>
          <li class="flex_li">
            <span>达成时间：</span>
            <span>2019.10.15 15:32:32</span>
          </li>
          <li>
            <span>医院了解：</span>
            <br />
            <span class="know_detail">对医院基本情况的了解基本情况的了解基本情况的了解基本情况的了解基本情况的了解基本情况的了解基本情况的了解基本情况的了解</span>
          </li>
          <li>
            <span>竞品了解：</span>
            <br />
            <span
              class="know_detail"
            >对医院竟品情况的了解竟品情况的了解竟品情况的了解竟品情况的了解竟品情况的了解竟品情况的了解竟品情况的了解竟品情况的了解竟品情况的了解竟品情况的了解</span>
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
.approve_product_name {
  text-align: left;
  font-size: 0.8125rem;
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