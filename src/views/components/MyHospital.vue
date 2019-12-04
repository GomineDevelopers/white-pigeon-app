<template>
  <van-row class="hospitalmanagement">
    <van-row class="my_hospital_body">
      <van-row class="hospital_list">
        <van-row
          class="hospital_item border_bom"
          v-for="(item,index) in hospitalList"
          :key="index"
        >
          <van-row class="hospital_name">{{item.hospital_name}}</van-row>
          <van-row class="hospital_tag">
            <span class="compositive">{{setHospitalType(item.hospital_type)}}</span>
            <span class="three_level">{{setHospitalLevel(item.hospital_level)}}</span>
            <span class="public">{{setHospitalRunType(item.hospital_run_type)}}</span>
          </van-row>
          <van-row class="product_list">
            <span
              v-for="(product,index3) in item.product"
              :key="index3 +'b'"
            >{{product.product_name+"&nbsp;&nbsp;&nbsp;"}}</span>
          </van-row>
          <van-row class="hospital_address">{{item.hospital_address}}</van-row>
        </van-row>
      </van-row>
      <van-row class="more" @click="getHospitalData()">
          {{ finished ? '数据加载完成' : loading ? '数据加载中...' : loadingText}}
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
import { setHospitalLevel, setHospitalType, setHospitalRunType } from "@/js/public";

console.log(setHospitalType(1))
export default {
  name: "hospitalmanagement",
  data() {
    return {
      page: 1,
      row: 10,
      loading: false,
      finished: false,
      loadingText: "查看更多",
      hospitalList: []
    };
  },
  mounted() {
    this.$nextTick(() => {
        this.getHospitalData();
    })
  },
  methods: {
    // 获取我的医院数据
    getHospitalData() {
      if (!this.loading && !this.finished){
        this.loading = true;
        let data = {page: this.page, row: this.row};
        this.$api
          .userCenterHospital(data)
          .then(res => {
            switch (res.code) {
              case 200:
                let list = res.hospital_data;
                this.hospitalList = this.hospitalList.concat(list);
                if (list.length === this.row) {
                  this.page += 1;
                  this.loading = false;
                } else {
                  this.loading = true;
                  this.finished = true;
                };
                break;
              case 3001:
                this.loadingText = res.message;
                break;
            } 
          })
          .catch(err => {

          })
        }
    },
    // 判断医院类型
    setHospitalType(id){
      return setHospitalType(id)
    },
    // 判断医院等级
    setHospitalLevel(id){
      return setHospitalLevel(id)
    },
    // 判断医院经营方式
    setHospitalRunType(id){
      return setHospitalRunType(id)
    },
    // goApplyHospitalDetail() {
    //   this.$router.push({ path: "/applyhospitaldetail" });
    // }
  }
};
</script>
<style>
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
.more {
  font-size: 0.6875rem;
  color: #a8aec1;
  text-align: center;
  padding: 1rem;
}
</style>