<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="代表反馈" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row class="feedback_list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="无更多的反馈信息"
          @load="getFeedbackList"
        >
          <van-row class="feedback_list_item" v-for="(list, index) in feedbackList" :key="index">
            <span>代表：{{ list.name }}</span>
            <van-row
              ><span>手机：{{ list.phone }}</span></van-row
            >
            <van-row class="flex feedback_list_content">
              <span class="white_space">反馈内容：</span>
              <span>{{ list.idea }}</span>
            </van-row>
            <van-row>
              <span>反馈时间：{{ list.create_time }}</span>
            </van-row>
          </van-row>
        </van-list>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "feedbacklist",
  data() {
    return {
      active: true,
      loading: false,
      finished: false,
      page: 1, //医生页
      row: 6,
      feedbackList: []
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
    getFeedbackList() {
      let params = {
        page: this.page,
        row: this.row
      };
      this.$api
        .getUserFeedback(params)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            if (res.feedback_list.length < this.row) {
              this.feedbackList.push(...res.feedback_list);
              // 加载状态结束
              this.finished = true;
              this.loading = false;
            } else {
              this.feedbackList.push(...res.feedback_list);
              this.page++;
              this.loading = false;
            }
          } else {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
          }
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.feedback_list {
  text-align: left;
}
.feedback_list_item {
  border-bottom: 1px solid #f0f0f0;
  padding: 0.35rem 0rem;
}
.feedback_list_item span {
  font-size: 0.6875rem;
}
.white_space {
  white-space: nowrap;
}
</style>
