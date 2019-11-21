<template>
  <van-row class="index">
    <img src="@/assets/image/changhai.png" />
    <div class="img_button" @click="goIndex3"></div>
  </van-row>
</template>
<script>
export default {
  name: "index2",
  data() {
    return {};
  },
  methods: {
    goIndex3() {
      this.$router.push({ path: "/home/index3" });
    }
  }
};
</script>
<style scoped>
.index {
  position: relative;
}
.index img {
  width: 100vw;
  height: 98vh;
}
.img_button {
  width: 98vw;
  height: 30vw;
  /* border: 1px solid #333; */
  position: absolute;
  bottom: 2vh;
}
</style>