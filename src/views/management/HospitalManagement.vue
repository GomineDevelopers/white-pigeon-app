<template>
  <van-row class="hospitalmanagement">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="医院管理" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row class="search_hospital">
        <van-cell-group>
          <van-field
            v-model="search"
            clearable
            right-icon="search"
            placeholder="请输入医院名"
            @click-right-icon="hospitalSearch"
          />
        </van-cell-group>
      </van-row>
      <van-row class="hospital_list">
        <van-row
          class="hospital_item border_bom"
          v-for="(item, index) in hospitalList"
          :key="index"
          @click="goApplyHospitalDetail"
        >
          <van-row class="hospital_name">{{ item.hospital_name }}</van-row>
          <van-row class="hospital_tag">
            <span class="compositive" v-for="(tag, index2) in item.tag" :key="index2 + 'a'">{{
              tag
            }}</span>
          </van-row>
          <van-row class="product_list">
            <span v-for="(product, index3) in item.product" :key="index3 + 'b'">{{
              product + "&nbsp;&nbsp;&nbsp;"
            }}</span>
          </van-row>
          <van-row class="hospital_address">{{ item.hospital_address }}</van-row>
        </van-row>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "hospitalmanagement",
  data() {
    return {
      search: "",
      hospitalList: [
        // {
        //   name: "上海长海医院",
        //   tag: ["综合医院", "三级甲等", "公立医院"],
        //   product: ["产品1", "产品2", "产品3"],
        //   address: "上海市杨浦区长海路168号"
        // },
      ]
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
    this.hospitalSearch();
  },
  methods: {
    onBack() {
      history.back();
    },
    //点击搜索
    hospitalSearch() {
      let params = {
        key: this.search
      };
      this.$api
        .hospitalList(params)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.hospitalList = res.hospital_lst;
          } else if (res.code == 9000) {
            this.hospitalList = [];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goApplyHospitalDetail() {
      this.$router.push({ path: "/applyhospitaldetail" });
    }
  }
};
</script>
<style>
.search_hospital .van-cell-group {
  border: none;
  box-shadow: 0rem 0.125rem 0.3125rem #ccc;
  border-radius: 0.25rem;
}
.search_hospital .van-cell {
  font-size: 0.625rem;
  border-radius: 0.25rem;
}
.hospital_list {
  text-align: left;
  margin-top: 1rem;
}
.hospital_item {
  padding: 0.5rem 0rem 0.3125rem 0rem;
}
.hospital_name {
  font-size: 0.75rem;
  color: #000;
  margin-bottom: 0.1875rem;
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
.product_list {
  font-size: 0.6875rem;
  margin: 0.1875rem 0rem;
}
.hospital_address {
  font-size: 0.6875rem;
  color: #585d6f;
}
.van-icon-search {
  font-size: 1rem !important;
  font-weight: bold;
  color: #3399ff;
}
</style>
