<template>
  <van-row class="integral">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="积分" left-arrow @click-left="onBack()" />
    </van-row>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-row class="main_body">
        <van-row class="top_notice">
          您好，
          <br />{{ name }}，以下是您本期积分数额及积分明细。
        </van-row>
        <van-row class="integral_content">
          <van-row class="integral_total">
            <span>累计积分总额</span>
            <span>
              <i>{{ bonusDatiled.total ? bonusDatiled.total : "0" }}</i
              >分
            </span>
          </van-row>
          <van-row class="integral_detail">
            <span class="integral_detail_title">积分明细</span>
            <van-row>
              <ul>
                <li>
                  <span class="title">
                    本期可提积分
                    <van-icon name="question" @click="readTips(1)" />
                    <p class="tips" :class="{ active: tips == 1 }">
                      本期实际发放积分
                    </p>
                  </span>
                  <span>
                    +{{ bonusDatiled.extractable_bonus ? bonusDatiled.extractable_bonus : "0" }}
                  </span>
                </li>
                <!-- <li>
                  <span>本期业绩积分</span>
                  <span>
                    +{{ bonusDatiled.achievement_bonus ? bonusDatiled.achievement_bonus : "0" }}
                  </span>
                </li> -->
                <li>
                  <span>本期医院开发积分</span>
                  <span>
                    +{{ bonusDatiled.develop_bonus ? bonusDatiled.develop_bonus : "0" }}
                  </span>
                </li>
                <li v-if="'invite_bonus' in bonusDatiled">
                  <span>本期推荐奖励积分</span>
                  <span> +{{ bonusDatiled.invite_bonus ? bonusDatiled.invite_bonus : "0" }} </span>
                </li>
                <li>
                  <span class="title">
                    本期扣押积分
                    <van-icon name="question" @click="readTips(2)" />
                    <p class="tips" :class="{ active: tips == 2 }">
                      本期所扣押金积分
                    </p>
                  </span>
                  <span> +{{ bonusDatiled.deposit ? bonusDatiled.deposit : "0" }} </span>
                </li>
                <!-- <li>
                  <span>本期总计积分</span>
                  <span> +{{ bonusDatiled.total_bonus ? bonusDatiled.total_bonus : "0" }} </span>
                </li> -->
                <li>
                  <span class="title">
                    累计已返积分
                    <van-icon name="question" @click="readTips(3)" />
                    <p class="tips" :class="{ active: tips == 3 }">
                      往期已提奖金之和，不含本期
                    </p>
                  </span>
                  <span>
                    +{{
                      bonusDatiled.total_extractable_bonus
                        ? bonusDatiled.total_extractable_bonus
                        : "0"
                    }}
                  </span>
                </li>
                <li>
                  <span class="title">
                    累计已扣押积分
                    <van-icon name="question" @click="readTips(4)" />
                    <p class="tips" :class="{ active: tips == 4 }" style="left:5.5rem">
                      往期已扣押金之和，不含本期
                    </p>
                  </span>
                  <span>
                    +{{ bonusDatiled.total_deposit ? bonusDatiled.total_deposit : "0" }}
                  </span>
                </li>
                <li>
                  <span>订单号</span>
                  <span>
                    {{ bonusDatiled.develop_bonus ? bonusDatiled.develop_bonus : "0" }}
                  </span>
                </li>
                <li>
                  <span>订单时间</span>
                  <span>
                    {{ bonusDatiled.develop_bonus ? bonusDatiled.develop_bonus : "0" }}
                  </span>
                </li>
                <!-- <li>
                  <span>累计延迟积分</span>
                  <span>
                    +{{ bonusDatiled.total_delay_bonus ? bonusDatiled.total_delay_bonus : "0" }}
                  </span>
                </li>
                <li>
                  <span>累计总积分</span>
                  <span> +{{ bonusDatiled.total ? bonusDatiled.total : "0" }} </span>
                </li> -->
              </ul>
            </van-row>
            <van-row class="cancel_date">核销日期：{{ bonusDatiled.modify_time }}</van-row>
          </van-row>
          <div class="integral_btn">
            <van-button type="info" size="normal">确 认</van-button>
          </div>
        </van-row>
      </van-row>
    </van-pull-refresh>
  </van-row>
</template>
<script>
export default {
  name: "integral",
  inject: ["reload"], //刷新页面
  data() {
    return {
      tips: -1,
      isLoading: false,
      name: "",
      name2: "",
      bonusDatiled: {}, //积分明细
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
    this.getUserInfo();
  },
  // mounted(){
  //   getUserInfo()
  // },
  methods: {
    onBack() {
      history.back();
    },
    getUserInfo() {
      this.$toast.loading({
        message: "数据加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.$api
        .userInfo()
        .then((res) => {
          if (res.code == 200) {
            this.name = res.user.name;
            let param = { user_id: res.user.id };
            this.$api
              .bonusDetail(param)
              .then((res) => {
                // console.log(res);
                this.$toast.clear();
                if (res.code == 200) {
                  this.bonusDatiled = res.bonus_datiled;
                  if (res.bonus_datiled.length == 0) {
                    this.$toast("暂无数据");
                  }
                }
              })
              .catch((error) => {
                this.$toast.clear();
                console.log(error);
              });
          }
        })
        .catch((error) => {
          this.$toast.clear();
          console.log(error);
        });
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.reload(); //刷新当前页面，加载新数据
        this.isLoading = false;
      }, 500);
    },
    // 查看提示
    readTips(id) {
      this.tips == id ? (this.tips = -1) : (this.tips = id);
    },
  },
};
</script>
<style scoped>
.main_body {
  min-height: 78vh;
}
.integral {
  text-align: left;
  color: #333;
  font-size: 0.75rem;
}
.top_notice {
  width: 92%;
  margin: 0 auto;
  font-size: 0.6875rem;
  background-image: linear-gradient(to right, #2b7cdc, #239dff);
  color: #fff;
  padding: 0.5rem 0.4rem;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  box-shadow: 0rem 0rem 0.5rem #048bfb;
  /* box-shadow: 10px 0 17px -6px #048bfb, -10px 0 19px -6px #048bfb; */
}
.integral_content {
  padding: 0.8rem 0rem;
}
.integral_total {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
}
.integral_total span:nth-child(1) {
  font-size: 0.75rem;
  margin-bottom: 0.2rem;
  color: #000;
}
.integral_total span:nth-child(2) {
  font-size: 0.625rem;
}
.integral_total span:nth-child(2) i {
  font-style: normal;
  font-weight: bold;
  color: #ff8600;
  font-size: 1rem !important;
}
.integral_detail {
  margin-top: 0.625rem;
}
.integral_detail_title {
  margin-bottom: 0.55rem;
  color: #000;
}
.integral_detail ul li {
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 0.55rem 0rem;
}
.integral_detail ul li:last-child {
  border-bottom: none;
}
.integral_detail ul li span {
  font-size: 0.625rem;
}
.integral_detail ul li span:nth-child(2) {
  color: #ff8600;
}
.cancel_date {
  text-align: right;
  color: #a8aec1;
  font-size: 0.625rem;
  margin-top: 0.3125rem;
}
.title {
  position: relative;
  display: block;
  font-size: 0.625rem;
  width: 100%;
}
.title .van-icon {
  color: #d2d7de !important;
  font-size: 0.75rem;
  vertical-align: -2px;
}
.title .tips {
  font-size: 0.5rem;
  position: absolute;
  margin: 0;
  left: 5rem;
  z-index: 10;
  top: -5px;
  width: 52%;
  background: #fff;
  padding: 0.2rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.1875rem;
  display: none;
}
.title .tips.active {
  display: inline-block;
}
.integral_btn {
  margin-top: 40px;
  text-align: center;
}
.integral_btn button {
  width: 90%;
}
</style>
