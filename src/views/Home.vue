<template>
  <div class="home">
    <!-- aside开始 -->
    <!-- <van-cell></van-cell> -->
    <van-popup v-model="asideShow" position="left" :style="{ height: '100%',width:'70%' }">
      <van-row class="aside_nav">
        <van-row class="top_image flex flex_align_center border_bom">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" @click="goUserInfo" />
          <van-row class="user_info">
            <span class="user_name" @click="goUserInfo">徐尚</span>
            <br />
            <span class="user_detail">上海市-静安区</span>
          </van-row>
        </van-row>
        <van-row>
          <van-row
            class="asideNavitem flex flex_align_center"
            v-for="(asideNavItem,index1) in asideNav"
            :key="index1+'as'"
          >
            <img :src="asideNavItem.src" />
            <router-link :to="{ path: asideNavItem.link }">{{asideNavItem.name}}</router-link>
          </van-row>
          <van-row class="bottom_nav">
            <van-col span="12" class="flex flex_align_center" @click="goSetting">
              <van-icon name="setting" />
              <span>设置</span>
            </van-col>
            <van-col span="12" class="flex flex_align_center" @click="goHelp">
              <van-icon name="question" />
              <span>帮助反馈</span>
            </van-col>
          </van-row>
        </van-row>
      </van-row>
    </van-popup>
    <!-- aside结束 -->
    <van-row class="home_nav_bar flex flex_align_center">
      <van-col
        span="3"
        class="left_nav flex flex_align_center flex_justify_center"
        @click="asideShow = true"
      >
        <van-icon name="wap-nav" />
      </van-col>
      <van-col
        :span="navItem.span"
        v-for="(navItem,index) in navList"
        :key="index+'nav'"
        @click="navHandle(index)"
      >
        <router-link
          :class="index === navActive ? 'active_Link':''"
          :to="{ path: navItem.link }"
        >{{navItem.name}}</router-link>
      </van-col>
      <van-col
        span="3"
        class="left_nav flex flex_align_center flex_justify_center"
        @click="goNotify"
      >
        <van-icon name="bell" />
      </van-col>
    </van-row>
    <van-row class="home_router_view">
      <router-view />
    </van-row>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      asideShow: false,
      navActive: 0,
      navList: [
        { name: "地图", link: "/home", span: "4" },
        { name: "拜访/会议", link: "/home/visit", span: "6" },
        { name: "申请", link: "/home/productapply", span: "4" },
        { name: "积分", link: "/home/integral", span: "4" }
      ],
      //左侧导航栏
      asideNav: [
        { name: "首页", src: require("../assets/image/sy.png"), link: "/home" },
        {
          name: "拜访",
          src: require("../assets/image/bf.png"),
          link: "/visitrecord"
        },
        {
          name: "会议",
          src: require("../assets/image/hy.png"),
          link: "/mettingrecord"
        },
        { name: "申请", src: require("../assets/image/sq.png"), link: "/home" },
        { name: "奖金", src: require("../assets/image/jj.png"), link: "/home" },
        {
          name: "医生",
          src: require("../assets/image/ys.png"),
          link: "/doctormanagement"
        },
        { name: "医院", src: require("../assets/image/yy.png"), link: "/home" },
        { name: "资料", src: require("../assets/image/zl.png"), link: "/home" },
        { name: "审批", src: require("../assets/image/sp.png"), link: "/home" }
      ]
    };
  },
  created() {
    // H5 plus事件处理
    function plusReady() {
      // 设置系统状态栏背景为白色
      plus.navigator.setStatusBarBackground("#FFF");
      plus.navigator.setStatusBarStyle("dark");
    }
    if (window.plus) {
      plusReady();
    } else {
      document.addEventListener("plusready", plusReady, false);
    }
  },
  mounted() {
    console.log(this.$route.path); //
    this.setNavActive();
  },
  methods: {
    navHandle(index) {
      this.navActive = index;
    },
    setNavActive() {
      let routePath = this.$route.path;
      switch (routePath) {
        case "/home":
          this.navActive = 0;
          break;
        case "/home/visit":
          this.navActive = 1;
          break;
        case "/home/productapply":
          this.navActive = 2;
          break;
        case "/home/integral":
          this.navActive = 3;
          break;
        default:
          break;
      }
    },
    goSetting() {
      this.$router.push({ path: "/usersetting" });
    },
    goHelp() {
      this.$router.push({ path: "/help" });
    },
    goUserInfo() {
      this.$router.push({ path: "/userinfocenter" });
    },
    goNotify() {
      this.$router.push({ path: "/notify" });
    }
  }
};
</script>
<style>
.home_nav_bar {
  font-size: 0.6875rem;
  color: #333;
  height: 3.125rem;
  line-height: 3.125rem;
  margin-bottom: 0.3125rem;
  position: fixed;
  top: 0rem;
  left: 0rem;
  right: 0rem;
  z-index: 99;
}
.left_nav,
.right_notice {
  font-size: 1rem;
}
.home_nav_bar .active_Link {
  color: #3399ff;
  font-size: 0.75rem;
  position: relative;
}
.home_nav_bar .active_Link:after {
  content: "";
  position: absolute;
  bottom: -0.1875rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0.625rem;
  height: 0.125rem;
  border-bottom: 2px solid #3399ff;
}

/* aside */
.aside_nav {
  padding: 0rem 0.75rem;
  text-align: left;
}
.top_image {
  height: 5rem;
}
.top_image img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
.top_image .user_info {
  font-size: 0.75rem;
  line-height: 1.25rem;
  margin-left: 0.5rem;
}
.top_image .user_name {
  font-weight: bold;
}
.top_image .user_detail {
  font-size: 0.6875rem;
}
.asideNavitem {
  margin-top: 0.75rem;
  font-size: 0.6875rem;
}
.asideNavitem img {
  width: 1.2rem;
  margin-right: 0.5rem;
}
.bottom_nav {
  margin-top: 4.5rem;
}
.bottom_nav span {
  font-size: 0.6875rem;
  margin-left: 0.3125rem;
}
</style>
