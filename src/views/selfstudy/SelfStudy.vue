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
        <van-loading
          class="show_loading"
          type="spinner"
          color="#1989fa"
          v-show="infomationList.length == 0"
        />
        <van-row class="self_study_content" v-show="active">
          <!-- <span class="self_study_title" v-show="infomationList.length > 0">公司政策</span> -->
          <van-row>
            <ul>
              <li v-for="(item, index) in infomationList" :key="index + 'a'">
                <a :href="item.company_policy_name" target="_blank">{{ item.title }}.pdf</a>
                <!-- <span @click="embedSrc = item.company_policy_name">{{ item.title }}.pdf</span> -->
              </li>
            </ul>
          </van-row>
        </van-row>
        <van-row class="self_study_content" v-show="!active">
          <!-- <span class="self_study_title" v-show="infomationList.length > 0">产品资料</span> -->
          <van-row>
            <ul>
              <li v-for="(item2, index2) in infomationList" :key="index2 + 'b'">
                <a :href="item2.company_policy_name" target="_blank">{{ item2.title }}.pdf</a>
              </li>
            </ul>
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
      embedSrc: "",
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
<style scoped>
.self_study {
  text-align: left;
}
.self_study_body {
  padding: 0.8rem 0.5rem 1.5rem 0.5rem;
  min-height: 75vh;
}
.top_nav {
  margin-bottom: 1.2rem;
}
.top_nav span {
  margin-right: 1.2rem;
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
.self_study_content .self_study_title {
  display: block;
  text-align: center;
}
.self_study_content ul li {
  list-style: none;
  font-size: 0.625rem;
  margin-top: 0.8rem;
  color: #333;
}
.self_study_content ul li::before {
  content: "·";
  color: #333;
  height: 0.3125rem;
  font-size: 1.125rem;
  vertical-align: middle;
  line-height: 0.3125rem;
  margin-right: 0.1rem;
}
.show_loading {
  text-align: center;
  height: 50vh;
  line-height: 50vh;
}
</style>
