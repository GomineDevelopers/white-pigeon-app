<template>
  <van-row class="visit">
    <van-row class="approve_nav flex">
      <span :class="active ? 'active':''" @click="active = !active">拜访</span>
      <span :class="active ? '':'active'" @click="active = !active">会议</span>
    </van-row>
    <van-row class="main_body2">
      <!-- 拜访 -->
      <van-row class="visit_content" v-show="active ">
        <van-row class="info_module">
          <van-row class="row_title">医院</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{hospitalValue ? hospitalValue:'请选择'}}</span>
            <van-icon name="arrow" @click="hospitalShow = true" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">客户</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{customer ? customer:'请选择'}}</span>
            <van-icon name="arrow" @click="customerShow=true" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">开始时间</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{startTime ? startTime:'开始时间'}}</span>
            <van-icon name="arrow" @click="timeShow=true" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">拜访目的</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{visitPurpose ? visitPurpose:'请选择'}}</span>
            <van-icon name="arrow" @click="visitPurposeShow=true" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">拜访渠道</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{visitChannel ? visitChannel:'请选择'}}</span>
            <van-icon name="arrow" @click="visitChannelShow=true" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">产品</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{product ? product:'请选择'}}</span>
            <van-icon name="arrow" @click="productShow=true" />
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
          <van-row class="flex after_camera" v-if="visitPhoto.length>0">
            <van-row
              class="visit_img"
              v-for="(visitPhotoList,index) in visitPhoto"
              :key="index+'vi'"
            >
              <img :src="visitPhotoList" />
            </van-row>
            <van-row class="flex camera_icon" @click="visitCamera">
              <van-icon name="photograph" />
            </van-row>
          </van-row>
          <van-row class="camera" @click="visitCamera" v-if="visitPhoto.length==0">
            <van-row class="flex camera_icon">
              <van-icon name="photograph" />
              <span>点击拍照</span>
            </van-row>
          </van-row>
        </van-row>
        <van-row class="middle_button flex">
          <button class="middle_button1">创建</button>
          <button class="middle_button2">提交</button>
        </van-row>
      </van-row>

      <!-- 会议 -->
      <van-row class="metting_content" v-show="!active">
        <van-row class="info_module">
          <van-row class="row_title">
            产品
            <i>*</i>
          </van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{product2 ? product2:'请选择'}}</span>
            <van-icon name="arrow" @click="productShow2 = true" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">
            会议主题
            <i>*</i>
          </van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{conferenceTheme ? conferenceTheme:'请选择'}}</span>
            <van-icon name="arrow" @click="conferenceThemeShow = true" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">医院</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{hospital2 ? hospital2:'请选择'}}</span>
            <van-icon name="arrow" @click="hospitalShow2 = true" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">
            所属科室
            <i>*</i>
          </van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{department ? department:'请选择'}}</span>
            <van-icon name="arrow" @click="departmentShow = true" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">
            开始时间
            <i>*</i>
          </van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{mettingStartTime ? mettingStartTime:'开始时间'}}</span>
            <van-icon name="arrow" @click="mettingStartTimeShow=true" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">
            演讲人
            <i>*</i>
          </van-row>
          <van-row class="icon_right flex">
            <van-field v-model="userName" placeholder="请输入姓名" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">
            人数
            <i>*</i>
          </van-row>
          <van-row class="icon_right flex">
            <van-field v-model="userNum" type="number" placeholder="请输入" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">人员拍照</van-row>
          <van-row class="flex after_camera" v-if="personnelPhoto.length>0">
            <van-row
              class="visit_img"
              v-for="(personnelPhotoList,index) in personnelPhoto"
              :key="index+'pe'"
            >
              <img :src="personnelPhotoList" />
            </van-row>
            <van-row class="flex camera_icon" @click="personnelCamera">
              <van-icon name="photograph" />
            </van-row>
          </van-row>
          <van-row class="camera" @click="personnelCamera" v-if="personnelPhoto.length==0">
            <van-row class="flex camera_icon">
              <van-icon name="photograph" />
              <span>点击拍照</span>
            </van-row>
          </van-row>
          <van-row class="notice">温馨提示：需要参会人员与PPT同框</van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">签到表拍照</van-row>
          <van-row class="flex after_camera" v-if="signPhoto.length>0">
            <van-row class="visit_img" v-for="(signPhotoList,index) in signPhoto" :key="index+'si'">
              <img :src="signPhotoList" />
            </van-row>
            <van-row class="flex camera_icon" @click="signCamera">
              <van-icon name="photograph" />
            </van-row>
          </van-row>
          <van-row class="camera" @click="signCamera" v-if="signPhoto.length==0">
            <van-row class="flex camera_icon">
              <van-icon name="photograph" />
              <span>点击拍照</span>
            </van-row>
          </van-row>
          <van-row class="notice">温馨提示：拍取签到表</van-row>
        </van-row>
        <van-row class="middle_button flex">
          <button class="middle_button1">创建</button>
          <button class="middle_button2">提交</button>
        </van-row>
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

    <!-- 以下为会议页的选项 -->
    <!-- 产品 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="productShow2">
          <van-picker
            show-toolbar
            title="产品选择"
            :columns="productList2"
            @cancel="productShow2 = false"
            @confirm="productConfirm2"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 会议主题 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="conferenceThemeShow">
          <van-picker
            show-toolbar
            title="会议主题选择"
            :columns="conferenceThemeList"
            @cancel="conferenceThemeShow = false"
            @confirm="conferenceThemeConfirm"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 医院 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="hospitalShow2">
          <van-picker
            show-toolbar
            title="医院选择"
            :columns="hospitalList2"
            @cancel="hospitalShow2 = false"
            @confirm="hospitalListConfirm"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 所属科室 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="departmentShow">
          <van-picker
            show-toolbar
            title="所属科室选择"
            :columns="departmentList"
            @cancel="departmentShow = false"
            @confirm="departmentConfirm"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 时间选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="mettingStartTimeShow">
          <van-datetime-picker
            v-model="mettingDate"
            title="时间选择"
            type="datetime"
            :min-date="minDate"
            @cancel="mettingStartTimeShow = false"
            @confirm="mettingTimeConfirm"
          />
        </van-row>
      </transition>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "visit",
  data() {
    return {
      active: true,
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
      currentDate: new Date(),

      //会议数据
      productShow2: false,
      product2: "",
      productList2: [],
      conferenceThemeShow: false,
      conferenceTheme: "",
      conferenceThemeList: [],
      hospitalShow2: false,
      hospital2: "",
      hospitalList2: [],
      departmentShow: false,
      department: "",
      departmentList: [],
      mettingStartTimeShow: false,
      mettingStartTime: "",
      mettingDate: new Date(),
      userName: "",
      userNum: "",
      personnelPhoto: [],
      signPhoto: []
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

    // 会议
    productConfirm2() {},
    conferenceThemeConfirm() {},
    hospitalListConfirm() {},
    departmentConfirm() {},
    mettingTimeConfirm() {},
    personnelCamera() {
      let This = this;
      var cmr = plus.camera.getCamera();
      var res = cmr.supportedImageResolutions[0];
      var fmt = cmr.supportedImageFormats[0];
      cmr.captureImage(
        function(path) {
          //处理拍摄照片的路径，在页面展示
          plus.io.resolveLocalFileSystemURL(
            path,
            function(entry) {
              This.personnelPhoto.push(entry.fullPath);
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
    signCamera() {
      let This = this;
      var cmr = plus.camera.getCamera();
      var res = cmr.supportedImageResolutions[0];
      var fmt = cmr.supportedImageFormats[0];
      cmr.captureImage(
        function(path) {
          //处理拍摄照片的路径，在页面展示
          plus.io.resolveLocalFileSystemURL(
            path,
            function(entry) {
              This.signPhoto.push(entry.fullPath);
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
    }
  }
};
</script>
<style>
.info_module .van-icon-replay {
  color: #1f95ff;
}
.info_module .van-cell {
  padding: 0.18rem 0rem 0rem 0rem;
  font-size: 0.625rem;
}
</style>
<style scoped>
.visit {
  margin-top: 3.125rem;
  height: 86vh;
  overflow: hidden;
}
.main_body2 {
  text-align: left;
  height: 76vh;
  overflow-y: auto;
}
.approve_nav {
  height: 1.55rem;
  line-height: 1.55rem;
  width: 13.125rem;
  background: #f3f3f3;
  font-size: 0.875rem;
  color: #3399ff;
  margin: 0 auto;
  border-radius: 1.375rem;
  justify-content: space-between;
}
.approve_nav span {
  flex: 1;
  font-size: 0.75rem;
  border-radius: 1.375rem;
}
.approve_nav span.active {
  background: #3399ff;
  color: #fff;
}
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
/* .visit_img .metting_img {
  width: 100%;
  height: 100%;
} */
</style>