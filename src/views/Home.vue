<template>
  <div class="home">
    <!-- aside开始 -->
    <!-- <van-cell></van-cell> -->
    <van-popup v-model="asideShow" position="left" :style="{ height: '100%', width: '70%' }">
      <van-row class="aside_nav">
        <van-row class="top_image flex flex_align_center border_bom" @click="goUserInfo">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <van-row class="user_info">
            <span class="user_name">{{ user.name }}</span>
            <br />
            <span class="user_detail">{{ user.address }}</span>
          </van-row>
        </van-row>
        <van-row>
          <van-row
            class="asideNavitem flex flex_align_center"
            v-for="(asideNavItem, index1) in asideNav"
            :key="index1 + 'as'"
            @click="link(asideNavItem.link)"
          >
            <img :src="asideNavItem.src" />
            <span>{{ asideNavItem.name }}</span>
            <!-- <router-link :to="{ path: asideNavItem.link }">{{ asideNavItem.name }}</router-link> -->
          </van-row>
          <van-row class="bottom_nav">
            <van-col span="12" class="flex flex_align_center" @click="goSetting">
              <van-icon name="setting" />
              <span>设置</span>
            </van-col>
            <van-col span="12" class="flex flex_align_center" @click="goHelp">
              <van-icon name="question" />
              <span>系统帮助</span>
            </van-col>
          </van-row>
        </van-row>
      </van-row>
    </van-popup>
    <!-- aside结束 -->
    <van-row class="home_nav_bar flex flex_align_center">
      <van-col
        span="5"
        class="left_nav flex flex_align_center flex_justify_center"
        @click="asideShow = true"
      >
        <img class="notify_icon" src="../assets/image/nav_icon.png" />
        <!-- <van-icon name="wap-nav" /> -->
      </van-col>
      <van-col
        :span="navItem.span"
        v-for="(navItem, index) in navList"
        :key="index + 'nav'"
        @click="navHandle(index, navItem.link)"
      >
        <span :class="index === navActive ? 'active_Link' : ''">{{ navItem.name }}</span>
        <!-- <router-link
          :class="index === navActive ? 'active_Link' : ''"
          :to="{ path: navItem.link }"
          >{{ navItem.name }}</router-link
        > -->
      </van-col>
      <van-col
        span="5"
        class="notify_col left_nav flex flex_align_center flex_justify_center"
        @click="goNotify"
      >
        <!-- <van-icon name="bell" /> -->
        <img class="notify_icon" src="../assets/image/notify.png" />
        <i class="notify" v-show="notify">{{ notify }}</i>
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
      notify: 0,
      user: {},
      asideShow: false,
      navActive: 0,
      navList: [
        { name: "地图", link: "/", span: "7" },
        { name: "拜访/会议", link: "/home/visit", span: "7" }
        // { name: "开发", link: "/home/productapply", span: "4" },
        // { name: "积分", link: "/home/integral", span: "4" }
      ],
      //左侧导航栏
      asideNav: [
        { name: "首页", src: require("../assets/image/sy.png"), link: "/" },
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
        {
          name: "开发",
          src: require("../assets/image/sq.png"),
          link: "/productapply"
        },
        {
          name: "积分",
          src: require("../assets/image/jj.png"),
          link: "/integral"
        },
        {
          name: "医生",
          src: require("../assets/image/ys.png"),
          link: "/doctormanagement"
        },
        {
          name: "医院",
          src: require("../assets/image/yy.png"),
          link: "/hospitalmanagement"
        },
        { name: "资料", src: require("../assets/image/zl.png"), link: "/selfstudy" }
        // {
        //   name: "审批",
        //   src: require("../assets/image/sp.png"),
        //   link: "/approveindex"
        // }
      ]
    };
  },
  watch: {
    $route: "setNavActive"
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
    this.setNavActive();
    this.getNotifyData();
    this.getUserInfo();
  },
  methods: {
    navHandle(index, path) {
      console.log(index, path);
      if (index == 1) {
        this.$api
          .userInfo()
          .then(res => {
            //判断用户银行卡信息是否完善
            if (
              res.user.account_name == null ||
              res.user.card_no == null ||
              res.user.open_bank == null
            ) {
              //银行卡信息不完善跳转银行卡完善信息页
              this.$Dialog
                .confirm({
                  message: "请先完善银行卡信息！",
                  confirmButtonText: "前往",
                  cancelButtonText: "取消"
                })
                .then(() => {
                  this.$router.push({
                    path: "/bankcard",
                    query: {
                      redirect: this.$router.currentRoute.fullPath
                    }
                  });
                })
                .catch(() => {
                  console.log("取消完善银行卡信息！");
                });
            } else {
              this.navActive = index;
              //银行卡信息完善跳转签约
              this.$router.push({ path: path });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.navActive = index;
        this.$router.push({ path: path });
      }
    },
    asideNavRoute(path) {
      console.log(path);
    },
    setNavActive() {
      let routePath = this.$route.path;
      switch (routePath) {
        case "/":
          this.navActive = 0;
          break;
        case "/home/visit":
          this.navActive = 1;
          break;
        // case "/home/productapply":
        //   this.navActive = 2;
        //   break;
        // case "/home/integral":
        //   this.navActive = 3;
        //   break;
        default:
          break;
      }
      // console.log(routePath);
    },
    link(path) {
      this.asideShow = false;
      this.$router.push({ path });
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
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取消息数据条数
    getNotifyData() {
      this.$api
        .notify()
        .then(res => {
          if (res.code == 200) {
            this.notify = res.sign_notice_list.length;
          }
        })
        .catch(err => {
          console.log(err);
        });
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
  padding: 0rem 0.5rem;
}
.home_nav_bar span {
  font-size: 0.6875rem;
}
.left_nav,
.right_notice {
  font-size: 1rem;
}
.home_nav_bar a {
  color: #333;
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
  position: relative;
  height: 100%;
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
  overflow: hidden;
}
.top_image .user_name {
  font-weight: bold;
}
.top_image .user_detail {
  display: block;
  font-size: 0.6875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.asideNavitem {
  margin-top: 1rem;
  font-size: 0.6875rem;
}
.asideNavitem img {
  width: 1.2rem;
  margin-right: 0.5rem;
}
.bottom_nav {
  /* margin-top: 4.5rem; */
  position: absolute;
  bottom: 1.25rem;
  /* left: 0;
  right: 0; */
  left: 0.75rem;
  right: 0rem;
  text-align: center;
}
.bottom_nav span {
  font-size: 0.6875rem;
  margin-left: 0.3125rem;
}
.notify_col {
  position: relative;
}
.notify_col .notify {
  position: absolute;
  top: -0.125rem;
  right: 0.8rem;
  background: red;
  color: #fff;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  font-size: 0.5rem;
  text-align: center;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
}
.notify_icon {
  width: 0.9rem;
}
</style>
