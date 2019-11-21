<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="个人信息" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="userinfodetail">
      <van-row class="user_item flex flex_align_center justify_between">
        <span class="flex_1">头像</span>
        <span class="flex flex_align_center">
          <img class="user_img" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <van-icon name="arrow" class="right_icon" />
        </span>
      </van-row>
      <van-row class="user_item flex flex_align_center justify_between">
        <span class="flex_1">我的推广码</span>
        <span class="flex flex_align_center">
          <van-icon name="qr" class="code" />
          <van-icon name="arrow" class="right_icon" />
        </span>
      </van-row>
      <van-row class="user_item flex flex_align_center justify_between">
        <span class="flex_1">姓名</span>
        <span>徐尚</span>
      </van-row>
      <van-row class="user_item flex flex_align_center justify_between">
        <span class="flex_1">身份证</span>
        <span>500334198808184325</span>
      </van-row>
      <van-row class="user_item flex flex_align_center justify_between">
        <span class="flex_1">证件地址</span>
        <span>上海市XXXXXX</span>
      </van-row>
      <van-row class="user_item flex flex_align_center justify_between">
        <span class="flex_1">有效期</span>
        <span>2022.12.10</span>
      </van-row>
      <van-row class="user_item">
        <span>身份证照片</span>
        <van-row class="IDcard_content flex flex_align_center">
          <span>
            <img class="IDcard_photo" src="../../assets/image/img1.jpg" />
          </span>
          <span>
            <img class="IDcard_photo" src="../../assets/image/img2.jpg" />
          </span>
        </van-row>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "userinfodetail",
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
.userinfodetail {
  text-align: left;
  margin-top: 2rem;
}
.user_img {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  margin-right: 1rem;
}
.user_item {
  border-bottom: 1px solid #eee;
  padding: 0.7rem 1rem;
}
.user_item span:nth-child(2) {
  color: #a8aec1;
}
.right_icon {
  color: #c7c7cc;
}
.userinfodetail .code {
  font-size: 1.25rem;
  margin-right: 1rem;
  color: #a8aec1;
}
.IDcard_content span {
  display: block;
  width: 47%;
  height: 4.5rem;
  padding: 0.3125rem;
  box-shadow: 0rem 0rem 0.3125rem #ccc;
}
.IDcard_content span:nth-child(1) {
  margin-right: 0.75rem;
}
.IDcard_content img {
  width: 100%;
  height: 100%;
}
.IDcard_content {
  width: 100%;
  margin-top: 0.3125rem;
}
</style>