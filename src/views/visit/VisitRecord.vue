<template>
  <van-row class="productapply">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="拜访记录" left-arrow @click-left="onBack()" @click-right="newVisit">
        <van-icon class="add_icon" name="add" slot="right" />
      </van-nav-bar>
    </van-row>

    <van-row class="top_nav border_bom">
      <van-row class="top_nav_list">
        <van-col
          :class="index === navActive ? 'active' : ''"
          v-for="(navItem, index) in navList"
          :key="index + 'a'"
          @click="navHandle(index, navItem.status)"
        >
          <van-row>{{ navItem.num }}</van-row>
          <van-row>{{ navItem.name }}</van-row>
        </van-col>
      </van-row>
      <!-- <van-row class="newest_date">最新核销日期：2019.10.12</van-row>  二期开发 -->
    </van-row>

    <van-row class="main_body3">
      <visitrecord-list :status="status"></visitrecord-list>
    </van-row>
  </van-row>
</template>
<script>
import visitrecordList from "@/views/components/VisitrecordList";
export default {
  name: "visitrecord",
  components: {
    "visitrecord-list": visitrecordList
  },
  data() {
    return {
      navActive: 0,
      status: 7,
      navList: [
        { name: "全部", num: 0, status: 7 },
        { name: "合格", num: 0, status: 1 },
        { name: "不合格", num: 0, status: 2 },
        { name: "已核销", num: 0, status: 4 },
        { name: "已失效", num: 0, status: 5 }
      ]
    };
  },
  mounted() {
    this.visitRecord();
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
    // 获取记录数据
    visitRecord() {
      this.$api
        .visitRecord()
        .then(res => {
          if (res.code == 200) {
            this.navList[0].num = res.apply_record_num;
            this.navList[1].num = res.pass_apply_record_num;
            this.navList[2].num = res.refuse_apply_record_num;
            this.navList[3].num = res.charge_off_apply_record_num;
            this.navList[3].num = res.failure_apply_record_num;
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    navHandle(index, status) {
      this.navActive = index;
      this.status = status;
    },
    onBack() {
      history.back();
    },
    //创建拜访
    newVisit() {
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
            this.$router.push({ path: "/newvisit" });
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
.productapply {
  margin-top: 2.5rem;
  height: 90vh;
  overflow: hidden;
}
.main_body3 {
  /* padding: 0rem 1rem 1.25rem 1rem; */
  text-align: left;
  height: 80vh;
  overflow-y: auto;
}
.top_nav {
  font-size: 0.75rem;
  padding: 0.5rem 0rem 0.3rem 0rem;
}
.top_nav .top_nav_list {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
}
.top_nav .van-col {
  text-align: center;
  width: 20%;
}
.top_nav .active {
  color: #3399ff;
}
.newest_date {
  text-align: right;
  padding-right: 0.5rem;
  margin-top: 0.625rem;
  font-size: 0.625rem;
  color: #a8aec1;
}
.add_icon {
  font-size: 1rem;
}
</style>
