<template>
  <van-row class="approve_content">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="审批" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="approve_content_body">
      <van-row class="approve_detail">
        <ul>
          <li>
            <span>申请人：</span>
            <span>XXX</span>
          </li>
          <li>
            <span>医院：</span>
            <span>上海长海医院</span>
          </li>
          <li>
            <span>医生：</span>
            <span>张XX</span>
          </li>
          <li>
            <span>申请时间：</span>
            <span>2019.10.15 15:32:32</span>
          </li>
        </ul>
      </van-row>
    </van-row>
    <van-row class="handle">
      <span>
        <button class="refuse" @click="showRefuse">拒绝</button>
      </span>
      <span>
        <button class="pass" @click="pass">通过</button>
      </span>
    </van-row>
    <van-row class="refuse_daio">
      <van-dialog v-model="show" title="拒绝理由" show-cancel-button>
        <van-field class="refuse_text" v-model="value" placeholder="请输入您的拒绝理由" />
      </van-dialog>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "DoctorApprove",
  data() {
    return {
      show: false,
      value: ""
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
      history.back();
    },
    showRefuse() {
      this.show = true;
    },
    pass() {
      this.$router.push({ path: "/bankcard" });
    }
  }
};
</script>
<style>
.approve_content .van-dialog__footer {
  margin-top: 0.625rem;
}
</style>
<style scoped>
.approve_content_body {
  margin-top: 2rem;
  padding: 0rem 1rem;
}
.approve_detail ul li {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ecf1f8;
  text-align: left;
  padding: 0.625rem 0rem;
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
.handle {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 1.25rem;
  width: calc(100% - 2rem);
  padding: 0rem 1rem;
  margin: auto;
}
.handle span {
  width: 46%;
  height: 1.5625rem;
}
.refuse,
.pass {
  display: block;
  width: 100%;
  height: 1.5625rem;
  line-height: 1.5625rem;
  border: none;
  border-radius: 0.25rem;
}
.refuse {
  background: #efded6;
  color: #f86e24;
}
.pass {
  background: #3399ff;
  color: #fff;
  margin-left: 0.7rem;
}
</style>