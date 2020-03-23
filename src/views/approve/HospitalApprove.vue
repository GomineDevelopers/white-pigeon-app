<template>
  <van-row class="approve_content">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="审批" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="approve_content_body">
      <van-row class="approve_detail">
        <ul>
          <li class="flex_li">
            <span>开发人：</span>
            <span>{{ detail.name }}</span>
          </li>
          <li class="flex_li">
            <span>电话：</span>
            <span>{{ detail.email }}</span>
          </li>
          <li class="flex_li">
            <span>医院：</span>
            <span>{{ detail.hospital_name }}</span>
          </li>
          <li class="flex_li">
            <span>承诺月均销量：</span>
            <span
              >{{ detail.product_name + "-" + detail.package }}&nbsp;&nbsp;{{
                detail.promise_sales
              }}</span
            >
          </li>
          <li class="flex_li">
            <span>申请时间：</span>
            <span>{{ detail.create_time }}</span>
          </li>
          <li>
            <span>医院了解</span>
            <span class="know_more">{{ detail.hospital_know }}</span>
          </li>
          <li>
            <span>竞品了解：</span>
            <span class="know_more" v-if="!detail.commodity_know">暂无</span>
            <span class="know_more" v-if="detail.commodity_know">{{ detail.commodity_know }}</span>
          </li>
        </ul>
        <div v-if="detail.status == 1" class="region_sure_wap">
          <span class="tit">区域经理确认代表的销量和单价</span>
          <ul>
            <li class="flex_li">
              <span>销量：</span>
              <span v-if="detail.region_promise_sales"
                >{{ detail.product_name }} {{ detail.region_promise_sales }}</span
              >
              <span v-else>无</span>
            </li>
            <li class="flex_li">
              <span>单价：</span>
              <span v-if="detail.region_bidding_price">{{ detail.region_bidding_price }}元</span>
              <span v-else>无</span>
            </li>
            <li class="flex_li">
              <span>首次开发奖金：</span>
              <span v-if="detail.first_price">{{ detail.first_price }}元</span>
              <span v-else>无</span>
            </li>
          </ul>
        </div>
      </van-row>
    </van-row>
    <van-row class="handle" v-if="detail.status == 3">
      <span>
        <button class="refuse" @click="showRefuse">拒绝</button>
      </span>
      <span>
        <button class="pass" @click="passShow = true">通过</button>
      </span>
    </van-row>
    <van-row>
      <van-dialog v-model="show" title="拒绝理由" show-cancel-button :beforeClose="changeBtn">
        <van-field
          class="refuse_text"
          v-model="value"
          placeholder="请输入您的拒绝理由"
          ref="refuse"
        />
      </van-dialog>
      <van-dialog
        class="pass_dialog"
        v-model="passShow"
        title="请输入代表的销量和单价"
        show-cancel-button
        :beforeClose="passBtn"
      >
        <van-field
          type="number"
          v-model="promiseSales"
          placeholder="请输入承诺月均销量"
          ref="promise"
        />
        <van-field type="number" v-model="biddingPrice" placeholder="请输入单价" ref="bidding" />
        <van-field
          type="number"
          v-model="firstBonus"
          placeholder="请输入首次开发奖金（选填）"
          ref="bidding"
        />
      </van-dialog>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "DoctorApprove",
  data() {
    return {
      show: false,
      passShow: false,
      value: "",
      promiseSales: "",
      biddingPrice: "",
      firstBonus: "", //首次开发奖
      detail: {}
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
    this.$toast.loading({
      id: 0,
      message: "数据加载中...",
      forbidClick: true,
      duration: 0,
      loadingType: "spinner"
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.id = this.$route.query.id;
      this.getData();
    });
  },
  methods: {
    // 获取数据
    getData() {
      this.$api
        .regionProDetial({ hospitl_product_id: this.id })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.detail = res.regional_hospital_product_detail;
          } else {
            this.$dialog.alert({
              message: res.message
            });
          }
          this.$toast.clear();
        })
        .catch(err => {
          console.log(err);
          this.$toast.clear();
        });
    },
    onBack() {
      history.back();
    },
    // 提交拒绝处理
    showRefuse() {
      this.show = true;
    },
    // 提交通过处理
    submitpass() {
      let data = {
        hospital_product_id: this.id,
        region_promise_sales: this.promiseSales,
        region_bidding_price: Number(this.biddingPrice).toFixed(2),
        first_price: Number(this.firstBonus).toFixed(2)
      };
      this.$toast.loading({
        id: 0,
        message: "数据处理中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner"
      });
      this.$api
        .regionProPass(data)
        .then(res => {
          if (res.code == 200) {
            this.$toast("处理成功");
            setTimeout(() => {
              this.$router.replace("/approveindex");
            }, 1000);
          } else {
            this.$dialog
              .alert({
                message: res.message
              })
              .then(() => {
                this.$router.replace("/approveindex");
              });
          }
          this.$toast.clear();
        })
        .catch(err => {
          console.log(err);
          this.$toast.clear();
        });
    },
    // 拒绝理由弹出处理
    changeBtn(action, done) {
      if (action === "confirm") {
        if (!this.value) {
          this.$toast("拒绝理由不能为空");
          this.$refs.refuse.focus();
          done(false);
        } else {
          this.submitRefuse(done);
        }
      } else {
        done();
      }
    },
    // 通过区域经理弹出处理
    passBtn(action, done) {
      if (action === "confirm") {
        if (!this.promiseSales) {
          this.$toast("承诺月均销量不能为空");
          this.$refs.promise.focus();
          done(false);
        } else if (!this.biddingPrice) {
          this.$toast("单价不能为空");
          this.$refs.bidding.focus();
          done(false);
        } else {
          this.$dialog
            .confirm({
              message: "请确认销量和单价是否正确，一旦提交不可修改！"
            })
            .then(() => {
              this.submitpass();
              done();
            })
            .catch(() => {
              done(false);
            });
          //
        }
      } else {
        done();
      }
    },

    // 提交拒绝开发
    submitRefuse(done) {
      let data = {
        hospital_product_id: this.id,
        no_pass_reason: this.value
      };
      this.$api
        .regionProRefuse(data)
        .then(res => {
          done();
          if (res.code == 200) {
            this.$toast("提交成功");
            setTimeout(() => {
              this.$router.replace("/approveindex");
            }, 1000);
          } else {
            this.$dialog
              .alert({
                message: res.message
              })
              .then(() => {
                this.$router.replace("/approveindex");
              });
          }
        })
        .catch(err => {
          console.log(err);
          done();
        });
    }
  }
};
</script>
<style>
.approve_content .van-cell:not(:last-child)::after {
  border-bottom: none;
}
.approve_content .van-dialog__footer {
  margin-top: 0.625rem;
}
.pass_dialog .van-cell__value {
  border: 1px solid #ebedf0;
  height: 30px;
  border-radius: 4px;
  padding-left: 10px;
}
.pass_dialog .van-cell__value input {
  height: 30px;
}
.pass_dialog .van-dialog__header {
  height: auto;
  font-size: 0.6rem;
  line-height: normal;
}
</style>
<style scoped>
.approve_content_body {
  margin-top: 2rem;
  padding: 0rem 1rem;
}
.approve_detail ul li {
  border-bottom: 1px solid #ecf1f8;
  text-align: left;
  padding: 0.625rem 0rem;
}
.approve_detail ul li.flex_li {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
}
.approve_detail ul li span {
  font-size: 0.75rem;
}
.approve_detail ul li span:nth-child(1) {
  flex: 1;
  white-space: nowrap;
}
.approve_detail ul li span:nth-child(2) {
  text-align: right;
  color: #a8aec1;
}
.approve_detail ul li span.know_more {
  display: block;
  text-align: left;
  font-size: 0.625rem;
  color: #a8aec1;
  line-height: 1rem;
  margin-top: 0.2rem;
}
.handle {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 1.25rem;
  width: calc(100% - 2rem);
  padding: 0rem 1rem;
  margin: auto;
}
.handle span {
  width: 46%;
  height: 1.5625rem;
}
.refuse,
.pass {
  display: block;
  width: 100%;
  height: 1.5625rem;
  line-height: 1.5625rem;
  border: none;
  border-radius: 0.25rem;
}
.refuse {
  background: #efded6;
  color: #f86e24;
}
.pass {
  background: #3399ff;
  color: #fff;
  margin-left: 0.7rem;
}
.region_sure_wap {
  margin-bottom: 1.25rem;
}
.region_sure_wap .tit {
  display: inline-block;
  margin-top: 1.35rem;
  margin-bottom: 0.5rem;
  font-size: 0.65rem;
  color: #000;
}
</style>
