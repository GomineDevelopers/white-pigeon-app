<template>
  <van-row>
    <van-row class="approve_content">
      <div class="approve_list">
        <div
          class="approve_item flex justify_between"
          v-for="(item,index) in data"
          :key="index+'b'"
          @click="getDetail"
        >
          <div class="approve_item_detail">
            <ul>
              <li>{{item.title}}</li>
              <li class="flex justify_start">
                <span>医院名：</span>
                <span>{{item.hospitalName}}</span>
              </li>
              <li class="flex justify_start">
                <span>承诺销量：</span>
                <span>{{item.sales}}</span>
              </li>
              <li class="flex justify_start">
                <span>申请时间：</span>
                <span>{{item.approveDate}}</span>
              </li>
            </ul>
          </div>
          <div class="approve_state flex">
            <img v-if="item.approveState == 'approveing'" src="@/assets/image/approveing.png" />
            <img v-if="item.approveState == 'pass'" src="@/assets/image/approve_pass.png" />
            <img v-if="item.approveState == 'notPass'" src="@/assets/image/approve_no.png" />
          </div>
        </div>
      </div>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "applymodule",
  props: {
    data: Array
  },
  data() {
    return {};
  },
  methods: {
    getDetail() {
      this.$router.push({ path: "/productapplydetail" });
    }
  }
};
</script>
<style scoped>
.approve_content {
  /* margin-top: 0.3125rem; */
  overflow: auto;
  /* height: 23.875rem; */
}
.approve_item {
  border-bottom: 1px solid #ecf1f8;
  padding: 0.4375rem 0rem 0.1875rem 0rem;
}
.approve_item_detail {
  width: 80%;
  text-align: left;
}
.approve_item_detail ul li span:nth-child(1) {
  /* width: 3.75rem; */
  white-space: nowrap;
}
.approve_item_detail ul li {
  padding: 0.125rem 0px;
}
.approve_item_detail ul li:nth-child(1) {
  font-size: 0.75rem;
  /* font-weight: bold; */
}
.approve_item_detail ul li span {
  font-size: 0.625rem;
  color: #a8aec1;
}
.approve_state {
  align-items: center;
  justify-content: center;
}
.approve_state img {
  width: 2.8125rem;
  height: 2.1875rem;
}
</style>
