<template>
  <van-row class="integral">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="积分" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row class="top_notice">
        您好，
        <br />xxx，以下是您上期积分数额及积分明细。
      </van-row>
      <van-row class="integral_content">
        <van-row class="integral_total">
          <span>累计积分总额</span>
          <span> <i>0</i>分 </span>
        </van-row>
        <van-row class="integral_detail">
          <span class="integral_detail_title">积分明细</span>
          <van-row>
            <ul>
              <li>
                <span>累计已返积分</span>
                <span>+0.00</span>
              </li>
              <li>
                <span>本次业绩积分</span>
                <span>+0.00</span>
              </li>
              <li>
                <span>本次行为积分</span>
                <span>+0.00</span>
              </li>
              <li>
                <span>本次可提积分</span>
                <span>+0.00</span>
              </li>
            </ul>
          </van-row>
          <van-row class="cancel_date">核销日期：xxxx.xx.xx</van-row>
        </van-row>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "integral",
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
.integral {
  text-align: left;
  color: #333;
  font-size: 0.75rem;
}
.top_notice {
  width: 92%;
  margin: 0 auto;
  font-size: 0.6875rem;
  background-image: linear-gradient(to right, #2b7cdc, #239dff);
  color: #fff;
  padding: 0.5rem 0.4rem;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  box-shadow: 0rem 0rem 0.5rem #048bfb;
  /* box-shadow: 10px 0 17px -6px #048bfb, -10px 0 19px -6px #048bfb; */
}
.integral_content {
  padding: 0.8rem 0rem;
}
.integral_total {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
}
.integral_total span:nth-child(1) {
  font-size: 0.75rem;
  margin-bottom: 0.2rem;
  color: #000;
}
.integral_total span:nth-child(2) {
  font-size: 0.625rem;
}
.integral_total span:nth-child(2) i {
  font-style: normal;
  font-weight: bold;
  color: #ff8600;
  font-size: 1rem !important;
}
.integral_detail {
  margin-top: 0.625rem;
}
.integral_detail_title {
  margin-bottom: 0.55rem;
  color: #000;
}
.integral_detail ul li {
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 0.55rem 0rem;
}
.integral_detail ul li:last-child {
  border-bottom: none;
}
.integral_detail ul li span {
  font-size: 0.625rem;
}
.integral_detail ul li span:nth-child(2) {
  color: #ff8600;
}
.cancel_date {
  text-align: right;
  color: #a8aec1;
  font-size: 0.625rem;
  margin-top: 0.3125rem;
}
</style>
