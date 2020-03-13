<template>
  <van-row>
    <van-row class="product_list" v-for="(item, index) in productList" :key="index + 'pr'">
      <van-row class="product_name">{{ item.product_name }}</van-row>
      <van-row>
        <span class="hospital_name" v-for="(hospitalItem, key) in item.hospital" :key="key">{{
          hospitalItem.hospital_name
        }}</span>
      </van-row>
    </van-row>
    <van-row class="more">
      {{ finished ? "数据加载完成" : "数据加载中..." }}
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "myproduct",
  data() {
    return {
      finished: false,
      productList: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getProductData();
    });
  },
  methods: {
    // 获取我的产品数据
    getProductData() {
      if (!this.loading && !this.finished) {
        let data = { page: this.page, row: this.row };
        this.$api
          .userCenterProduct(data)
          .then(res => {
            switch (res.code) {
              case 200:
                let dealProductList = [];
                let list = res.user_product;
                let productId = list.map(item => item.product_id);
                let productIdRemoval = this.removal(productId);
                // 从新组合相同产品数据
                for (let i of productIdRemoval) {
                  let hospital = [];
                  let productName = "";
                  list.forEach(item => {
                    if (item.product_id == i) {
                      if (!productName) {
                        productName = item.product_name + "-" + item.package;
                      }
                      hospital.push({
                        hospital_id: item.hospital_id,
                        hospital_name: item.hospital_name
                      });
                    }
                  });
                  dealProductList.push({
                    product_id: i,
                    product_name: productName,
                    hospital: hospital
                  });
                }
                this.productList = dealProductList;
                console.log(this.productList);
                this.finished = true;
                break;
              case 3001:
                this.loadingText = res.message;
                break;
            }
          })
          .catch(err => {});
      }
    },
    // 数组去重
    removal(arr) {
      return Array.from(new Set(arr));
    },
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
  margin-bottom: 0.3rem;
}
.product_list .hospital_name {
  display: inline-block;
  color: #555;
  font-size: 0.625rem;
  margin-right: 0.5rem;
  padding-right: 0.5rem;
  position: relative;
}
.product_list .hospital_name::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0.2rem;
  bottom: 0.2rem;
  border-right: 1px solid #ccc;
}
.product_list .hospital_name:last-child::after {
  border: none;
}
</style>
