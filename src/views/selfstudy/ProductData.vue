<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="产品资料" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="product_data_body flex">
      <van-row class="left_sidebar">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item title="科室会议" />
          <van-sidebar-item title="代表培训" />
          <van-sidebar-item title="说明书" />
        </van-sidebar>
      </van-row>
      <van-row class="right_content">
        <van-row class="product_name">
          {{ productName }}
        </van-row>
        <van-row class="product_pdf_list">
          <a
            :href="item.company_policy_name"
            target="_blank"
            class="product_pdf_item flex flex_align_center"
            v-for="(item, index) in pdfList"
            :key="index + 'p'"
          >
            <img src="../../assets/image/pdf2x.png" />
            <van-row class="flex_1">
              <span>{{ item.title }}</span>
              <span>{{ item.create_time }}</span>
            </van-row>
          </a>
        </van-row>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
import { log } from "util";
export default {
  name: "productdata",
  data() {
    return {
      productName: "",
      activeKey: 0,
      pdfList: []
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
    this.productName = this.$route.query.productName;
    this.getProductDetail();
  },
  methods: {
    onBack() {
      history.back();
    },
    onChange() {
      this.pdfList = []; //数据初始化
      this.getProductDetail();
    },
    getProductDetail() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner"
      });
      let dataType;
      switch (this.activeKey) {
        case 0:
          dataType = 1;
          break;
        case 1:
          dataType = 2;
          break;
        case 2:
          dataType = 3;
          break;
        default:
          break;
      }
      let parmas = {
        product_id: this.$route.query.id,
        product_data_type: dataType
      };
      this.$api
        .materialDetail(parmas)
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.pdfList = res.meterialDetail;
            this.$toast.clear();
            if (res.meterialDetail.length == 0) {
              this.$toast.fail("暂无数据");
            }
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch(error => {
          this.$toast.fail("加载失败，请重试");
          console.log(error);
        });
    }
  }
};
</script>
<style>
.left_sidebar .van-sidebar {
  height: 100%;
  width: 4.5rem;
  background: #f3f4f8;
}
.left_sidebar .van-sidebar-item {
  position: relative;
}
.left_sidebar .van-sidebar-item::after {
  content: "";
  position: absolute;
  left: 0rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0.125rem;
  height: 0.9rem;
  border-left: 3px solid transparent;
}
.left_sidebar .van-sidebar-item--select {
  color: #3188ff;
  font-weight: 500;
  border-color: transparent;
}
.left_sidebar .van-sidebar-item--select::after {
  border-color: #3188ff;
}
</style>
<style scoped>
.product_data_body {
  margin-top: 2rem;
  height: 93vh;
}
.left_sidebar {
  height: 100%;
}
.right_content {
  padding-left: 0.625rem;
  flex: 1;
}
.product_name {
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.625rem;
  text-align: left;
}
.product_pdf_list {
  width: 100%;
}
.product_pdf_item {
  width: calc(100% - 1.7rem);
  padding: 0.5rem;
  box-shadow: 0rem 0rem 0.3125rem #ccc;
  margin-top: 0.625rem;
  border-radius: 0.1875rem;
}
.product_pdf_item .van-row span:nth-child(1) {
  font-size: 0.625rem;
  text-align: left;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.product_pdf_item .van-row span:nth-child(2) {
  display: block;
  font-size: 0.5625rem;
  text-align: left;
  margin-top: 0.3rem;
}
.product_pdf_item img {
  width: 2rem;
  margin-right: 0.5rem;
}
</style>
