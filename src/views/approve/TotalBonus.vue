<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="总奖金" left-arrow @click-left="onBack()" @click-right="submitOption">
        <van-icon name="success" class="submit_icon" slot="right" />
      </van-nav-bar>
    </van-row>
    <van-row class="approve_body">
      <van-row class="option_nav">
        <van-dropdown-menu>
          <van-dropdown-item
            :title="userTitle"
            v-model="userId"
            :options="userList"
            @change="userChange"
          />
        </van-dropdown-menu>
      </van-row>
      <van-row class="approve_content">
        <van-row class="approve_content_item">
          <span>拜访合格</span><span>{{ bonusDetail.visit_pass_num }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>拜访不合格</span><span>{{ bonusDetail.visit_no_pass_num }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>拜访未核销</span><span>{{ bonusDetail.meeting_used }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>拜访已核销</span><span>{{ bonusDetail.meeting_noused }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>会议合格</span><span>{{ bonusDetail.meeting_pass_num }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>会议不合格</span><span>{{ bonusDetail.meeting_no_pass_num }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>会议未核销</span><span>{{ bonusDetail.meeting_noused }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>会议已核销</span><span>{{ bonusDetail.meeting_used }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>未返行为积分</span><span>{{ bonusDetail.delay_action }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>本期可提积分</span><span>{{ bonusDetail.qte }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>本期延迟积分</span><span>{{ bonusDetail.delay }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>累计已扣积分</span><span>{{ bonusDetail.total_deposit }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>累计已返积分</span><span>{{ bonusDetail.total_returned }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>推荐用户数量</span><span>{{ bonusDetail.invite_num }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>累计推荐用户</span><span>{{ bonusDetail.total_invite_num }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>累计推荐积分</span><span>{{ bonusDetail.total_invite_bonus }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>累计开发积分</span><span>{{ bonusDetail.total_develop }}</span>
        </van-row>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "totalbonus",
  data() {
    return {
      userTitle: "代表",
      userId: "",
      userList: [],
      bonusDetail: {
        visit_pass_num: "--",
        visit_no_pass_num: "--",
        meeting_pass_num: "--",
        meeting_no_pass_num: "--",
        visit_used: "--",
        visit_noused: "--",
        meeting_used: "--",
        meeting_noused: "--",
        delay_action: "--",
        qte: "--",
        delay: "--",
        total_deposit: "--",
        total_returned: "--",
        invite_num: "--",
        total_invite_num: "--",
        total_invite_bonus: "--",
        total_develop: "--"
      }
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
    this.getUserOption();
  },
  methods: {
    onBack() {
      this.$router.push("/approveindex");
    },
    //获取代表筛选条件
    getUserOption() {
      this.$toast.loading({
        message: "代表查询中...",
        loadingType: "spinner",
        duration: 0,
        forbidClick: true
      });
      this.$api
        .getUserByHospitalProduct()
        .then(res => {
          this.$toast.clear();
          if (res.code == 200) {
            let data = res.user_info;
            data.forEach((value, index) => {
              this.userList.push({ text: value.name, value: value.user_id });
            });
          } else {
            this.$toast("代表数据请求出错！");
          }
        })
        .catch(error => {
          this.$toast.clear();
          console.log(error);
        });
    },
    //代表
    userChange(value) {
      this.userTitle = value.text;
      this.bonusDetail = {
        visit_pass_num: "--",
        visit_no_pass_num: "--",
        meeting_pass_num: "--",
        meeting_no_pass_num: "--",
        visit_used: "--",
        visit_noused: "--",
        meeting_used: "--",
        meeting_noused: "--",
        delay_action: "--",
        qte: "--",
        delay: "--",
        total_deposit: "--",
        total_returned: "--",
        invite_num: "--",
        total_invite_num: "--",
        total_invite_bonus: "--",
        total_develop: "--"
      };
    },
    submitOption() {
      this.bonusDetail = {
        visit_pass_num: "--",
        visit_no_pass_num: "--",
        meeting_pass_num: "--",
        meeting_no_pass_num: "--",
        visit_used: "--",
        visit_noused: "--",
        meeting_used: "--",
        meeting_noused: "--",
        delay_action: "--",
        qte: "--",
        delay: "--",
        total_deposit: "--",
        total_returned: "--",
        invite_num: "--",
        total_invite_num: "--",
        total_invite_bonus: "--",
        total_develop: "--"
      };
      if (!this.userId) {
        this.$toast.fail("请选择代表");
        return false;
      } else {
        this.$toast.loading({
          message: "数据查询中...",
          loadingType: "spinner",
          duration: 0,
          forbidClick: true
        });
        let params = {
          user_id: this.userId
        };
        this.$api
          .getSumProductPrize(params)
          .then(res => {
            this.$toast.clear();
            // console.log(res);
            if (res.code == 200) {
              this.bonusDetail.visit_pass_num = res.visit_pass_num;
              this.bonusDetail.visit_no_pass_num = res.visit_no_pass_num;
              this.bonusDetail.meeting_pass_num = res.meeting_pass_num;
              this.bonusDetail.meeting_no_pass_num = res.meeting_no_pass_num;
              this.bonusDetail.visit_used = res.visit_used;
              this.bonusDetail.visit_noused = res.visit_noused;
              this.bonusDetail.meeting_used = res.meeting_used;
              this.bonusDetail.meeting_noused = res.meeting_noused;
              this.bonusDetail.delay_action = res.delay_action;
              this.bonusDetail.qte = res.qte;
              this.bonusDetail.delay = res.delay;
              this.bonusDetail.total_deposit = res.total_deposit;
              this.bonusDetail.total_returned = res.total_returned;
              this.bonusDetail.invite_num = res.invite_num;
              this.bonusDetail.total_invite_num = res.total_invite_num;
              this.bonusDetail.total_invite_bonus = res.total_invite_bonus;
              this.bonusDetail.total_develop = res.total_develop;
            } else {
              this.$toast.fail(res.message);
            }
          })
          .catch(error => {
            this.$toast.clear();
            console.log(error);
          });
      }
    }
  }
};
</script>
<style>
.option_nav .van-dropdown-item__option .van-cell__title span {
  font-size: 0.6875rem !important;
}
.option_nav .van-dropdown-menu__item .van-dropdown-menu__title {
  font-size: 0.6875rem !important;
}
.van-dropdown-menu__item {
  justify-content: start;
  padding-left: 0.6rem;
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0px;
}
</style>
<style scoped>
.approve_body {
  margin-top: 2rem;
  height: calc(100vh - 2rem);
}
.option_nav {
  height: 2.2rem;
  border-bottom: 1px solid #f0f0f0;
}
.approve_content {
  height: calc(100% - 2.7rem);
  overflow-y: auto;
  padding: 0rem 1rem;
}
.approve_content .approve_content_item {
  text-align: left;
  border-top: 1px solid #f0f0f0;
  padding: 0.55rem 0rem;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
}
.approve_content .approve_content_item:nth-child(1) {
  border-top: none;
}
.approve_content .approve_content_item span:nth-child(1) {
  flex: 1;
  font-size: 0.6875rem;
  color: #333;
}
.approve_content .approve_content_item span:nth-child(2) {
  color: #ff8600;
  font-size: 0.6875rem;
}
.submit_icon {
  font-size: 1rem;
}
</style>
