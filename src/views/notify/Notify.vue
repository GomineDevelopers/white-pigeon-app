<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="通知" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row class="notify_body" v-for="(notifyItem,index) in notifyList" :key="index">
        <van-row class="notify_date">{{notifyItem.date}}</van-row>
        <van-row class="notify_content">
          <van-row class="notify_title">{{notifyItem.title}}</van-row>
          <van-row class="notify_text">{{notifyItem.content}}</van-row>
        </van-row>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "notify",
  data() {
    return {
      notifyList: [
        {
          date: "2019年10月15日",
          title: "您有一个新申请已通过",
          content:
            "您申请的复旦大学附属眼耳鼻喉科医院已于2019-10-15 15:21已经通过审核，请您及时查看！"
        },
        {
          date: "2019年10月13日",
          title: "您有一个新申请已通过",
          content:
            "您申请的上海长海医院已于2019-10-13 11:21已经通过审核，请您及时查看！"
        }
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
      history.back();
    }
  }
};
</script>
<style scoped>
.notify_body {
  margin-bottom: 1rem;
  text-align: left;
}
.notify_date {
  font-size: 0.625rem;
  color: #a8aec1;
  text-align: center;
  margin-bottom: 0.4rem;
}
.notify_content {
  padding: 0.5rem 0.65rem;
  box-shadow: 0rem 0rem 0.3125rem #ccc;
  border-radius: 0.25rem;
}
.notify_content .notify_title {
  font-size: 0.75rem;
  color: #333;
  height: 1.2rem;
}
.notify_content .notify_text {
  font-size: 0.625rem;
  color: #3a4055;
}
</style>