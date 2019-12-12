<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="新人自学" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body self_study">
      <van-row class="public_module self_study_body">
        <van-row class="top_nav">
          <span :class="active ? 'active' : ''" @click="getInformation(1)">公司政策</span>
          <span :class="active ? '' : 'active'" @click="getInformation(2)">产品资料</span>
        </van-row>
        <!-- <van-loading
          class="show_loading"
          type="spinner"
          color="#1989fa"
          v-show="infomationList.length == 0"
        /> -->
        <van-row class="self_study_content" v-show="active">
          <van-row>
            <!-- <ul>
              <li v-for="(item, index) in infomationList" :key="index + 'a'">
                <a :href="item.company_policy_name" target="_blank">{{ item.title }}.pdf</a>
              </li>
            </ul> -->
            <van-collapse v-model="activeName1" accordion>
              <van-collapse-item title="公司政策2" name="2">内容</van-collapse-item>
            </van-collapse>
          </van-row>
        </van-row>
        <van-row class="self_study_content" v-show="!active">
          <van-row>
            <van-collapse v-model="activeName2" accordion>
              <van-collapse-item title="产品资料1" name="1">内容</van-collapse-item>
              <van-collapse-item title="产品资料2" name="2">内容</van-collapse-item>
            </van-collapse>
          </van-row>
        </van-row>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "selfstudy",
  data() {
    return {
      active: true,
      // embedSrc: "",
      activeName1: "",
      activeName2: "",
      activeName3: "",
      infomationList: []
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
    this.getInformation(1);
  },
  methods: {
    onBack() {
      history.back();
    },
    getInformation(type) {
      this.infomationList = [];
      if (type == 1) {
        this.active = true;
      } else if (type == 2) {
        this.active = false;
      }
      let params = { is_company_policy: type };
      this.$api
        .materialList(params)
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.infomationList = res.materialList;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style>
.van-cell__title span {
  font-size: 0.6875rem !important;
}
</style>
<style scoped>
.self_study {
  text-align: left;
}
.self_study_body {
  min-height: 75vh;
  padding: 0.8rem 0rem;
}
.self_study_title {
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.75rem;
  line-height: 1.5rem;
  color: #000;
}
.self_study_content {
  padding: 0rem 0.5rem;
}
.top_nav {
  margin-bottom: 1.2rem;
}
.top_nav span {
  margin-left: 1rem;
  color: #8898ab;
}
.top_nav span.active {
  color: #3399ff;
  position: relative;
}
.top_nav span.active::after {
  content: "";
  position: absolute;
  bottom: -0.25rem;
  left: 50%;
  transform: translateX(-50%);
  width: 1rem;
  height: 0.125rem;
  border-bottom: 2px solid #3399ff;
}
</style>
