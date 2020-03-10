<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="产品奖金" left-arrow @click-left="onBack()" @click-right="submitOption">
        <van-icon name="success" class="submit_icon" slot="right" />
      </van-nav-bar>
    </van-row>
    <van-row class="approve_body">
      <van-row class="option_nav">
        <van-dropdown-menu>
          <van-dropdown-item v-model="spokesman" :options="spokesmanList" />
          <van-dropdown-item v-model="bonus" :options="bonusList" />
          <van-dropdown-item v-if="bonus == 1" v-model="product" :options="productList" />
          <van-dropdown-item v-if="bonus == 1" v-model="hospital" :options="hospitalList" />
        </van-dropdown-menu>
      </van-row>
      <van-row class="approve_content">
        <van-row class="approve_content_item"><span>拜访合格</span><span>14</span></van-row>
        <van-row class="approve_content_item"><span>拜访不合格</span><span>20</span></van-row>
        <van-row class="approve_content_item"><span>拜访未核销</span><span>34</span></van-row>
        <van-row class="approve_content_item"><span>拜访已核销</span><span>25</span></van-row>
        <van-row class="approve_content_item"><span>会议合格</span><span>1</span></van-row>
        <van-row class="approve_content_item"><span>会议不合格</span><span>23</span></van-row>
        <van-row class="approve_content_item"><span>会议未核销</span><span>1</span></van-row>
        <van-row class="approve_content_item"><span>会议已核销</span><span>23</span></van-row>
        <van-row class="approve_content_item"
          ><span>未返行为积分</span><span>213312.00</span></van-row
        >
        <van-row class="approve_content_item"><span>产品单价</span><span>34.53</span></van-row>
        <van-row class="approve_content_item"><span>目标销量</span><span>100</span></van-row>
        <van-row class="approve_content_item"><span>本期销量（盒）</span><span>30</span></van-row>
        <van-row class="approve_content_item"><span>总销量</span><span>56</span></van-row>
        <van-row class="approve_content_item"
          ><span>本期可提积分</span><span>14512.11</span></van-row
        >
        <van-row class="approve_content_item"><span>本期延迟积分</span><span>23.00</span></van-row>
        <van-row class="approve_content_item"
          ><span>累计已扣积分</span><span>4500.00</span></van-row
        >
        <van-row class="approve_content_item"
          ><span>累计已返积分</span><span>23000.00</span></van-row
        >
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "productbonus",
  data() {
    return {
      spokesman: 1,
      bonus: 1,
      product: 1,
      hospital: 1,
      spokesmanList: [
        { text: "代表1", value: 1 },
        { text: "代表2", value: 2 },
        { text: "代表3", value: 3 }
      ],
      bonusList: [
        { text: "产品奖金", value: 1 },
        { text: "总奖金", value: 2 }
      ],
      productList: [
        { text: "产品1", value: 1 },
        { text: "产品2", value: 2 }
      ],
      hospitalList: [
        { text: "医院1", value: 1 },
        { text: "医院2", value: 2 }
      ],
      bonusDetail: {}
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
  methods: {
    onBack() {
      this.$router.push("/approveindex");
    },
    submitOption() {
      console.log("11");
    }
  }
};
</script>
<style>
.option_nav .van-dropdown-item__option .van-cell__title span {
  font-size: 0.6875rem !important;
}
.option_nav .van-dropdown-menu__item .van-dropdown-menu__title {
  font-size: 0.6875rem !important;
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0px;
}
</style>
<style scoped>
.approve_body {
  margin-top: 2rem;
  height: calc(100vh - 2rem);
}
.option_nav {
  height: 2.2rem;
  border-bottom: 1px solid #f0f0f0;
}
.approve_content {
  height: calc(100% - 2.7rem);
  overflow-y: auto;
  padding: 0rem 1rem;
}
.approve_content .approve_content_item {
  text-align: left;
  border-top: 1px solid #f0f0f0;
  padding: 0.55rem 0rem;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
}
.approve_content .approve_content_item:nth-child(1) {
  border-top: none;
}
.approve_content .approve_content_item span:nth-child(1) {
  flex: 1;
  font-size: 0.6875rem;
  color: #333;
}
.approve_content .approve_content_item span:nth-child(2) {
  color: #ff8600;
  font-size: 0.6875rem;
}
.submit_icon {
  font-size: 1rem;
}
</style>
