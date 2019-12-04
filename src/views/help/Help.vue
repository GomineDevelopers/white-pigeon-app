<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="帮助反馈" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <textarea class="help_content" placeholder="请输入您需要帮助或者反馈的内容！" v-model="idea" ref="textarea"></textarea>
      <van-row class="public_btn">
        <!-- <button >确&nbsp;认</button> -->
        <van-button @click="submitFeedback" :loading="loading" type="info" :loading-text="loadingText" text="确认" />
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "help",
  data() {
    return {
      idea: "",
      loadingText: "数据提交中...",
      loading: false
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
    // 提交反馈
    submitFeedback() {
      let idea = this.idea;
      if (!idea) {
        this.$toast('提交内容不能为空');
        this.$refs.textarea.focus();
      } else {
        this.loading = true;
        this.submitData(idea);
      }
    },
    submitData(idea) {
      this.$api
        .addFeedback({idea})
        .then(res => {
          this.loading = false;
          this.idea = "";
          this.$toast(res.message);
        })
        .catch(err => {
          this.loading = false;
          this.idea = "";
          console.log(err)
        })
    },
    onBack() {
      history.back();
    }
  }
};
</script>
<style scoped>
.help_content {
  width: calc(100% - 0.7rem);
  min-height: 9.375rem;
  padding: 0.625rem 0.35rem;
  font-size: 0.6875rem;
  background: #f8faff;
  border: 1px solid #eee;
  resize: none;
  border-radius: 3px;
}
</style>