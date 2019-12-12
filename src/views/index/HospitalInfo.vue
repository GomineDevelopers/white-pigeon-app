<template>
  <van-row class="hospitalinfo">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="医院详情" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row class="hospital_detail hospital_module">
        <span class="right_combined">
          <img src="@/assets/image/Combined.png" />
        </span>
        <img src="@/assets/image/hospital_icon.png" class="hospital_icon" />
        <van-row class="hospital_name">{{ hospitalData.infomation.content }}</van-row>
        <van-row class="hospital_tag">
          <span class="compositive">{{ hospitalData.infomation.hospital_type }}</span>
          <span class="three_level">{{ hospitalData.infomation.hospital_level }}</span>
          <span class="public">{{ hospitalData.infomation.hospital_run_type }}</span>
        </van-row>
        <van-row class="hospital_adress flex flex_align_center justify_between">
          <span>
            <img src="@/assets/image/address.png" />{{ hospitalData.infomation.address }}
          </span>
          <span @click="call(hospitalData.infomation.hospital_mobile)">
            <i></i>
            <img class="call_img" src="@/assets/image/phone.png" />
          </span>
        </van-row>
      </van-row>
      <van-row v-if="hospitalData.awaitApplyProduct.length != 0">
        <van-row class="await_develop_title">待开发产品</van-row>
        <van-row class="await_develop_product hospital_module">
          <van-row class="await_develop_product_list">
            <van-radio-group v-model="product">
              <van-cell
                v-for="(item, index) in hospitalData.awaitApplyProduct"
                :key="index + 'p'"
                :title="item.product_name + '-' + item.specification + '  ¥' + item.bidding_price"
                clickable
                @click="product = item.id"
              >
                <van-radio slot="right-icon" :name="item.id" />
              </van-cell>
            </van-radio-group>
          </van-row>
        </van-row>
      </van-row>

      <!-- 已开发产品开始 -->
      <van-row v-if="hospitalData.developmentProduct.length != 0">
        <van-row class="await_develop_title">已开发产品</van-row>
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
            <van-row
              v-for="(alreadyItem, index2) in hospitalData.developmentProduct"
              :key="index2 + 'al'"
              >{{
                alreadyItem.product_name +
                  "-" +
                  alreadyItem.specification +
                  "  ¥" +
                  alreadyItem.bidding_price
              }}</van-row
            >
            <!-- <van-row>磺胺间二甲氧嘧啶-1246盒 ¥23.89</van-row> -->
          </van-row>
          <van-row class="already_develop_content" v-show="!isShow">
            <van-row
              v-for="(alreadyItem, index2) in hospitalData.developmentProduct"
              :key="index2 + 'pr'"
              >{{
                alreadyItem.product_name +
                  "-" +
                  alreadyItem.specification +
                  "  ¥" +
                  alreadyItem.bidding_price
              }}</van-row
            >
          </van-row>
        </van-row>
      </van-row>
      <!-- 已开发产品结束 -->
      <van-row class="public_btn">
        <button @click="submitApplications">确&nbsp;定</button>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "hospitalinfo",
  data() {
    return {
      isShow: true,
      product: "",
      hospitalData: null
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
    this.getRouterData();
  },
  methods: {
    onBack() {
      this.$router.push({ path: "/" });
    },
    getRouterData() {
      // 只是改了query，其他都不变
      this.hospitalData = this.$route.query.data;
      console.log("医院详情data", this.hospitalData);
    },
    submitApplications() {
      if (this.product) {
        //获取产品名称
        let productId = { product_id: this.product };
        this.$api
          .hospitalGetProductName(productId)
          .then(res => {
            // console.log(res);
            if (res.code == 200) {
              // this.productName = res.product_info.product_name;
              let paramsData = {
                hospitalId: this.hospitalData.infomation.hospital_id,
                hospitailStatus: this.hospitalData.infomation.status,
                productId: this.product,
                productName: res.product_info.product_name
              };
              // console.log("data", paramsData);
              this.$router.push({
                path: "/submitapplications",
                query: {
                  data: paramsData
                }
              });
            } else {
              this.$toast.fail(res.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        if (this.hospitalData.awaitApplyProduct.length == 0) {
          this.$toast.fail("当前没有可开发产品");
        } else {
          this.$toast.fail("请选择产品");
        }
      }
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
          console.log(callHref);
        })
        .catch(() => {
          console.log("取消拨打电话！");
        });
    }
  }
};
</script>
<style scoped>
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
  padding: 0.3125rem;
}
.hospital_adress img:nth-child(1) {
  width: 0.625rem;
  vertical-align: sub;
  margin-right: 0.3125rem;
}
.hospital_adress span:nth-child(1) {
  padding-right: 0.5rem;
  font-size: 0.625rem;
  flex: 1;
  text-align: left;
}
.hospital_adress span:nth-child(2) i {
  font-style: normal;
  border-left: 1px solid #ccc;
  margin-right: 0.625rem;
  height: 1.8rem;
  width: 2px;
}
.hospital_adress span:nth-child(2) img {
  vertical-align: middle;
}
.await_develop_title {
  margin: 0.5rem 0px;
  text-align: left;
  color: #000;
  font-size: 0.75rem;
}
.await_develop_product {
  width: calc(100% - 0.625rem);
  /* height: 30vh; */
  overflow: auto;
}
.await_develop_product span {
  font-size: 0.625rem;
}
.await_develop_product .van-cell {
  text-align: left;
  padding: 0.5rem 0.4375rem;
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
<style>
.van-cell {
  border: none !important;
  line-height: 1.1rem;
}
</style>
