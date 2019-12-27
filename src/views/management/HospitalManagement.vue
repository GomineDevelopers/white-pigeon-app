<template>
  <van-row class="hospitalmanagement">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="医院管理" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row class="search_hospital">
        <van-cell-group>
          <van-field
            v-model="keyWords"
            clearable
            right-icon="search"
            placeholder="请输入医院名"
            @click-right-icon="search"
          />
        </van-cell-group>
      </van-row>
      <van-row class="hospital_list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="hospitalSearch"
        >
          <van-row
            class="hospital_item border_bom"
            v-for="(item, index) in hospitalList"
            :key="index"
            @click="goApplyHospitalDetail(item.id)"
          >
            <van-row class="hospital_name">{{ item.name }}</van-row>
            <van-row class="hospital_tag">
              <span class="compositive">{{ item.hospital_type }}</span>
              <span class="three_level">{{ item.hospital_level }}</span>
              <span class="public">{{ item.hospital_run_type }}</span>
            </van-row>
            <van-row class="product_list">
              <span v-for="(product, index3) in item.product" :key="index3 + 'b'">
                {{ product.product_name + "&nbsp;&nbsp;&nbsp;" }}
              </span>
            </van-row>
            <van-row class="hospital_address">地址：{{ item.address }}</van-row>
          </van-row>
        </van-list>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
import { setHospitalLevel, setHospitalType, setHospitalRunType } from "@/js/public";
export default {
  name: "hospitalmanagement",
  data() {
    return {
      keyWords: "",
      page: 1,
      row: 6,
      loading: false, //加载
      finished: false, //完成
      hospitalList: []
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
    // this.hospitalSearch();
  },
  methods: {
    onBack() {
      history.back();
    },

    hospitalSearch() {
      let params = {
        hospital_key: this.keyWords,
        page: this.page,
        row: this.row
      };
      console.log("当前页", this.page);
      setTimeout(() => {
        this.$api
          .hospitalManager(params)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              if (res.hospital_data.length < this.row) {
                res.hospital_data.forEach(value => {
                  this.hospitalList.push({
                    name: value.hospital_name,
                    id: value.hospital_id,
                    hospital_type: setHospitalType(value.hospital_type),
                    hospital_level: setHospitalLevel(value.hospital_level),
                    hospital_run_type: setHospitalRunType(value.hospital_run_type),
                    product: value.product,
                    address: value.hospital_address
                  });
                });
                // 加载状态结束
                this.finished = true;
                this.loading = false;
              } else {
                res.hospital_data.forEach(value => {
                  this.hospitalList.push({
                    name: value.hospital_name,
                    id: value.hospital_id,
                    hospital_type: setHospitalType(value.hospital_type),
                    hospital_level: setHospitalLevel(value.hospital_level),
                    hospital_run_type: setHospitalRunType(value.hospital_run_type),
                    product: value.product,
                    address: value.hospital_address
                  });
                });
                this.page++;
                this.loading = false;
              }
            } else {
              // 加载状态结束
              this.loading = false;
              this.finished = true;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }, 500);

      console.log("数据", this.hospitalList);
    },
    //点击搜索
    search() {
      this.hospitalList = [];
      this.page = 1;
      this.finished = false; //初始化完成状态  @load="hospitalSearch" 自动加载
    },
    goApplyHospitalDetail(id) {
      this.$router.push({ path: "/applyhospitaldetail", query: { id: id } });
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
  margin: 0.1rem 0rem;
}
.product_list span {
  font-size: 0.6875rem;
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
.pop_hosp_type li {
  display: block;
  float: left;
  margin-right: 0.4rem;
  padding: 0.1rem 0.4rem 0.08rem;
  font-size: 0.375rem;
  font-weight: 200;
  overflow: hidden;
  border-radius: 50px;
}
.pop_hosp_type .hospital_type {
  color: #ffbb18;
  border: 1px solid #ffbb18;
}
.pop_hosp_type .hospital_level {
  color: #26c2e1;
  border: 1px solid #26c2e1;
}
.pop_hosp_type .hospital_run_type {
  color: #3cd7be;
  border: 1px solid #3cd7be;
}
</style>
