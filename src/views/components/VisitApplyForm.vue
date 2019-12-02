<template>
  <van-row>
    <van-row class="visit_content">
      <van-row class="info_module">
        <van-row class="row_title">医院</van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{ hospitalValue ? hospitalValue : "请选择" }}</span>
          <van-icon name="arrow" @click="hospitalShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">客户</van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{ customer ? customer : "请选择" }}</span>
          <van-icon name="arrow" @click="customerShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">开始时间</van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{ startTime ? startTime : "开始时间" }}</span>
          <van-icon name="arrow" @click="timeShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">拜访目的</van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{ visitPurpose ? visitPurpose : "请选择" }}</span>
          <van-icon name="arrow" @click="visitPurposeShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">拜访渠道</van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{ visitChannel ? visitChannel : "请选择" }}</span>
          <van-icon name="arrow" @click="visitChannelShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">产品</van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{ product ? product : "请选择" }}</span>
          <van-icon name="arrow" @click="productShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">拜访定位</van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">上海市上海远洋医院附近</span>
          <van-icon name="replay" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">拍照上传</van-row>
        <van-row class="flex after_camera" v-if="visitPhoto.length > 0">
          <van-row
            class="visit_img"
            v-for="(visitPhotoList, index) in visitPhoto"
            :key="index + 'vi'"
          >
            <img :src="visitPhotoList" />
          </van-row>
          <van-row class="flex camera_icon" @click="visitCamera">
            <van-icon name="photograph" />
          </van-row>
        </van-row>
        <van-row class="camera" @click="visitCamera" v-if="visitPhoto.length == 0">
          <van-row class="flex camera_icon">
            <van-icon name="photograph" />
            <span>点击拍照</span>
          </van-row>
        </van-row>
      </van-row>
      <van-row class="middle_button flex">
        <button class="middle_button1" @click="createVisit">创建</button>
        <button class="middle_button2">提交</button>
      </van-row>
    </van-row>

    <!-- 医院选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="hospitalShow">
          <van-picker
            show-toolbar
            title="医院选择"
            :columns="hospitalList"
            @cancel="hospitalShow = false"
            @confirm="onConfirm"
          />
        </van-row>
      </transition>
    </van-row>

    <!-- 客户选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="customerShow">
          <van-picker
            show-toolbar
            title="客户选择"
            :columns="customerList"
            @cancel="customerShow = false"
            @confirm="customerConfirm"
          />
        </van-row>
      </transition>
    </van-row>

    <!-- 时间选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="timeShow">
          <van-datetime-picker
            v-model="currentDate"
            title="时间选择"
            type="datetime"
            :min-date="minDate"
            @cancel="timeShow = false"
            @confirm="timeConfirm"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 拜访目的 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="visitPurposeShow">
          <van-picker
            show-toolbar
            title="拜访目的选择"
            :columns="visitPurposeList"
            @cancel="visitPurposeShow = false"
            @confirm="visitPurposeConfirm"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 拜访渠道 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="visitChannelShow">
          <van-picker
            show-toolbar
            title="拜访渠道选择"
            :columns="visitChannelList"
            @cancel="visitChannelShow = false"
            @confirm="visitChannelConfirm"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 产品 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="productShow">
          <van-picker
            show-toolbar
            title="产品选择"
            :columns="productList"
            @cancel="productShow = false"
            @confirm="productConfirm"
          />
        </van-row>
      </transition>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "visitapplyform",
  data() {
    return {
      hospitalShow: false,
      customerShow: false,
      timeShow: false,
      visitPurposeShow: false,
      visitChannelShow: false,
      productShow: false,
      hospitalValue: "",
      customer: "",
      startTime: "",
      visitPurpose: "",
      visitChannel: "",
      product: "",
      visitPhoto: [],
      hospitalList: [],
      customerList: [],
      visitPurposeList: [],
      visitChannelList: [],
      productList: [],
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date()
    };
  },
  methods: {
    onConfirm() {},
    customerConfirm() {},
    timeConfirm() {},
    visitPurposeConfirm() {},
    visitChannelConfirm() {},
    productConfirm() {},
    //拜访拍照上传
    visitCamera() {
      let This = this;
      var cmr = plus.camera.getCamera();
      var res = cmr.supportedImageResolutions[0];
      var fmt = cmr.supportedImageFormats[0];
      // console.log("Resolution: " + res + ", Format: " + fmt);
      cmr.captureImage(
        function(path) {
          //处理拍摄照片的路径，在页面展示
          plus.io.resolveLocalFileSystemURL(
            path,
            function(entry) {
              This.visitPhoto.push(entry.fullPath);
              // This.visitPhoto = entry.fullPath;
              // alert("真实路径："+entry.fullPath);
            },
            function(e) {
              alert(e.message);
            }
          );
        },
        function(error) {
          alert("拍摄失败: " + error.message);
        },
        { resolution: res, format: fmt }
      );
    },

    //创建拜访
    createVisit() {}
  }
};
</script>
<style scoped>
.row_title {
  font-size: 0.6875rem;
}
.icon_right {
  font-size: 0.625rem;
  color: #a8aec1;
  margin: 0.25rem 0rem;
}
.icon_right span {
  color: #a8aec1;
  font-size: 0.625rem;
}
.info_module .row_title i {
  font-style: normal;
  color: red;
}
.info_module {
  font-size: 0.6875rem;
  text-align: left;
  border-bottom: 1px solid rgba(238, 238, 238);
  margin-bottom: 0.4375rem;
}
.showbank {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
.notice {
  font-size: 0.5625rem;
  color: #a8aec1;
  margin-bottom: 0.3125rem;
}
.camera {
  height: 6.25rem;
  width: 100%;
}
.camera_icon {
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.camera_icon .van-icon {
  font-size: 1.875rem;
  color: #2692f3;
}
.camera_icon span {
  color: #a8aec1;
  font-size: 0.5rem;
}
.after_camera {
  flex-wrap: wrap;
  padding: 0.5rem 0rem;
}
.after_camera .visit_img {
  width: 4.1rem;
  min-width: 4.1rem;
  height: 4.1rem !important;
  margin-right: 0.625rem;
  margin-bottom: 0.625rem;
}
.after_camera .visit_img:nth-child(3n) {
  margin-right: 0rem;
}
.after_camera .visit_img img {
  width: 100%;
  height: 100%;
}
.after_camera .camera_icon {
  min-width: 4.1rem;
  width: 4.1rem;
  height: 4.1rem;
  border: 1px solid #eee;
}
.after_camera .camera_icon .van-icon {
  color: #a8aec1;
}
</style>
