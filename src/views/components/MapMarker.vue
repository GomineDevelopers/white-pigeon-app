<template>
  <bm-overlay ref="customOverlay" class="map_marker" pane="labelPane" @draw="draw">
    <img
      v-if="item.hospital_status == 1"
      src="@/assets/image/home_mapicon_1.svg"
      v-tap="{ method: handleClick, params: item }"
    />
    <img
      v-if="item.hospital_status == 2"
      src="@/assets/image/home_mapicon_3.svg"
      v-tap="{ method: handleClick, params: item }"
    />
    <img
      v-if="item.hospital_status == 3"
      src="@/assets/image/home_mapicon_2.svg"
      v-tap="{ method: handleClick, params: item }"
    />
    <img
      v-if="item.hospital_status == 4"
      src="@/assets/image/home_mapicon_0.svg"
      v-tap="{ method: handleClick, params: item }"
    />
    <div
      class="map_marker_label"
      v-text="item.hospital_name"
      v-tap="{ method: handleClick, params: item }"
    ></div>
  </bm-overlay>
</template>

<script>
import Vue from "vue";
// 定义tap事件
Vue.directive("tap", {
  bind: function(el, binding) {
    var startTx, startTy, endTx, endTy, startTime, endTime;

    el.addEventListener(
      "touchstart",
      function(e) {
        var touch = e.touches[0];
        startTx = touch.clientX;
        startTy = touch.clientY;
        startTime = +new Date();
      },
      false
    );

    el.addEventListener(
      "touchend",
      function(e) {
        endTime = +new Date();
        if (endTime - startTime > 300) {
          return;
        }
        var touch = e.changedTouches[0];
        endTx = touch.clientX;
        endTy = touch.clientY;
        if (Math.abs(startTx - endTx) < 6 && Math.abs(startTy - endTy) < 6) {
          var method = binding.value.method;
          var params = binding.value.params;
          method(params);
        }
      },
      false
    );
  }
});
export default {
  props: ["item", "position"],
  watch: {
    position: {
      handler() {
        this.$refs.customOverlay.reload();
      },
      deep: true
    }
  },
  methods: {
    handleClick(item) {
      this.$emit("clickHandler", item);
    },
    draw({ el, BMap, map }) {
      console.log(53453)
      const { lng, lat } = this.position;
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
      el.style.left = pixel.x - 34 + "px";
      el.style.top = pixel.y - 16 + "px";
    }
  }
};
</script>

<style scoped>
.map_marker {
  width: 80px;
  text-align: center;
  white-space: normal;
  background: transparent;
  position: absolute;
  /* border: 1px solid #999 */
}
.map_marker_label {
  color: #a9adaf;
  font-size: 10px;
  margin-top: -22px;
}
</style>
