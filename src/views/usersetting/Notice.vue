<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="公告" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="setting_body">
      <van-row>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为维护本平台及平台用户合法利益，促进平台高效、安全、稳定运行，，现拟定以下政策。政策自注册日起生效，请所有用户自觉遵守。
        <br />
        1.
        用户须自觉遵守国家法律法规及行业规范，推广过程中严格按照推广活动审核标准执行活动，提交活动材料须保证真实有效，不得弄虚作假。
        <br />
        2.
        业务合作秉承平等协作、互利共赢原则，用户不得为个人利益损害合作环境和所有其他利益相关方的利益。
        <br />
        3.
        用户自签约日起可自由使用企业提供的产品信息（指定的产品资料及市场数据），未经书面允许不得在任何网络平台恶意传播或与外部人员分享产品信息。
      </van-row>
      <van-row class="notice_title">推广活动审核标准</van-row>
      <van-row>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目前平台开放审核的推广活动有两项：专家拜访、科室会议。活动具体审核标准如下。
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "usersetting",
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
.setting_body {
  margin-top: 2rem;
  padding: 1rem;
  font-size: 0.6875rem;
  text-align: left;
  line-height: 1.2rem;
}
.notice_title {
  text-align: center;
  font-size: 0.75rem;
  color: #000;
  padding: 0.7rem 0rem;
}
</style>
