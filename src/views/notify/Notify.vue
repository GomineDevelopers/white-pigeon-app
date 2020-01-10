<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="通知" left-arrow @click-left="onBack()" />
    </van-row>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-row class="main_body">
        <van-row class="activity_img" @click="goActivity"
          ><img src="../../assets/image/huodong.png"
        /></van-row>
        <van-row
          class="notify_body"
          @click="toSign(notifyItem.id)"
          v-for="(notifyItem, index) in notifyList"
          :key="index"
        >
          <van-row class="notify_date">{{ notifyItem.modify_time }}</van-row>
          <van-row class="notify_content">
            <van-row class="notify_title">您有一个新开发已通过</van-row>
            <van-row class="notify_text">
              您开发的{{ notifyItem.hospital_name }}已于{{
                notifyItem.modify_time
              }}已经通过审核，请您及时查看！
            </van-row>
          </van-row>
        </van-row>

        <van-row class="no_notify_notice" v-if="!isLoading && isShow">
          暂无通知
        </van-row>
      </van-row>
    </van-pull-refresh>
  </van-row>
</template>
<script>
export default {
  name: "notify",
  inject: ["reload"], //刷新页面
  data() {
    return {
      isLoading: false,
      notifyList: [],
      isShow: false
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
    this.getNotifyData();
  },
  methods: {
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.reload(); //刷新当前页面，加载新数据
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    // 获取消息数据条数
    getNotifyData() {
      this.$api
        .notify()
        .then(res => {
          if (res.code == 200) {
            // console.log(res);
            this.notifyList = res.sign_notice_list;
            this.isShow = res.sign_notice_list.length == 0 ? true : false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转签约页面
    toSign(id) {
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
            //银行卡信息完善跳转签约
            this.$router.push({
              path: "/signcontract",
              query: { id: id, redirect: this.$router.currentRoute.fullPath }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onBack() {
      history.back();
    },
    goActivity() {
      this.$router.push("/notice");
    }
  }
};
</script>
<style scoped>
.main_body {
  min-height: 60vh;
}
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
.no_notify_notice {
  color: #666;
  font-size: 0.75rem;
}
.activity_img {
  margin-bottom: 0.625rem;
}
.activity_img img {
  width: 100%;
  margin-top: -0.5rem;
}
</style>
