<template>
  <van-row class="applyhospitaldetail">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="医院详情" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row class="hospital_detail hospital_module">
        <span class="right_combined">
          <img src="@/assets/image/Combined.png" />
        </span>
        <img src="@/assets/image/hospital_icon.png" class="hospital_icon" />
        <van-row class="hospital_name">{{ hospitalInfo.hospital_name }}</van-row>
        <van-row class="hospital_tag">
          <span class="compositive">{{ hospitalInfo.hospital_type }}</span>
          <span class="three_level">{{ hospitalInfo.hospital_level }}</span>
          <span class="public">{{ hospitalInfo.hospital_run_type }}</span>
        </van-row>
        <van-row class="hospital_adress flex justify_between">
          <span class="flex flex_align_center">
            <img src="@/assets/image/address.png" />{{ hospitalInfo.address }}
          </span>
          <span @click="call(hospitalInfo.tel)">
            <i></i>
            <img class="call_img" src="@/assets/image/phone.png" />
          </span>
        </van-row>
      </van-row>
      <van-row class="await_develop_title">待申请产品</van-row>
      <van-row class="already_develop_content">
        <van-row class="already_develop_product hospital_module">
          <van-row v-for="(awaitItem, index) in awaitDevelopd" :key="index + 'a'">
            <span
              >{{ awaitItem.product_name }}-{{ awaitItem.specification }}&nbsp;&nbsp;¥{{
                awaitItem.bidding_price
              }}</span
            >
          </van-row>
        </van-row>
      </van-row>
      <van-row class="await_develop_title">已申请产品</van-row>
      <van-row class="already_develop_product hospital_module">
        <van-row class="already_develop_title">
          <van-col span="12" :class="isShow ? 'active' : ''" @click="isShow = !isShow"
            >销量</van-col
          >
          <van-col span="12" :class="isShow ? '' : 'active'" @click="isShow = !isShow"
            >价格</van-col
          >
        </van-row>
        <van-row class="already_develop_content" v-show="isShow">
          <van-row v-for="(item, index2) in developdData" :key="index2 + 'b'">
            <span
              >{{ item.product_name }}-{{ item.specification }}&nbsp;&nbsp;¥{{
                item.bidding_price
              }}</span
            >
          </van-row>
        </van-row>
        <van-row class="already_develop_content" v-show="!isShow">
          <van-row v-for="(item, index2) in developdData" :key="index2 + 'b'">
            <span
              >{{ item.product_name }}-{{ item.specification }}&nbsp;&nbsp;¥{{
                item.bidding_price
              }}</span
            >
          </van-row>
        </van-row>
      </van-row>
      <!-- <van-row class="public_btn">
        <button>确&nbsp;定</button>
      </van-row> -->
    </van-row>
  </van-row>
</template>
<script>
import { setHospitalLevel, setHospitalType, setHospitalRunType } from "@/js/public";
export default {
  name: "applyhospitaldetail",
  data() {
    return {
      product: "1",
      isShow: true,
      hospitalInfo: {
        hospital_name: "",
        hospital_type: "",
        hospital_level: "",
        hospital_run_type: "",
        address: "",
        tel: ""
      }, //医院基础信息
      developdData: [], //已申请产品
      awaitDevelopd: [] //待申请产品
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
    this.getHospitalDetail();
  },
  methods: {
    onBack() {
      history.back();
    },
    getHospitalDetail() {
      this.$toast.loading({
        message: "数据加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner"
      });
      let params = { hospital_id: this.$route.query.id };
      this.$api
        .hospitalDevelopd(params)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$toast.clear();
            this.hospitalInfo = {
              hospital_name: res.hospital_data.hospital_name,
              hospital_type: setHospitalType(res.hospital_data.hospital_type),
              hospital_level: setHospitalLevel(res.hospital_data.hospital_level),
              hospital_run_type: setHospitalRunType(res.hospital_data.hospital_run_type),
              address: res.hospital_data.detail_address,
              tel: res.hospital_data.hospital_mobile
            };
            this.developdData = res.developd_data; //已申请产品
            this.awaitDevelopd = res.development_no_apply_data; //待申请产品
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //电话功能
    call(mobile) {
      // console.log(mobile);
      this.$Dialog
        .confirm({
          message: mobile,
          confirmButtonText: "呼叫", //改变确认按钮上显示的文字
          cancelButtonText: "取消" //改变取消按钮上显示的文字
        })
        .then(() => {
          let callHref = "tel://" + mobile;
          window.location.href = "tel://" + mobile;
          // console.log(callHref);
        })
        .catch(() => {
          console.log("取消拨打电话！");
        });
    }
  }
};
</script>
<style scoped>
.main_body {
  height: auto;
  overflow: auto !important;
}
.hospital_module {
  box-shadow: 0rem 0rem 0.3125rem #ccc;
  border-radius: 0.1875rem;
  padding: 0rem 0.3rem;
}
.hospital_detail {
  position: relative;
  /* height: 35vh; */
}
.right_combined {
  position: absolute;
  top: -0.25rem;
  right: 0.4375rem;
}
.right_combined img {
  width: 1.25rem;
}
.call_img {
  width: 1.1rem;
}
.hospital_icon {
  width: 4.2rem;
  height: 4rem;
  margin: 0.8rem 0rem 0.5rem 0rem;
}
.hospital_name {
  font-size: 0.75rem;
  color: #333;
  margin-bottom: 0.3125rem;
}
.await_develop_product {
  width: 100%;
}
.hospital_tag span {
  font-size: 0.5625rem;
  padding: 2px 0.4375rem;
  border: 1px solid;
  border-radius: 0.75rem;
  margin-right: 0.3125rem;
}
.hospital_tag .compositive {
  border-color: #f7af27;
  color: #f7af27;
}
.hospital_tag .three_level {
  border-color: #26c2e1;
  color: #26c2e1;
}
.hospital_tag .public {
  border-color: #3cd7be;
  color: #3cd7be;
}
.hospital_adress {
  border-top: 1px solid #eeeeee;
  margin-top: 0.75rem;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hospital_adress img:nth-child(1) {
  width: 0.625rem;
  vertical-align: text-bottom;
  margin-right: 0.3125rem;
}
.hospital_adress span:nth-child(1) {
  padding-right: 0.5rem;
  font-size: 0.625rem;
}
.hospital_adress span:nth-child(2) i {
  font-style: normal;
  border-left: 1px solid #ccc;
  margin-right: 0.625rem;
}
.hospital_adress span:nth-child(2) img {
  vertical-align: middle;
}
.await_develop_title {
  margin: 0.5rem 0px;
  text-align: left;
  font-size: 0.75rem;
}
.await_develop_product {
  width: calc(100% - 0.625rem);
  /* height: 30vh; */
  overflow: auto;
}
/* .await_develop_product_list {
  padding-top: 0.4rem;
} */
.await_develop_product .van-row {
  text-align: left;
  padding: 0.5rem 0rem;
}
.await_develop_product span,
.already_develop_product span {
  font-size: 0.6275rem;
}
.await_develop_product .van-cell {
  text-align: left;
  padding: 0.5rem 0.4375rem;
  border-color: 0rem solid #fff;
  border-radius: 0.375rem;
}
.already_develop_product {
  font-size: 0.625rem;
  text-align: left;
}
.already_develop_title {
  font-size: 0.75rem;
  text-align: center;
  padding: 0.5rem 0rem;
}
.already_develop_title .active.van-col {
  color: #3399ff;
}
.already_develop_title .van-col:nth-child(1) {
  border-right: 1px solid #eee;
}
.already_develop_content .van-row {
  padding: 0.5rem 0.4375rem;
}
</style>
