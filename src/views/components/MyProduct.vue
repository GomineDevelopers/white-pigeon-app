<template>
  <van-row>
    <van-row class="product_list" v-for="(productItem,index) in productList" :key="index+'pr'">
      <van-row class="product_name">{{productItem.productName}}</van-row>
      <van-row>{{productItem.hospital}}</van-row>
    </van-row>
    <van-row class="more">查看更多</van-row>
  </van-row>
</template>
<script>
export default {
  name: "myproduct",
  props: {
    productList: Array
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onBack() {
      history.back();
    }
  }
};
</script>
<style scoped>
.product_list {
  border-bottom: 1px solid #eee;
  padding: 0.3125rem 0rem 0.4rem 0rem;
}
.product_list .product_name {
  font-size: 0.75rem;
  color: #000;
}
</style>