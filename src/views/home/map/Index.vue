<template>
  <van-row class="index">
    <!-- search 开始 -->
    <van-row class="search" @click="settingEvent($event)">
      <van-row class="search_content flex flex_align_center">
        <van-row class="search_input flex flex_align_center" v-show="inputShow">
          <van-icon name="arrow-left" @click="inputHidden" />
          <van-field v-model="keywords" placeholder="请输入" @input="handleInput" />
          <!-- <span class="search_text" @click="handleTag">筛选</span> -->
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
              @click="positionHospital(hospitalItem)"
            >
              <span>{{ hospitalItem.hospital_name }}</span>
              <span>{{ hospitalItem.hospital_address }}</span>
            </li>
          </ul>
          <van-row class="none_hospital_data" v-if="noneHospitalList">无数据</van-row>
        </van-row>
      </transition>
    </van-row>
    <!-- search 结束 -->
    <!-- 遮罩选择省开始 -->
    <van-popup class="province_dialog" :close-on-click-overlay="propFalse" v-model="dialogShow">
      <van-row class="province_select">
        <van-row class="province_select_title">请选择工作所属省份/直辖市</van-row>
        <van-row class="province_select_text flex" @click="provinceShow = !provinceShow">
          <span>{{ provinceValue[0].name ? provinceValue[0].name : "请选择" }}</span>
          <van-icon name="arrow-down" />
        </van-row>
      </van-row>
      <transition name="van-slide-up">
        <van-row class="provinceArea" v-show="provinceShow">
          <van-area
            :area-list="areaList"
            :columns-num="1"
            @cancel="provinceShow = false"
            @confirm="provinceConfirm"
          />
        </van-row>
      </transition>
      <!-- <van-row class="province_button" @click="provinceSubmit"><span>确&nbsp;定</span></van-row> -->
    </van-popup>
    <!-- <van-popup v-model="show">内容</van-popup> -->
    <!-- 遮罩选择省结束 -->
    <!-- map start :inertial-dragging="true "-->
    <baidu-map
      @click="showSetting"
      class="baidu_map_view"
      ref="baidu_map"
      :center="center"
      :zoom="zoom"
      :mapStyle="mapStyle"
      :scroll-wheel-zoom="true"
      @moveend="drag"
      @zoomend="drag"
      @ready="handler"
    >
      <bm-local-search :auto-viewport="true" :location="location"></bm-local-search>
      <template v-if="markerReset">
        <map-marker
          v-for="(item, index) in filterHospital"
          :position="{
            lng: item.hospital_longtude,
            lat: item.hospital_latitude
          }"
          :item="item"
          :key="index"
          @clickHandler="clickHandler"
        >
        </map-marker>
      </template>
      <!-- 点击定位当前图标 -->
      <marker-lighter
        :position="{ lng: currentPostion.lng, lat: currentPostion.lat }"
      ></marker-lighter>
    </baidu-map>
    <!-- map end -->
    <!-- bottom-nav start 1-已开发  2-不可开发  3-空白医院  4-开发中-->
    <div v-show="bottomNavIsShow" class="van-tabbar--fixed van-tabbar bottom_bar">
      <a class="bottom_bar_item" href="javascript:;" @click="handleActiveTag(3)">
        <img src="@/assets/image/develop_0.png" />
        <span>空白</span>
      </a>
      <a class="bottom_bar_item" href="javascript:;" @click="handleActiveTag(4)">
        <img src="@/assets/image/develop_1.png" />
        <span>开发中</span>
      </a>
      <a class="bottom_bar_item" href="javascript:;" @click="handleActiveTag(1)">
        <img src="@/assets/image/develop_2.png" />
        <span>已开发</span>
      </a>
      <a class="bottom_bar_item" href="javascript:;" @click="handleActiveTag(2)">
        <img src="@/assets/image/develop_3.png" />
        <span>不可开发</span>
      </a>
      <a class="bottom_bar_item" href="javascript:;" @click="handleActiveTag(5)">
        <img src="@/assets/image/develop_4.png" />
        <span>警告</span>
      </a>
    </div>
    <!-- bottom-nav end -->
    <!-- popup start Object.keys(hosSingleData) != 0-->
    <div
      class="van-popup popup_wrap"
      v-show="isPopup"
      :class="{ popup_show: isPopup }"
      @touchstart="touchStart($event)"
      @touchmove="touchMove($event)"
      @touchend="touchEnd($event)"
    >
      <div class="popup_top">
        <p class="popup_top_line">
          <span></span>
        </p>
        <van-icon class="close_btn" @click="close_popup" name="cross" />
        <h1 class="pop_title">{{ hosSingleData.content }}</h1>
        <ul class="pop_hosp_type">
          <li class="hospital_type">{{ hosSingleData.hospital_type }}</li>
          <li class="hospital_level">{{ hosSingleData.hospital_level }}</li>
          <li class="hospital_run_type">
            {{ hosSingleData.hospital_run_type }}
          </li>
        </ul>
        <div class="addr">地址：{{ hosSingleData.address }}</div>
        <!-- 审核中的img在医院状态为开发中时显示 -->
        <img class="approve" src="@/assets/image/approveing.png" v-show="visitShow == 4" />
      </div>
      <!-- 拉出详情 start -->
      <div class="hospital_pull_detail" v-show="visitShow == 2">
        <div class="hospital_pull_cont">
          <span class="pull_cont_notice">对不起，此医院产品已被开发完，您暂时无法开发！</span>
        </div>
      </div>
      <div
        class="hospital_pull_detail"
        :style="{ height: hospitalDetailScrollHeight }"
        ref="hoDetailHeight"
        v-show="visitShow != 2"
      >
        <div class="hospital_pull_cont">
          <ul>
            <li class="pull_cell" v-for="(item, index) in hospitalFoldData" :key="index">
              <div class="pull_cell_head" @click="contIndex = index">
                <span class="tit">{{ item.product_name }}-{{ item.package }}</span>
                <span class="arrow" v-if="visitShow == 1">流向：0盒</span>
              </div>
              <div class="pull_cell_cont" :class="{ active: index == contIndex }">
                <p>潜力：一般</p>
                <p>中标价：{{ item.bidding_price }}</p>
                <!-- <p>主要科室：{{ item.section_name }}</p> -->
                <p>适应症：{{ item.indications }}</p>
              </div>
              <!-- <div class="pull_cell_cont" v-html="item.cont"></div> -->
            </li>
          </ul>
        </div>
        <van-button class="apply_btn" size="large" @click="applyForHospital()">开发医院</van-button>
      </div>
      <!-- 此处医院状态为已开发医院时显示 -->
      <van-row class="pull_developed" v-show="visitShow == 1 && visitAndMettingShow">
        <van-col span="12" class="line">
          <span @click="creatVisit(hosSingleData.id)">创建拜访</span>
          <!-- <router-link :to="{ path: '/developvisit', query: { id: hosSingleData.id } }"
            >创建拜访</router-link
          > -->
        </van-col>
        <van-col span="12">
          <span @click="creatMetting(hospitalRouteParams)">创建会议</span>
          <!-- <router-link :to="{ path: '/newmetting2', query: { data: hospitalRouteParams } }"
            >创建会议</router-link
          > -->
        </van-col>
      </van-row>

      <!-- 拉出详情 end -->
    </div>
    <!-- popup end -->
  </van-row>
</template>
<script>
import AreaList from "@/js/area"; //省份数据
import MapMarker from "../../components/MapMarker";
import MarkerLighter from "../../components/MarkerLighter";
import { setHospitalLevel, setHospitalType, setHospitalRunType } from "@/js/public";
import { setPriority } from "os";
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

export default {
  name: "index",
  inject: ["reload"], //刷新页面
  data() {
    return {
      propFalse: false,
      userInfo: null,
      dialogShow: false, //省份输入框
      isComplete: null, //用户是否完善信息
      areaList: AreaList, // 指定数据源
      provinceValue: [{ code: "", name: "" }], //省
      provinceShow: false, //省份选择
      inputShow: false, //输入框隐藏
      tagShow: false, //tag标签模块隐藏
      isPopup: false, //显示医院详情弹窗
      contIndex: 0, //弹窗详情产品列表显示状态
      visitAndMettingShow: false, //显示创建拜访和常见会议
      keywords: "", //输入框关键字
      hospitalSearchList: [
        // {
        //   name: "上海仁济医院",
        //   address: "上海市南汇区惠南镇东门大街339号"
        // }
      ],
      noneHospitalList: false, //无数据的展示
      currentTagStatus: "", //当前筛选医院标签
      //点击医院是当前坐标
      currentPostion: {
        lng: "",
        lat: ""
      },
      markerReset: true,
      bottomNavIsShow: true,
      location: "",
      center: "", //当前定位省市
      zoom: 14,
      mapStyle: {
        //地图样式
        styleJson: mapStyleJson
      },
      //地图医院点数据
      hospitalData: [],
      //单个医院详细数据
      hosSingleData: {},
      visitShow: "", //已开发医院显示创建拜访和创建会议
      //医院产品数据
      hospitalFoldData: [],
      hospitalRouteParams: {}, //用户选中的医院ID
      hospitalDetailScrollHeight: 0,
      startY: 0,
      HospitalList: []
    };
  },
  components: {
    MapMarker,
    MarkerLighter
  },
  //过滤
  computed: {
    //搜索filter过滤筛选
    filterHospital() {
      // console.log(this.currentTagStatus);
      if (this.currentTagStatus == "") {
        return this.HospitalList;
      } else {
        return this.HospitalList.filter(value => {
          return value.hospital_status == this.currentTagStatus;
        });
      }
    }
  },
  created() {
    this.getUserInfo();
    document.addEventListener("plusready", function() {
      var webview = plus.webview.currentWebview();
      plus.key.addEventListener("backbutton", function() {
        webview.canBack(function(e) {
          if (e.canBack) {
            webview.back();
          } else {
            // webview.close() //hide,quit
            // plus.runtime.quit()
            // 首页返回键处理
            // 处理逻辑：1秒内，连续两次按返回键，则退出应用；
            var first = null;
            plus.key.addEventListener(
              "backbutton",
              function() {
                // 首次按键，提示‘再按一次退出应用’
                if (!first) {
                  first = new Date().getTime();
                  console.log("再按一次退出应用"); // 此处可以用自定义提示
                  setTimeout(function() {
                    first = null;
                  }, 1000);
                } else {
                  console.log("返回上一页");
                  if (new Date().getTime() - first < 1500) {
                    plus.runtime.quit();
                  }
                }
              },
              false
            );
          }
        });
      });
    });
  },
  mounted() {},
  methods: {
    handler({ BMap, map }) {
      // let geoLocation = new BMap.Geolocation();
      // geoLocation.getCurrentPosition(r => {
      // this.center = { lng: r.longitude, lat: r.latitude}
      // });
      this.zoom = 12;
    },
    // 显示可视区域医院数据
    drag() {
      const bs = this.$refs.baidu_map.map.getBounds(); //获取可视区域
      const bssw = bs.getSouthWest(); //可视区域左下角
      const bsne = bs.getNorthEast(); //可视区域右上角
      const topLat = bsne.lat;
      const bottomLat = bssw.lat;
      const leftLng = bssw.lng;
      const rightLng = bsne.lng;
      let templateHospital = [];
      this.hospitalData.forEach(item => {
        if (
          item.hospital_longtude > leftLng &&
          item.hospital_latitude > bottomLat &&
          item.hospital_longtude < rightLng &&
          item.hospital_latitude < topLat
        ) {
          templateHospital.push(item);
        }
      });
      this.markerReset = false;
      this.$nextTick(() => {
        this.markerReset = true;
        this.HospitalList = templateHospital;
        templateHospital = [];
      });
    },
    //点击地图下部筛选医院类型
    handleActiveTag(type) {
      this.markerReset = false;
      if (this.currentTagStatus == type) {
        this.$nextTick(() => {
          this.markerReset = true;
          this.currentTagStatus = "";
        });
      } else {
        this.$nextTick(() => {
          this.markerReset = true;
          this.currentTagStatus = type;
        });
      }

      // this.handler({ BMap, map });
    },
    //点击医院获取详细信息
    clickHandler(data) {
      console.log("点击医院的数据", data);
      this.isPopup = true;
      this.bottomNavIsShow = false;
      this.currentPostion.lng = data.hospital_longtude;
      this.currentPostion.lat = data.hospital_latitude;
      if (data.id == this.current_hospital_id) {
        return false;
      }
      this.current_hospital_id = data.id;
      this.hosSingleData = {}; //数据初始化
      this.hospitalFoldData = []; //
      // console.log(data);
      //设置当前定位点
      this.visitShow = data.hospital_status;
      let status = data.hospital_status; // 1-已开发  2-不可开发  3-空白医院  4-开发中
      let params = { hospital_id: data.id };
      if (status == 1) {
        this.$api
          .hospitalDevelopd(params)
          .then(res => {
            if (res.code == 200) {
              this.visitAndMettingShow = true;
              let hospitolContent = res.hospital_data;
              this.hosSingleData = {
                id: hospitolContent.id,
                content: hospitolContent.hospital_name,
                address: hospitolContent.detail_address,
                status: status,
                hospital_type: setHospitalLevel(hospitolContent.hospital_level),
                hospital_level: setHospitalType(hospitolContent.hospital_type),
                hospital_run_type: setHospitalRunType(hospitolContent.hospital_run_type),
                hospital_mobile: hospitolContent.hospital_mobile,
                hospital_id: hospitolContent.id
              };
              this.hospitalFoldData.push(...res.developd_data);
              this.hospitalFoldData.push(...res.development_no_apply_data);

              this.hospitalRouteParams = {
                infomation: this.hosSingleData,
                awaitApplyProduct: res.development_no_apply_data,
                developmentProduct: res.developd_data
              };
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (status == 2) {
        this.$api
          .hospitalNotDevelop(params)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              let hospitolContent = res.hospital_data;
              this.hosSingleData = {
                content: hospitolContent.hospital_name,
                address: hospitolContent.detail_address,
                status: status,
                hospital_type: setHospitalLevel(hospitolContent.hospital_level),
                hospital_level: setHospitalType(hospitolContent.hospital_type),
                hospital_run_type: setHospitalRunType(hospitolContent.hospital_run_type),
                hospital_mobile: hospitolContent.hospital_mobile,
                hospital_id: hospitolContent.id
              };
              this.hospitalFoldData = [];
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (status == 3) {
        this.$api
          .hospitalBlank(params)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              let hospitolContent = res.hospital_data;
              this.hosSingleData = {
                content: hospitolContent.hospital_name,
                address: hospitolContent.detail_address,
                status: status,
                hospital_type: setHospitalLevel(hospitolContent.hospital_level),
                hospital_level: setHospitalType(hospitolContent.hospital_type),
                hospital_run_type: setHospitalRunType(hospitolContent.hospital_run_type),
                hospital_mobile: hospitolContent.hospital_mobile,
                hospital_id: hospitolContent.id
              };
              this.hospitalFoldData = res.product_data;

              this.hospitalRouteParams = {
                infomation: this.hosSingleData,
                awaitApplyProduct: this.hospitalFoldData,
                developmentProduct: []
              };
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (status == 4) {
        //开发中医院
        this.$api
          .hospitalDevelopment(params)
          .then(res => {
            // console.log(res);
            if (res.code == 200) {
              let hospitolContent = res.hospital_data;
              this.hosSingleData = {
                content: hospitolContent.hospital_name,
                address: hospitolContent.detail_address,
                status: status,
                hospital_type: setHospitalLevel(hospitolContent.hospital_level),
                hospital_level: setHospitalType(hospitolContent.hospital_type),
                hospital_run_type: setHospitalRunType(hospitolContent.hospital_run_type),
                hospital_mobile: hospitolContent.hospital_mobile,
                hospital_id: hospitolContent.id
              };
              this.hospitalFoldData.push(...res.development_data);
              this.hospitalFoldData.push(...res.development_no_apply_data);

              this.hospitalRouteParams = {
                infomation: this.hosSingleData,
                awaitApplyProduct: res.development_no_apply_data,
                developmentProduct: res.development_data
              };
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // 关闭医院弹窗
    close_popup() {
      this.isPopup = false;
      this.bottomNavIsShow = true;
      this.visitAndMettingShow = false; //隐藏创建拜访和创建会议
      this.hospitalDetailScrollHeight = "0px";
      this.currentPostion = {
        lng: 0,
        lat: 0
      };
    },
    //获取个人信息
    getUserInfo() {
      this.$api
        .userInfo()
        .then(res => {
          // console.log("用户信息", res);
          this.userInfo = res.user; //存下用户信息
          //判断用户是否有工作地城市信息
          if (res.user.province_code == null || res.user.province_code == "") {
            this.dialogShow = true;
          } else {
            this.dialogShow = false;
            //在此处获取医院信息
            this.$toast.loading({
              message: "数据加载中...",
              forbidClick: true,
              duration: 0,
              loadingType: "spinner"
            });
            this.$api
              .hospitalinit()
              .then(res => {
                this.$toast.clear();
                if (res.code == 200) {
                  this.hospitalData = res.data;
                  this.center = res.province_name;
                  this.drag();
                } else {
                  this.$toast.fail(res.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
          if (res.user.is_complete == 1) {
            this.isComplete = true;
          } else if (res.user.is_complete == 2) {
            this.isComplete = false;
          }
          // console.log("用户信息", res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 搜索图标点击现实输入框
    showInput() {
      this.inputShow = true;
      $(".search_content").css("background", "#fff");
      this.getSearchResult();
    },
    //输入框左侧小图标点击隐藏输入框
    inputHidden() {
      this.inputShow = false;
      this.keywords = "";
      // this.currentTagStatus = ''
      $(".search_content").css("background", "transparent");
      $(".hospital_tag").hide();
      $(".hospital_list").hide();
    },
    //点击筛选出现筛选标签
    handleTag() {
      this.keywords = "";
      $(".hospital_tag").slideToggle();
      $(".hospital_list").slideUp();
    },
    reset() {
      this.activeTag = "";
      this.currentTagStatus = "";
      this.inputHidden();
    },
    //输入框输入事件
    handleInput(value) {
      this.currentTagStatus = ""; //输入框输入时清空筛选标签
      $(".hospital_tag").slideUp();
      this.getSearchResult();
    },
    //搜索医院结果
    getSearchResult() {
      if (this.keywords.length > 1) {
        // console.log("开始搜索");
        let params = {
          key: this.keywords
        };
        this.noneHospitalList = false;
        this.$api
          .hospitalList(params)
          .then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.hospitalSearchList = res.hospital_lst;
            } else if (res.code == 9000) {
              this.hospitalSearchList = [];
              this.noneHospitalList = true;
            }
          })
          .catch(error => {
            console.log(error);
          });
        $(".hospital_list").slideDown();
      } else {
        $(".hospital_list").slideUp();
      }
    },
    //点击搜索医院列表定位
    positionHospital(item) {
      //点击搜索出的医院列表
      // console.log(item);
      this.center = {
        lng: item.hospital_longtude,
        lat: item.hospital_latitude
      };
      this.currentPostion = {
        lng: item.hospital_longtude,
        lat: item.hospital_latitude
      };
      this.inputHidden();
      this.hosSingleData = {};
      this.clickHandler(item);
    },
    //弹框省市确认
    provinceConfirm(value) {
      this.provinceValue = value;
      this.provinceShow = false;
      this.provinceSubmit();
    },
    //提交省数据
    provinceSubmit() {
      // console.log(this.provinceValue);
      if (this.provinceValue[0].code) {
        this.$toast.loading({
          message: "信息提交中...",
          forbidClick: true,
          duration: 0,
          loadingType: "spinner"
        });
        let params = { province_code: this.provinceValue[0].code };
        this.$api
          .selectProvice(params)
          .then(res => {
            if (res.code == 200) {
              this.$toast.success("提交成功！");
              setTimeout(() => {
                this.reload(); //刷新当前页面，加载医院数据
              }, 1500);
            } else if (res.code == 9002) {
              this.$toast.fail("该省份没有医院信息");
              setTimeout(() => {
                this.reload(); //刷新当前页面，加载医院数据
              }, 1500);
            } else {
              this.$toast.fail(res.message);
              setTimeout(() => {
                this.reload(); //刷新当前页面，加载医院数据
              }, 1500);
            }
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogShow = false;
      } else {
        this.$toast.fail("请选择您工作区所属省份/直辖市");
      }
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
      if ($(e.target).parents(".hospital_pull_cont").length) {
        return false;
      }
      if (MoveY < 0 && _this.hoDetailHeight === 0) {
        _this.hospitalDetailScrollHeight = `${MoveYAbs}px`;
      } else if (MoveY > 0 && _this.hoDetailHeight > 0) {
        _this.hospitalDetailScrollHeight = `${_this.hoDetailHeight - MoveYAbs}px`;
      }
    },
    // 详情弹窗开始
    touchEnd(e) {
      let _this = this;
      let MoveY = e.changedTouches[0].clientY - _this.startY;
      let MoveYAbs = Math.abs(MoveY);
      if ($(e.target).parents(".hospital_pull_cont").length) {
        return false;
      }
      if (MoveYAbs >= 20) {
        if (MoveY < 0) {
          _this.hospitalDetailScrollHeight = "100%";
        } else {
          _this.hospitalDetailScrollHeight = "0px";
        }
      }
    },
    //点击开发医院
    applyForHospital() {
      if (!this.isComplete) {
        this.$Dialog
          .confirm({
            message: "请您完善个人信息，再进行开发操作。",
            confirmButtonText: "前往", //改变确认按钮上显示的文字
            cancelButtonText: "取消" //改变取消按钮上显示的文字
          })
          .then(() => {
            this.$router.replace({
              path: "/improvepersonalinfo",
              query: {
                data: this.hospitalRouteParams
              }
            }); //去完善信息
          })
          .catch(() => {
            console.log("取消完善信息！");
          });
      } else {
        this.$router.push({
          path: "/hospitalinfo",
          query: {
            data: this.hospitalRouteParams
          }
        });
      }
    },

    //点击搜索以外的地方隐藏搜索框
    showSetting() {
      this.inputHidden();
    },
    settingEvent(event) {
      event.stopPropagation(); //此区域不受上面方法的影响
    },

    //点击创建拜访 先判断用户是否有银行卡信息
    creatVisit(id) {
      console.log(id);
      // return;
      //判断用户银行卡信息是否完善
      if (
        this.userInfo.account_name == null ||
        this.userInfo.card_no == null ||
        this.userInfo.open_bank == null
      ) {
        //银行卡信息不完善跳转银行卡完善信息页
        this.$Dialog
          .confirm({
            message: "请先完善银行卡信息！",
            confirmButtonText: "前往",
            cancelButtonText: "取消"
          })
          .then(() => {
            this.$router.push({
              path: "/bankcard",
              query: {
                redirect: this.$router.currentRoute.fullPath
              }
            });
          })
          .catch(() => {
            console.log("取消完善银行卡信息！");
          });
      } else {
        this.$router.push({ path: "/developvisit", query: { id: id } });
      }
    },
    creatMetting(data) {
      //判断用户银行卡信息是否完善
      if (
        this.userInfo.account_name == null ||
        this.userInfo.card_no == null ||
        this.userInfo.open_bank == null
      ) {
        //银行卡信息不完善跳转银行卡完善信息页
        this.$Dialog
          .confirm({
            message: "请先完善银行卡信息！",
            confirmButtonText: "前往",
            cancelButtonText: "取消"
          })
          .then(() => {
            this.$router.push({
              path: "/bankcard",
              query: {
                redirect: this.$router.currentRoute.fullPath
              }
            });
          })
          .catch(() => {
            console.log("取消完善银行卡信息！");
          });
      } else {
        this.$router.push({ path: "/newmetting2", query: { data: data } });
      }
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
iframe {
  display: block;
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
  z-index: 500;
}
.popup_wrap .popup_top {
  position: relative;
}
.popup_wrap .popup_top .approve {
  position: absolute;
  width: 2.6rem;
  top: 1.4rem;
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
.popup_top .close_btn {
  position: absolute;
  top: 3px;
  right: -5%;
  z-index: 10;
  color: #ddd;
}
.popup_wrap .pop_title {
  font-size: 0.75rem;
  font-weight: 600;
}
.popup_wrap .pop_hosp_type {
  overflow: hidden;
}
.popup_wrap .pop_hosp_type li {
  display: block;
  float: left;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
  padding: 0.1rem 0.4rem 0.08rem;
  font-size: 0.375rem;
  font-weight: 200;
  overflow: hidden;
  border-radius: 50px;
}
.popup_wrap .pop_hosp_type .hospital_type {
  color: #ffbb18;
  border: 1px solid #ffbb18;
}
.popup_wrap .pop_hosp_type .hospital_level {
  color: #26c2e1;
  border: 1px solid #26c2e1;
}
.popup_wrap .pop_hosp_type .hospital_run_type {
  color: #3cd7be;
  border: 1px solid #3cd7be;
}
.popup_wrap .addr {
  color: #a8aec1;
  font-size: 0.625rem;
}
.pull_developed {
  text-align: center;
  border-top: 1px solid #eee;
  margin-top: 0.35rem;
  padding-top: 0.5rem;
}
.pull_developed span {
  font-size: 0.75rem;
  color: #3399ff;
}
.pull_developed .line {
  border-right: 1px solid #ccc;
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
.pull_cont_notice {
  color: #a8aec1;
  font-size: 0.75rem;
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  display: -webkit-inline-flex;
  display: flex;
  align-items: center;
  justify-content: center;
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
.pull_cell_cont.active {
  display: inline-block;
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
  border-radius: 0.1875rem;
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
  font-size: 0.75rem;
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
  font-size: 0.625rem;
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
  border: none;
  margin-bottom: 0.6rem;
  border-radius: 0.25rem;
  background: #e9ebef;
  color: #999;
}
.tag_item span.active {
  background: #e1f0ff;
  color: #2681dc;
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
  font-size: 0.625rem;
}
.hospital_list ul li span:nth-child(2) {
  font-size: 0.5625rem;
  color: #a8aec1;
}
/* 遮罩开始 */
.province_dialog {
  border-radius: 0.25rem;
}
.province_select {
  width: 65vw;
  padding: 0.8rem;
  text-align: left;
}
.province_select_title {
  color: #333;
  font-size: 0.75rem;
  text-align: center;
}
.province_select_text {
  display: block;
  border-radius: 0.125rem;
  height: 1.5625rem;
  line-height: 1.5625rem;
  color: #a8aec1;
  border: 1px solid #eee;
  background: #f9f9f9;
  padding: 0rem 0.5rem;
  font-size: 0.625rem;
  margin: 0.625rem 0rem;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.province_select_text span {
  display: inline-block;
  font-size: 0.625rem;
  flex: 1;
}
.province_button {
  border-top: 1px solid #eee;
  padding: 0.3rem 0rem;
}
.province_button span {
  font-size: 0.75rem;
  color: #108ee9;
}
.none_hospital_data {
  font-size: 0.625rem;
  color: #666;
  text-align: center;
}
</style>
