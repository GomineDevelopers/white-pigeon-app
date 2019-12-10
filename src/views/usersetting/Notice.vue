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
        <br />
        <i>1. 专家拜访审核标准</i>
        （1）签到位置：拜访签到位置须与乙方医院位置相距1千米以内。
        <br />
        （2）拜访照片及审核：每家医院的每日拜访须上传至少1张合格拜访照片。拜访照片须包含医院门牌及名称，且真实有效。
        <br />
        （3）拜访提交及时间：拜访记录时间不能重合，否则视作无效拜访。拜访记录须为
        “已提交”状态方能进入审核流程。
        <br />
        <i>2. 科室会议审核标准</i>
        （1）签到表：每场活动须上传至少1张签到表照片。签到表上的参会人员签字须真实有效，签到人数须与活动申请时预计到场人数相符。
        <br />
        （2）活动照片：每场活动须上传至少1张活动照片，活动照片须包含甲方指定推广产品、甲方指定产品PPT及参会人员，推广人员须保证活动照片真实有效。
        <br />
        （3）活动人数：原则上一场科室会的参与人数（包括主讲人）不得少于4人。
        <br />
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
  font-style: normal;
}
.setting_body i {
  font-size: 0.75rem;
  color: #000;
  display: block;
  padding: 0.5rem 0rem 0.2rem 0rem;
  font-style: normal;
}
</style>
