<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="产品奖金" left-arrow @click-left="onBack()" @click-right="submitOption">
        <van-icon name="success" class="submit_icon" slot="right" />
      </van-nav-bar>
    </van-row>
    <van-row class="approve_body">
      <van-row class="option_nav">
        <van-dropdown-menu>
          <van-dropdown-item
            :title="title"
            v-model="userId"
            :options="userList"
            @change="userChange"
          />
          <van-dropdown-item v-model="bonusType" :options="bonusList" @change="bonusChange" />
          <van-dropdown-item
            :title="productTitle"
            v-if="bonusType == 1"
            v-model="productId"
            :options="productList"
            @change="productChange"
          />
          <van-dropdown-item
            :title="hospitalTitle"
            v-if="bonusType == 1"
            v-model="hospitalId"
            :options="hospitalList"
            @change="hospitalChange"
          />
        </van-dropdown-menu>
      </van-row>
      <van-row class="approve_content">
        <van-row class="approve_content_item"
          ><span>拜访合格</span><span>{{ bonusDetail.visit_pass_num }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>拜访不合格</span><span>{{ bonusDetail.visit_no_pass_num }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>拜访未核销</span><span>{{ bonusDetail.visit_noused }}</span>
        </van-row>
        <van-row class="approve_content_item">
          <span>拜访已核销</span><span>{{ bonusDetail.visit_used }}</span>
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
        <van-row class="approve_content_item" v-if="bonusType == 1">
          <span>产品单价</span><span>{{ bonusDetail.region_bidding_price }}</span>
        </van-row>
        <van-row class="approve_content_item" v-if="bonusType == 1">
          <span>目标销量</span><span>{{ bonusDetail.region_promise_sales }}</span>
        </van-row>
        <van-row class="approve_content_item" v-if="bonusType == 1">
          <span>本期销量（盒）</span><span>{{ bonusDetail.sale }}</span>
        </van-row>
        <van-row class="approve_content_item" v-if="bonusType == 1">
          <span>总销量</span><span>{{ bonusDetail.total_sale }}</span>
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
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "productbonus",
  data() {
    return {
      title: "代表",
      productTitle: "产品",
      hospitalTitle: "医院",
      userId: "",
      bonusType: 1,
      productId: "",
      hospitalId: "",
      userList: [
        // { text: "代表1", value: 1 },
        // { text: "代表2", value: 2 },
        // { text: "代表3", value: 3 }
      ], //代表数据
      bonusList: [
        { text: "产品奖金", value: 1 },
        { text: "总奖金", value: 2 }
      ],
      productList: [
        // { text: "产品1", value: 1 },
        // { text: "产品2", value: 2 }
      ], //产品数据
      hospitalList: [
        // { text: "医院1", value: 1 },
        // { text: "医院2", value: 2 }
      ], //医院数据
      bonusDetail: {
        visit_pass_num: "--",
        visit_no_pass_num: "--",
        meeting_pass_num: "--",
        meeting_no_pass_num: "--",
        region_promise_sales: "--",
        region_bidding_price: "--",
        visit_used: "--",
        visit_noused: "--",
        meeting_used: "--",
        meeting_noused: "--",
        delay_action: "--",
        sale: "--",
        total_sale: "--",
        qte: "--",
        delay: "--",
        total_deposit: "--",
        total_returned: "--"
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
            this.$toast.fail(res.message);
          }
        })
        .catch(error => {
          this.$toast.clear();
          console.log(error);
        });
    },
    //代表
    userChange(value) {
      this.title = value.text;
      //代表切换，清空对应的产品和医院数据
      this.productTitle = "产品";
      this.hospitalTitle = "医院";
      this.productId = "";
      this.hospitalId = "";
      this.productList = [];
      this.hospitalList = [];
      this.bonusDetail = {
        visit_pass_num: "--",
        visit_no_pass_num: "--",
        meeting_pass_num: "--",
        meeting_no_pass_num: "--",
        region_promise_sales: "--",
        region_bidding_price: "--",
        visit_used: "--",
        visit_noused: "--",
        meeting_used: "--",
        meeting_noused: "--",
        delay_action: "--",
        sale: "--",
        total_sale: "--",
        qte: "--",
        delay: "--",
        total_deposit: "--",
        total_returned: "--"
      };
      if (this.bonusType == 1) {
        this.$toast.loading({
          message: "产品查询中...",
          loadingType: "spinner",
          duration: 0,
          forbidClick: true
        });
      }
      let params = { user_id: this.userId };
      this.$api
        .getProductByHospitalProduct(params)
        .then(res => {
          this.$toast.clear();
          // console.log(res);
          if (res.code == 200) {
            res.product_info.forEach(value => {
              this.productList.push({
                text: value.product_name + "-" + value.specification,
                value: value.product_id
              });
            });
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch(error => {
          this.$toast.clear();
        });
    },
    bonusChange() {
      this.bonusDetail = {
        visit_pass_num: "--",
        visit_no_pass_num: "--",
        meeting_pass_num: "--",
        meeting_no_pass_num: "--",
        region_promise_sales: "--",
        region_bidding_price: "--",
        visit_used: "--",
        visit_noused: "--",
        meeting_used: "--",
        meeting_noused: "--",
        delay_action: "--",
        sale: "--",
        total_sale: "--",
        qte: "--",
        delay: "--",
        total_deposit: "--",
        total_returned: "--"
      };
    },
    //产品
    productChange(value) {
      this.productTitle = value.text;
      //产品切换，重置医院数据
      this.hospitalTitle = "医院";
      this.hospitalId = "";
      this.hospitalList = [];
      this.bonusDetail = {
        visit_pass_num: "--",
        visit_no_pass_num: "--",
        meeting_pass_num: "--",
        meeting_no_pass_num: "--",
        region_promise_sales: "--",
        region_bidding_price: "--",
        visit_used: "--",
        visit_noused: "--",
        meeting_used: "--",
        meeting_noused: "--",
        delay_action: "--",
        sale: "--",
        total_sale: "--",
        qte: "--",
        delay: "--",
        total_deposit: "--",
        total_returned: "--"
      };
      this.$toast.loading({
        message: "医院查询中...",
        loadingType: "spinner",
        duration: 0,
        forbidClick: true
      });
      let params = {
        user_id: this.userId,
        product_id: this.productId
      };
      this.$api
        .getHospitalByHospitalProduct(params)
        .then(res => {
          this.$toast.clear();
          if (res.code == 200) {
            res.hospital_info.forEach(value => {
              this.hospitalList.push({
                text: value.hospital_name,
                value: value.hospital_id
              });
            });
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch(error => {
          console.log(error);
          this.$toast.clear();
        });
    },
    //医院
    hospitalChange(value) {
      this.hospitalTitle = value.text;
      this.bonusDetail = {
        visit_pass_num: "--",
        visit_no_pass_num: "--",
        meeting_pass_num: "--",
        meeting_no_pass_num: "--",
        region_promise_sales: "--",
        region_bidding_price: "--",
        visit_used: "--",
        visit_noused: "--",
        meeting_used: "--",
        meeting_noused: "--",
        delay_action: "--",
        sale: "--",
        total_sale: "--",
        qte: "--",
        delay: "--",
        total_deposit: "--",
        total_returned: "--"
      };
    },
    submitOption() {
      // console.log("user:", this.userId);
      // console.log("product:", this.productId);
      // console.log("hospital:", this.hospitalId);
      this.bonusDetail = {
        visit_pass_num: "--",
        visit_no_pass_num: "--",
        meeting_pass_num: "--",
        meeting_no_pass_num: "--",
        region_promise_sales: "--",
        region_bidding_price: "--",
        visit_used: "--",
        visit_noused: "--",
        meeting_used: "--",
        meeting_noused: "--",
        delay_action: "--",
        sale: "--",
        total_sale: "--",
        qte: "--",
        delay: "--",
        total_deposit: "--",
        total_returned: "--"
      };

      if (this.bonusType == 1) {
        if (!this.userId) {
          this.$toast.fail("请选择代表");
          return false;
        } else if (!this.productId) {
          this.$toast.fail("请选择产品");
          return false;
        } else if (!this.hospitalId) {
          this.$toast.fail("请选择医院");
          return false;
        } else {
          this.$toast.loading({
            message: "数据查询中...",
            loadingType: "spinner",
            duration: 0,
            forbidClick: true
          });
          let params = {
            user_id: this.userId,
            product_id: this.productId,
            hospital_id: this.hospitalId
          };
          this.$api
            .getProductPrize(params)
            .then(res => {
              this.$toast.clear();
              console.log(res);
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
                this.bonusDetail.sale = res.sale;
                this.bonusDetail.total_sale = res.total_sale;
                this.bonusDetail.qte = res.qte;
                this.bonusDetail.delay = res.delay;
                this.bonusDetail.total_deposit = res.total_deposit;
                this.bonusDetail.total_returned = res.total_returned;
                if (res.hospital_product_info) {
                  this.bonusDetail.region_promise_sales =
                    res.hospital_product_info.region_promise_sales;
                  this.bonusDetail.region_bidding_price =
                    res.hospital_product_info.region_bidding_price;
                }
              } else {
                this.$toast.fail(res.message);
              }
            })
            .catch(error => {
              this.$toast.clear();
              console.log(error);
            });
        }
      } else if (this.bonusType == 2) {
        // console.log("总奖金");
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
                this.bonusDetail.sale = res.sale;
                this.bonusDetail.total_sale = res.total_sale;
                this.bonusDetail.qte = res.qte;
                this.bonusDetail.delay = res.delay;
                this.bonusDetail.total_deposit = res.total_deposit;
                this.bonusDetail.total_returned = res.total_returned;
                if (res.hospital_product_info) {
                  this.bonusDetail.region_promise_sales =
                    res.hospital_product_info.region_promise_sales;
                  this.bonusDetail.region_bidding_price =
                    res.hospital_product_info.region_bidding_price;
                }
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
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0px;
}
.option_nav .van-dropdown-menu__title {
  padding: 0 !important;
  padding-right: 6px !important;
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
  padding-right: 0.8rem;
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
