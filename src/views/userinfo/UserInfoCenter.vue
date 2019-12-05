<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="我的" left-arrow @click-left="onBack()" />
    </van-row>
    <!-- 头部用户信息开始 -->
    <van-row class="header_body" @click="goUserInfoDetail">
      <van-row class="header_user_info flex flex_align_center">
        <van-row class="left_detail flex flex_1">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <van-row class="user_info">
            <span class="user_name">{{ user.name }}</span>
            <br />
            <span class="user_detail">{{user.address}}</span>
          </van-row>
        </van-row>
        <van-row>
          <van-icon name="qr" class="code" />
          <van-icon name="arrow" class="right_icon" />
        </van-row>
      </van-row>
      <van-row class="header_user_other">
        <van-col span="6" class="other_list_info">
          <span>{{statistics.meeting_total_count}}</span>
          <span>会议</span>
        </van-col>
        <van-col span="6" class="other_list_info">
          <span>{{statistics.visit_record_num}}</span>
          <span>拜访</span>
        </van-col>
        <van-col span="6" class="other_list_info">
          <span>{{statistics.hospital_product_num}}</span>
          <span>申请</span>
        </van-col>
        <van-col span="6" class="other_list_info">
          <span>216371</span>
          <span class="jifen flex flex_align_center">
            积分
            <van-icon name="eye" class="eye_icon" />
          </span>
        </van-col>
      </van-row>
    </van-row>
    <!-- 头部用户信息结束 -->
    <van-row class="user_body">
      <van-row class="my_product_nav">
        <span :class="active ? 'activeLink' : ''" @click="active = !active">我的医院</span>
        <span :class="active ? '' : 'activeLink'" @click="active = !active">我的产品</span>
      </van-row>
      <van-row>
        <my-hospital v-show="active"></my-hospital>
        <my-product v-show="!active"></my-product>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
import MyHospital from ".././components/MyHospital";
import MyProduct from ".././components/MyProduct";
export default {
  name: "userinfocenter",
  components: {
    "my-hospital": MyHospital,
    "my-product": MyProduct
  },
  data() {
    return {
      active: true,
      user: {},
      statistics: {}
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
  mounted() {
    this.getUserInfo();
    this.getStatistics();
  },

  methods: {
    // 获取用户信息
    getUserInfo() {
      this.$api
        .userInfo()
        .then(res => {
          if (res.code == 200) {
            this.user = {
              name: res.user.name,
              address: res.user.id_address
            };
            if (res.user.is_complete == 2){
              this.$dialog.alert({
                message: "您还未完善信息",
                confirmButtonText: "完善信息"
              }).then( () => {
                this.$router.push('/improvepersonalinfo')
              })
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
     // 获取会议、拜访、申请、积分统计
    getStatistics() {
      this.$api
        .userCenterStatistics()
        .then(res => {
          if (res.code == 200) {
            this.statistics = {
              meeting_total_count: res.meeting_total_count,
              visit_record_num: res.visit_record_num,
              hospital_product_num: res.hospital_product_num
              };
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onBack() {
      history.back();
    },
    goUserInfoDetail() {
      this.$router.push({ path: "/userinfodetail" });
    }
  }
};
</script>
<style scoped>
.header_body {
  padding: 1rem 1rem 0.5rem 1rem;
  background: #2a76ff;
  margin-top: 1.9rem;
  color: #fff;
}
.header_body .code {
  margin-right: 0.5rem;
}
.header_user_other {
  margin-top: 0.9rem;
}
.user_name {
  font-size: 0.75rem;
  margin-top: 2px;
}
.user_detail {
  font-size: 0.6875rem;
}
.other_list_info {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
}
.other_list_info span:nth-child(1) {
  font-size: 0.75rem;
  font-weight: bold;
}
.other_list_info span:nth-child(2) {
  font-size: 0.6875rem;
}
.jifen {
  justify-content: center;
}
.jifen .eye_icon {
  margin-left: 0.3125rem;
}
.header_user_info {
  justify-content: space-between;
  text-align: left;
}
.left_detail img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.user_body {
  padding: 0rem 1rem;
  text-align: left;
  margin-bottom: 1.875rem;
}
.my_product_nav {
  margin: 0.75rem 0rem;
}
.my_product_nav span {
  font-size: 0.75rem;
  margin-right: 0.9375rem;
  color: #333;
}
.my_product_nav .activeLink {
  color: #3399ff;
  position: relative;
}
.my_product_nav .activeLink::after {
  content: "";
  position: absolute;
  bottom: -0.1875rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0.9rem;
  height: 0.125rem;
  border-bottom: 2px solid #3399ff;
}
</style>
