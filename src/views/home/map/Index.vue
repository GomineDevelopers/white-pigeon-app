<template>
  <van-row class="index">
    <!-- map start -->
    <baidu-map
      class="baidu_map_view"
      :center="center"
      :zoom="zoom"
      :mapStyle="mapStyle"
      :scroll-wheel-zoom="true"
      @ready="handler"
    >
      <template v-for="(item, index) in hospitalData">
        <template v-if="item.status === 0"
          ><bm-marker
            :position="item.position"
            @click="clickHandler(item)"
            v-bind:key="index"
            :icon="{
              url: statusIcon.icon_0,
              size: bmLabelStyle.size
            }"
          >
            <bm-label
              :content="item.content"
              :labelStyle="bmLabelStyle.labelStyle"
              :offset="bmLabelStyle.offset"
            /> </bm-marker
        ></template>
        <template v-else-if="item.status === 1"
          ><bm-marker
            :position="item.position"
            @click="clickHandler(item)"
            v-bind:key="index"
            :icon="{
              url: statusIcon.icon_1,
              size: bmLabelStyle.size
            }"
          >
            <bm-label
              :content="item.content"
              :labelStyle="bmLabelStyle.labelStyle"
              :offset="bmLabelStyle.offset"
            /> </bm-marker
        ></template>
        <template v-else-if="item.status === 2"
          ><bm-marker
            :position="item.position"
            @click="clickHandler(item)"
            v-bind:key="index"
            :icon="{
              url: statusIcon.icon_2,
              size: bmLabelStyle.size
            }"
          >
            <bm-label
              :content="item.content"
              :labelStyle="bmLabelStyle.labelStyle"
              :offset="bmLabelStyle.offset"
            /> </bm-marker
        ></template>
      </template>
    </baidu-map>
    <!-- map end -->
    <!-- bottom-nav start -->
    <div class="van-tabbar--fixed van-tabbar bottom_bar">
      <a class="bottom_bar_item" href="javascript:;">
        <img src="@/assets/image/develop_0.png" />
        <span>空白</span>
      </a>
      <a class="bottom_bar_item" href="javascript:;">
        <img src="@/assets/image/develop_1.png" />
        <span>开发中</span>
      </a>
      <a class="bottom_bar_item" href="javascript:;">
        <img src="@/assets/image/develop_2.png" />
        <span>已开发</span>
      </a>
      <a class="bottom_bar_item" href="javascript:;">
        <img src="@/assets/image/develop_3.png" />
        <span>不可开发</span>
      </a>
      <a class="bottom_bar_item" href="javascript:;">
        <img src="@/assets/image/develop_4.png" />
        <span>警告</span>
      </a>
    </div>
    <!-- bottom-nav end -->
    <!-- popup start -->
    <div class="van-popup popup_wrap">
      <p><span></span></p>
      <h1 class="pop_title">{{ hosSingleData.content }}</h1>
      <ul class="pop_hosp_type">
        <li v-for="(item, key) in hosSingleData.type" v-bind:key="key">
          {{ item }}
        </li>
      </ul>
      <div class="addr">{{ hosSingleData.address }}</div>
    </div>
    <!-- popup end -->
  </van-row>
</template>
<script>
// 引入地图覆盖层状态图标
import statusIcon_0 from "@/assets/image/home_mapicon_0.png";
import statusIcon_1 from "@/assets/image/home_mapicon_1.png";
import statusIcon_2 from "@/assets/image/home_mapicon_2.png";
import statusIcon_3 from "@/assets/image/home_mapicon_3.png";
import statusIcon_4 from "@/assets/image/home_mapicon_4.png";
// 定义地图样式
let mapStyleJson = [
  {
    featureType: "background",
    elementType: "geometry",
    stylers: {
      color: "#f5f6f7ff"
    }
  },
  {
    featureType: "poilabel",
    elementType: "labels",
    stylers: {
      visibility: "off"
    }
  },
  {
    featureType: "poilabel",
    elementType: "labels.icon",
    stylers: {
      visibility: "off"
    }
  },
  {
    featureType: "scenicspots",
    elementType: "labels",
    stylers: {
      visibility: "off"
    }
  },
  {
    featureType: "manmade",
    elementType: "labels",
    stylers: {
      visibility: "off"
    }
  },
  {
    featureType: "manmade",
    elementType: "geometry",
    stylers: {
      visibility: "off"
    }
  },
  {
    featureType: "districtlabel",
    elementType: "labels",
    stylers: {
      visibility: "off"
    }
  },
  {
    featureType: "districtlabel",
    elementType: "labels.icon",
    stylers: {
      visibility: "off"
    }
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: {
      visibility: "off"
    }
  },
  {
    featureType: "subway",
    elementType: "geometry",
    stylers: {
      visibility: "off"
    }
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: {
      color: "#ffffffff"
    }
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: {
      color: "#e2e7edff"
    }
  },
  {
    featureType: "green",
    elementType: "geometry",
    stylers: {
      visibility: "on",
      color: "#cceac8ff"
    }
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: {
      visibility: "on",
      color: "#b4d8feff"
    }
  }
];
// 定义覆盖层字体样式
let bmLabelStyle = {
  color: "#a9adaf",
  fontSize: "10px",
  border: "none",
  width: "80px",
  textAlign: "center",
  whiteSpace: "normal",
  background: "transparent"
};

let bmLabelOffset = { width: -20, height: 30 }; // 定义覆盖层字体位置
let bmIconSize = { width: 40, height: 40 }; // 定义覆盖层图标大小
export default {
  name: "index",
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 11,
      mapStyle: {
        //地图样式
        styleJson: mapStyleJson
      },
      statusIcon: {
        //覆盖层状态图标
        icon_0: statusIcon_0,
        icon_1: statusIcon_1,
        icon_2: statusIcon_2,
        icon_3: statusIcon_3,
        icon_4: statusIcon_4
      },
      bmLabelStyle: {
        //覆盖层样式
        size: bmIconSize,
        labelStyle: bmLabelStyle,
        offset: bmLabelOffset
      },
      hospitalData: [
        //医院数据
        {
          position: { lng: 121.5199, lat: 31.24347 },
          content: "上海儿童医学中心",
          status: 1,
          address: "上海浦东新区即墨路150号",
          type: ["综合医院", "三级甲等", "公立医院"]
        },
        {
          position: { lng: 121.5307, lat: 31.21144 },
          content: "上海东方医院",
          status: 2,
          address: "上海市浦东新区高桥镇大同路358号",
          type: ["公立医院"]
        },
        {
          position: { lng: 121.5416, lat: 31.23308 },
          content: "上海仁济医院（东部）",
          status: 0,
          address: "上海市南汇区惠南镇东门大街339号",
          type: ["三级甲等", "公立医院"]
        }
      ],
      hosSingleData: {}
    };
  },
  created() {},
  methods: {
    handler({ BMap, map }) {
      this.center.lng = 121.536019;
      this.center.lat = 31.222785;
      this.zoom = 14;
    },
    clickHandler(data) {
      this.hosSingleData = data;
    }
    // goIndex2() {
    //   this.$router.push({ path: "/home/index2" });
    // },
    // goIndex3() {
    //   this.$router.push({ path: "/home/Children" });
    // }
  }
};
</script>
<style>
.anchorBL {
  display: none !important;
}
.BMap_Marker img {
  widows: 100%;
  height: 100%;
}
</style>
<style scoped>
.baidu_map_view {
  width: 100%;
  height: 99.9vh;
}
.BMap_stdMpPan,
.BMap_stdMpZoom .BMap_button,
.BMap_stdMpSliderBgTop,
.BMap_stdMpSliderBar,
.BMap_stdMpSliderBgBot,
.anchorBL {
  width: 0 !important;
  height: 0 !important;
}
.bottom_bar {
  background: transparent;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.5) 40%,
    rgba(255, 255, 255, 1) 100%
  );
}
.bottom_bar img {
  width: 0.7rem;
  margin-right: 0.15rem;
}
.bottom_bar span {
  color: #3a4055;
  font-size: 0.5rem;
  font-weight: 600;
}
.bottom_bar .bottom_bar_item {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  -webkit-box-orient: vertical;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  line-height: 1;
  white-space: nowrap;
}
.popup_wrap {
  left: 5%;
  bottom: 1rem;
  width: 80%;
  text-align: left;
  overflow: hidden;
  padding: 0 5% 20px;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}
.popup_wrap .pop_title {
  font-size: 0.6875rem;
  font-weight: 600;
}
.popup_wrap .pop_hosp_type {
  overflow: hidden;
}
.popup_wrap .pop_hosp_type li {
  display: inline-block;
  float: left;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
  padding: 0.1rem 0.5rem;
  font-size: 0.375rem;
  color: #ffbb18;
  border: 1px solid #ffbb18;
  border-radius: 50px;
}
.popup_wrap .addr {
  color: #a8aec1;
  font-size: 0.625rem;
}
</style>
