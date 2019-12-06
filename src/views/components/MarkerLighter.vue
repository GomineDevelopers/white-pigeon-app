<template>
  <bm-overlay
    ref="customOverlay"
    class="current_marker"
    pane="labelPane"
    @draw="draw">
    <img src="@/assets/image/address.svg">
</bm-overlay>
</template>

<script>
export default {
  props: ['position'],
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position;
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
      el.style.left = pixel.x -5 + 'px';
      el.style.top = pixel.y - 14 + 'px';
    }
  }
}
</script>

<style scoped>
.current_marker {
  position: absolute;
  z-index: 100;
}
.current_marker img{
  width: 21px;
  height: 27px;
}
</style>