<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="流向下载" left-arrow @click-left="onBack()" @click-right="submitOption">
      </van-nav-bar>
    </van-row>
    <van-row class="approve_body">
      <van-row class="option_nav flex flex_align_center">
        <van-col :span="10">
          <van-dropdown-menu>
            <van-dropdown-item v-model="spokesman" :options="spokesmanList" />
            <van-dropdown-item v-model="product" :options="productList" />
          </van-dropdown-menu>
        </van-col>
        <van-col :span="14" class="calendar">
          <van-cell title="核销日期" :value="date" @click="show = true" />
        </van-col>
      </van-row>
      <van-row class="approve_content flex flex_align_center flex_justify_center">
        <van-button type="info">流向下载</van-button>
      </van-row>
    </van-row>
    <!-- 日历组件 -->
    <van-calendar v-model="show" :show-confirm="false" @confirm="onConfirm" />
  </van-row>
</template>
<script>
export default {
  name: "totalbonus",
  data() {
    return {
      show: false,
      spokesman: 1,
      product: 1,
      date: "",
      spokesmanList: [
        { text: "代表1", value: 1 },
        { text: "代表2", value: 2 },
        { text: "代表3", value: 3 }
      ],
      productList: [
        { text: "产品1", value: 1 },
        { text: "产品2", value: 2 }
      ]
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
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
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
.van-dropdown-menu__item {
  justify-content: start;
  padding-left: 0.6rem;
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0px;
}
.option_nav .calendar .van-cell span {
  font-size: 0.685rem;
  color: #323233;
}
.option_nav .calendar .van-cell .van-cell__title span::after {
  position: absolute;
  top: 50%;
  left: 4.3rem;
  margin-top: -5px;
  border: 3px solid;
  border-color: transparent transparent currentColor currentColor;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  opacity: 0.8;
  content: "";
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
  font-size: 0.9rem;
}
.approve_content .van-button--normal span {
  font-size: 0.6875rem;
}
</style>
