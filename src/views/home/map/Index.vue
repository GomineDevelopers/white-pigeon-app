<template>
  <van-row class="index">
    <!-- map start -->
    <van-row class="search">
      <van-row class="search_content flex flex_align_center">
        <van-row class="search_input flex flex_align_center" v-show="inputShow">
          <van-icon name="arrow-left" @click="inputHidden" />
          <van-field
            v-model="keywords"
            placeholder="请输入"
            @input="handleInput"
          />
          <span class="search_text" @click="handleTag">筛选</span>
        </van-row>
        <van-row class="search_icon flex flex_align_center" @click="showInput">
          <van-icon name="search" />
        </van-row>
      </van-row>
      <transition name="van-slide-right">
        <van-row class="hospital_list">
          <ul>
            <li
              v-for="(hospitalItem, index) in hospitalSearchList"
              :key="index + 'ho'"
            >
              <span>{{ hospitalItem.name }}</span>
              <span>{{ hospitalItem.address }}</span>
            </li>
          </ul>
        </van-row>
      </transition>
      <van-row class="hospital_tag">
        <van-row class="tag_item flex">
          <span class="blank">空白</span>
          <span class="developing">开发中</span>
          <span class="developed">已开发</span>
          <span class="none">不可开发</span>
          <span class="warning">警告</span>
        </van-row>
        <van-row class="tag_btn flex">
          <button>重置</button>
          <button>确定</button>
        </van-row>
      </van-row>
    </van-row>
    <baidu-map
      class="baidu_map_view"
      :center="center"
      :zoom="zoom"
      :mapStyle="mapStyle"
      :scroll-wheel-zoom="true"
      @ready="handler"
    >
      <template v-for="(item, index) in hospitalData">
        <template v-if="item.status === 0">
          <bm-marker
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
            />
          </bm-marker>
        </template>
        <template v-else-if="item.status === 1">
          <bm-marker
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
            />
          </bm-marker>
        </template>
        <template v-else-if="item.status === 2">
          <bm-marker
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
            />
          </bm-marker>
        </template>
      </template>
      <!-- 点击定位当前图标 -->
      <bm-marker
        v-show="currentPostion"
        :position="currentPostion"
        :offset="{ width: 7, height: -6 }"
        :icon="{
          url: statusIcon.address,
          size: { width: 21, height: 27 }
        }"
      >
      </bm-marker>
    </baidu-map>
    <!-- map end -->
    <!-- bottom-nav start -->
    <div
      v-show="bottomNavIsShow"
      class="van-tabbar--fixed van-tabbar bottom_bar"
    >
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
    <div
      class="van-popup popup_wrap"
      :class="{ popup_show: isPopup }"
      @touchstart="touchStart($event)"
      @touchmove="touchMove($event)"
      @touchend="touchEnd($event)"
    >
      <div class="popup_top">
        <p class="popup_top_line">
          <span></span>
        </p>
        <h1 class="pop_title">
          {{ hosSingleData.content }}
        </h1>
        <ul class="pop_hosp_type">
          <li v-for="(item, key) in hosSingleData.type" v-bind:key="key">
            {{ item }}
          </li>
        </ul>
        <div class="addr">{{ hosSingleData.address }}</div>
        <img class="approve" src="@/assets/image/approveing.png" />
      </div>
      <!-- 拉出详情 start -->
      <!-- <div class="hospital_pull_detail">
        <div class="no_develop">您暂时无法开发此医院</div>
      </div> -->
      <div
        class="hospital_pull_detail"
        :style="{ height: hospitalDetailScrollHeight }"
        ref="hoDetailHeight"
      >
        <div class="hospital_pull_cont">
          <ul>
            <li
              class="pull_cell"
              v-for="(item, index) in hospitalFoldData"
              :key="index"
            >
              <div class="pull_cell_head">
                <span class="tit">{{ item.title }}</span
                ><span class="arrow">{{ item.to }}</span>
              </div>
              <div class="pull_cell_cont" v-html="item.cont"></div>
            </li>
          </ul>
        </div>
        <van-button class="apply_btn" size="large">申请医院</van-button>
        <van-row class="pull_developed">
          <van-col span="12" class="line">创建拜访</van-col>
          <van-col span="12">创建会议</van-col>
        </van-row>
      </div>
      <!-- 拉出详情 end -->
    </div>
    <!-- popup end -->
  </van-row>
</template>
<script>
// 引入地图覆盖层状态图标
import statusIcon_0 from "@/assets/image/home_mapicon_0.svg";
import statusIcon_1 from "@/assets/image/home_mapicon_1.svg";
import statusIcon_2 from "@/assets/image/home_mapicon_2.svg";
import statusIcon_3 from "@/assets/image/home_mapicon_3.svg";
import statusIcon_4 from "@/assets/image/home_mapicon_4.svg";
import address from "@/assets/image/address.svg";
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

let bmLabelOffset = { width: -16, height: 32 }; // 定义覆盖层字体位置
let bmIconSize = { width: 36, height: 36 }; // 定义覆盖层图标大小
export default {
  name: "index",
  data() {
    return {
      inputShow: false, //输入框隐藏
      tagShow: false, //tag标签模块隐藏
      isPopup: true, //显示医院详情弹窗
      keywords: "",
      currentPostion: "",
      bottomNavIsShow: true,
      hospitalSearchList: [
        {
          name: "上海仁济医院",
          address: "上海市南汇区惠南镇东门大街339号"
        },
        {
          name: "上海东方医院",
          address: "上海市浦东新区高桥镇大同路358号"
        },
        {
          name: "上海儿童医学中心",
          address: "上海浦东新区即墨路150号"
        },
        {
          name: "上海远洋医院",
          address: "上海市徐汇区汾阳路83号"
        },
        {
          name: "上海邮电医院",
          address: "上海市徐汇区汾阳路83号"
        }
      ],
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
        icon_4: statusIcon_4,
        address: address
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
      hosSingleData: {
        position: { lng: 121.5199, lat: 31.24347 },
        content: "上海儿童医学中心",
        status: 1,
        address: "上海浦东新区即墨路150号",
        type: ["综合医院", "三级甲等", "公立医院"]
      },
      hospitalFoldData: [
        {
          title: "美唯宁",
          to: "流向：26371盒",
          cont:
            "<p>潜力：一般</p><p>中标价：32.2元/盒</p> <p>主要科室：消化内科</p><p>适应症：胃灼热、嗳气、恶心、呕吐、早饱、上腹胀等 消化道症状</p>"
        },
        {
          title: "美唯宁",
          to: "流向：26371盒",
          cont:
            "<p>潜力：一般</p><p>中标价：32.2元/盒</p> <p>主要科室：消化内科</p><p>适应症：胃灼热、嗳气、恶心、呕吐、早饱、上腹胀等 消化道症状</p>"
        },
        {
          title: "美唯宁",
          to: "流向：26371盒",
          cont:
            "<p>潜力：一般</p><p>中标价：32.2元/盒</p> <p>主要科室：消化内科</p><p>适应症：胃灼热、嗳气、恶心、呕吐、早饱、上腹胀等 消化道症状</p>"
        }
      ],
      hospitalDetailScrollHeight: 0,
      startY: 0
    };
  },
  created() {
    console.log(this.hosSingleData);
    // this.$api.login({ p: 1, pagesize: 10 }).then(res => {
    //   console.log(res);
    // });
  },
  mounted() {
    this.openFold();
  },
  methods: {
    handler({ BMap, map }) {
      this.center.lng = 121.536019;
      this.center.lat = 31.222785;
      this.zoom = 14;
    },
    clickHandler(data) {
      this.currentPostion = data.position;
      this.hosSingleData = data;
      this.bottomNavIsShow = false;
    },

    // 搜索图标点击现实输入框
    showInput() {
      this.inputShow = true;
      $(".search_content").css("background", "#fff");
    },
    //输入框左侧小图标点击隐藏输入框
    inputHidden() {
      this.inputShow = false;
      this.keywords = "";
      $(".search_content").css("background", "transparent");
      $(".hospital_tag").hide();
      $(".hospital_list").hide();
    },
    //点击筛选出现筛选标签
    handleTag() {
      $(".hospital_tag").slideToggle();
      $(".hospital_list").slideUp();
    },
    //输入框输入事件
    handleInput(value) {
      $(".hospital_tag").slideUp();
      if (value.length > 4) {
        console.log("开始搜索");
        $(".hospital_list").slideDown();
      } else {
        $(".hospital_list").slideUp();
      }
    },
    // 折叠医院详情面板
    openFold(index) {
      $(".pull_cell_head").on("click", function() {
        $(this)
          .siblings()
          .slideToggle();
        $(this)
          .parent(".pull_cell")
          .siblings("li")
          .find(".pull_cell_cont")
          .slideUp();
      });
    },
    // 详情弹窗开始
    touchStart(e) {
      this.startY = e.touches[0].clientY;
      this.hoDetailHeight = this.$refs.hoDetailHeight.offsetHeight;
    },
     // 详情弹窗开始
    touchMove(e) {
      let _this = this;
      let MoveY = e.touches[0].clientY - _this.startY;
      let MoveYAbs = Math.abs(MoveY);
      let pullDownMoveY;
      if (MoveY < 0 && _this.hoDetailHeight === 0) {
        _this.hospitalDetailScrollHeight = `${MoveYAbs}px`;
      } else if (MoveY > 0 && _this.hoDetailHeight > 0) {
        _this.hospitalDetailScrollHeight = `${_this.hoDetailHeight -
          MoveYAbs}px`;
      }
    },
     // 详情弹窗开始
    touchEnd(e) {
      let _this = this;
      let MoveY = e.changedTouches[0].clientY - _this.startY;
      // console.log(MoveY);
      let MoveYAbs = Math.abs(MoveY);
      if (MoveYAbs >= 20) {
        if (MoveY < 0) {
          _this.hospitalDetailScrollHeight = "100%";
        } else {
          _this.hospitalDetailScrollHeight = "0px";
        }
      }

      // console.log(e.changedTouches[0].clientY);
    }
  }
};
</script>
<style>
.anchorBL {
  display: none !important;
}
.search .van-cell:not(:last-child)::after {
  border-bottom: none;
}
</style>
<style scoped>
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
  padding-top: 2px;
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
  bottom: 0.5rem;
  bottom: -100%;
  width: 80%;
  text-align: left;
  overflow: hidden;
  padding: 0 5% 20px;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}
.popup_wrap.popup_show {
  bottom: 0.5rem;
}
.popup_wrap .popup_top {
  position: relative;
}
.popup_wrap .popup_top .approve {
  position: absolute;
  width: 2.6rem;
  top: 1rem;
  right: 0;
  z-index: 100;
}
.popup_wrap .popup_top_line {
  margin: 0;
  padding-top: 0.2rem;
  text-align: center;
  line-height: 0;
}
.popup_wrap .popup_top_line span {
  display: inline-block;
  height: 0.125rem;
  width: 1.875rem;
  border-radius: 4px;
  background: #e1e1e1;
}
.popup_wrap .pop_title {
  font-size: 0.8125rem;
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
  padding: 0.1rem 0.4rem 0.08rem;
  font-size: 0.375rem;
  font-weight: 200;
  color: #ffbb18;
  overflow: hidden;
  border: 1px solid #ffbb18;
  border-radius: 50px;
}
.popup_wrap .addr {
  color: #a8aec1;
  font-size: 0.625rem;
}
.hospital_pull_detail {
  overflow: hidden;
}
.hospital_pull_detail .no_develop {
  height: 36vh;
  line-height: 30vh;
  font-size: 0.6875rem;
  color: #a8aec1;
  text-align: center;
}
.hospital_pull_cont {
  height: 36vh;
  margin-top: 10px;
  padding-top: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  border-top: 1px solid #eee;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.hospital_pull_cont ul {
  border-radius: 5px;
  border: 1px solid #e6e6e6;
}
.pull_cell {
  border-bottom: 1px solid #f1f1f1;
}
.pull_cell_head {
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 10px 15px;
  background: #f8faff;
}
.pull_cell_head span {
  color: #585876;
  font-size: 0.625rem;
}
.pull_cell_head .tit {
  flex: 1;
  font-weight: 600;
}
.pull_cell_cont {
  display: none;
  padding: 12px 20px;
}

.pull_cell_cont >>> p {
  margin: 0 0 6px;
  font-size: 0.5625rem;
  color: #585876;
}
.hospital_pull_detail .apply_btn {
  color: #fff;
  height: 48px;
  background: #3399ff;
}
.hospital_pull_detail .pull_developed {
  color: #3399ff;
  text-align: center;
  font-size: 0.6875rem;
  height: 30px;
  line-height: 30px;
}
.hospital_pull_detail .line {
  border-right: 1px solid #a7aaaf;
}
.hospital_pull_detail .van-button__text {
  font-size: 0.875rem;
  letter-spacing: 1px;
}
/* 搜索开始 */
.search {
  position: fixed;
  top: 3.5rem;
  right: 1rem;
  z-index: 99;
}
.search_content {
  border-radius: 0.25rem;
}
.search_icon {
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  background: #fff;
  justify-content: center;
  margin-left: 0.3rem;
}
.search_icon .van-icon {
  font-size: 1.2rem;
  font-weight: bold;
  color: #3399ff;
}
.search_input {
  width: calc(100vw - 4rem);
}
.search_input .van-icon {
  color: #a8aec1;
}
.search_input .van-cell {
  font-size: 0.75rem;
  border-bottom: none;
}
.search_text {
  width: 3rem;
  border-right: 1px solid #ccc;
  padding-right: 0.3rem;
  color: #3399ff;
  font-size: 0.625rem;
}
.hospital_tag,
.hospital_list {
  width: calc(100vw - 3.5rem);
  overflow: hidden;
  padding: 0.8rem 0.8rem;
  background: #fff;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
}
.hospital_tag {
  display: none;
}
.tag_item {
  flex-wrap: wrap;
  justify-content: start;
}
.tag_item span {
  padding: 0.2rem 0.7rem;
  min-width: 2rem;
  margin-right: 0.6rem;
  font-size: 0.625rem;
  margin-bottom: 0.6rem;
  border-radius: 0.25rem;
}
.blank {
  background: #c9f3e7;
  color: #1b9e79;
}
.developing {
  background: #f5e0aa;
  color: #e2a50c;
}
.developed {
  background: #bbdbfb;
  color: #3399ff;
}
.none {
  background: #dee2ec;
  color: #999;
}
.warning {
  background: #f5c9d0;
  color: #ff506f;
}
.tag_btn {
  justify-content: space-between;
  margin-top: 2rem;
}
.tag_btn button {
  width: calc(100% - 1.25rem);
  border: none;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  padding: 0.3rem 0rem;
}
.tag_btn button:nth-child(1) {
  margin-right: 1.25rem;
  background: #f5d0bc;
  color: #f86e24;
}
.tag_btn button:nth-child(2) {
  background: #3399ff;
  color: #fff;
}

.hospital_list {
  height: 10rem;
  overflow: auto;
  text-align: left;
  display: none;
}
.hospital_list ul li {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f0f0f0;
  padding: 0.3rem 0rem;
}
.hospital_list ul li span:nth-child(1) {
  font-size: 0.75rem;
}
.hospital_list ul li span:nth-child(2) {
  font-size: 0.625rem;
  color: #a8aec1;
}
</style>
