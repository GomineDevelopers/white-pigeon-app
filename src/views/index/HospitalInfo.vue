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
        <van-row class="hospital_name">上海长海医院</van-row>
        <van-row class="hospital_tag">
          <span class="compositive">综合医院</span>
          <span class="three_level">三级甲等</span>
          <span class="public">公立医院</span>
        </van-row>
        <van-row class="hospital_adress flex justify_between">
          <span>
            <img src="@/assets/image/address.png" />上海市杨浦区长海路168号
          </span>
          <span>
            <i></i>
            <img class="call_img" src="@/assets/image/phone.png" />
          </span>
        </van-row>
      </van-row>
      <van-row class="await_develop_title">待申请产品</van-row>
      <van-row class="await_develop_product hospital_module">
        <van-row class="await_develop_product_list">
          <van-radio-group v-model="product">
            <van-cell title="立维宁（乌本美司片）-0.25g*6片  ¥110.63" clickable @click="product = '1'">
              <van-radio slot="right-icon" name="1" />
            </van-cell>
            <!-- <van-cell title="磺胺间二甲氧嘧啶-0.25g*6片  ¥23.89" clickable @click="product = 'OTC'">
              <van-radio slot="right-icon" name="OTC" />
            </van-cell>
            <van-cell title="磺胺嘧啶-0.25g*6片  ¥23.89" clickable @click="product = '2'">
              <van-radio slot="right-icon" name="2" />
            </van-cell>
            <van-cell title="新诺明-0.25g*6片 ¥23.89" clickable @click="product = '3'">
              <van-radio slot="right-icon" name="3" />
            </van-cell>
            <van-cell title="三甲氧苄氨嘧啶-0.25g*6片 ¥23.89" clickable @click="product = '4'">
              <van-radio slot="right-icon" name="4" />
            </van-cell>
            <van-cell title="磺胺二甲嘧啶-0.25g*6片 ¥23.89" clickable @click="product = '5'">
              <van-radio slot="right-icon" name="5" />
            </van-cell>-->
          </van-radio-group>
        </van-row>
      </van-row>
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
      product: ""
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
  methods: {
    onBack() {
      history.back();
    },
    submitApplications() {
      this.$router.push({ path: "/submitapplications" });
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
  font-size: 0.875rem;
  font-weight: bold;
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
.await_develop_product span {
  font-size: 0.625rem;
}
.await_develop_product .van-cell {
  text-align: left;
  padding: 0.5rem 0.4375rem;
  border-color: 0rem solid #fff;
  border-radius: 0.375rem;
}
</style>