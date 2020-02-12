<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="创建会议" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <!-- 会议 -->
      <van-row class="metting_content">
        <van-row class="info_module">
          <van-row class="row_title">
            产品
            <i>*</i>
          </van-row>
          <van-row class="icon_right flex" @click="productShow = true">
            <span class="flex_1">{{ product ? product : "请选择" }}</span>
            <van-icon name="arrow" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">
            会议主题
            <i>*</i>
          </van-row>
          <van-row class="icon_right flex" @click="conferenceThemeShow = true">
            <span class="flex_1">{{ conferenceTheme ? conferenceTheme : "请选择" }}</span>
            <van-icon name="arrow" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">
            医院
            <i>*</i>
          </van-row>
          <van-row class="icon_right flex" @click="hospitalShow = true">
            <span class="flex_1">{{ hospital }}</span>
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">
            所属科室
            <i>*</i>
          </van-row>
          <van-row class="icon_right flex" @click="sectionShow = true">
            <span class="flex_1">
              {{ sectionSelect.length == 0 ? "最多可选择三个科室" : "" }}
              <em v-for="(sectionItem, index) in sectionSelect" :key="index + 'a'">
                {{ sectionItem.section_name }}
                <em v-if="index != sectionSelect.length - 1">,</em>
              </em>
            </span>
            <van-icon name="arrow" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">
            开始时间
            <i>*</i>
          </van-row>
          <van-row class="icon_right flex" @click="mettingStartTimeShow = true">
            <span class="flex_1">{{ mettingStartTime ? mettingStartTime : "开始时间" }}</span>
            <van-icon name="arrow" />
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
          <van-row class="icon_right flex" @click="userNumShow = true">
            <span class="flex_1">{{ userNum ? userNum : "请选择" }}</span>
            <van-icon name="arrow" />
          </van-row>
        </van-row>
        <!-- 人员拍照开始 -->
        <van-row class="info_module">
          <van-row class="row_title">
            人员拍照
            <i>*</i>
          </van-row>
          <van-row class="flex after_camera" v-if="personnelPhoto.length > 0">
            <van-row
              class="visit_img"
              v-for="(personlPhotoList, index) in personnelPhoto"
              :key="index + 'pe'"
            >
              <img :src="personlPhotoList" />
              <van-icon name="close" class="delete_img" @click="deletePhoto(1, index)" />
            </van-row>
            <van-row class="flex camera_icon" v-show="personnelPhoto.length < 2">
              <van-row class="flex camera_icon" @click="personCamera">
                <van-icon name="photograph" />
                <span>点击拍照</span>
              </van-row>
              <!-- <van-uploader
              class="photoUpload flex flex_align_center flex_justify_center"
              :after-read="uploadPersonPhoto"
            >
              <van-row class="flex camera_icon">
                <van-icon name="photograph" />
              </van-row>
            </van-uploader> -->
            </van-row>
          </van-row>
          <van-row class="camera" v-if="personnelPhoto.length == 0">
            <van-row class="flex camera_icon" @click="personCamera">
              <van-icon name="photograph" />
              <span>点击拍照</span>
            </van-row>
            <!-- <van-uploader
            class="photoUpload flex flex_align_center flex_justify_center"
            :after-read="uploadPersonPhoto"
          >
            <van-row class="flex camera_icon">
              <van-icon name="photograph" />
              <span>点击拍照</span>
            </van-row>
          </van-uploader> -->
          </van-row>
          <van-row class="notice">温馨提示：需要参会人员与PPT同框</van-row>
        </van-row>
        <!-- 人员拍照结束 -->
        <van-row class="info_module">
          <van-row class="row_title">
            签到表拍照
            <i>*</i>
          </van-row>
          <van-row class="flex after_camera" v-if="signPhoto.length > 0">
            <van-row
              class="visit_img"
              v-for="(signPhotoList, index) in signPhoto"
              :key="index + 'si'"
            >
              <img :src="signPhotoList" />
              <van-icon name="close" class="delete_img" @click="deletePhoto(2, index)" />
            </van-row>
          </van-row>
          <van-row class="camera" v-if="signPhoto.length == 0">
            <van-row class="flex camera_icon" @click="singCamera">
              <van-icon name="photograph" />
              <span>点击拍照</span>
            </van-row>
            <!-- <van-uploader
            class="photoUpload flex flex_align_center flex_justify_center"
            :after-read="uploadSignPhoto"
          >
            <van-row class="flex camera_icon">
              <van-icon name="photograph" />
              <span>点击拍照</span>
            </van-row>
          </van-uploader> -->
          </van-row>
          <van-row class="notice">温馨提示：拍取签到表</van-row>
        </van-row>
        <van-row class="middle_button flex">
          <button class="middle_button1" @click="createMetting(1)">创建</button>
          <button class="middle_button2" @click="createMetting(2)">提交</button>
        </van-row>
      </van-row>
      <!-- </van-row> -->
      <!-- 以下为会议页的选项 -->
      <!-- 产品 -->
      <transition name="van-slide-up">
        <van-popup v-model="productShow" position="bottom">
          <van-picker
            show-toolbar
            title="产品选择"
            :columns="productList"
            @cancel="productShow = false"
            @confirm="productConfirm"
          />
        </van-popup>
      </transition>
      <!-- 会议主题 -->
      <transition name="van-slide-up">
        <van-popup v-model="conferenceThemeShow" position="bottom">
          <van-picker
            show-toolbar
            title="会议主题选择"
            :columns="conferenceThemeList"
            @cancel="conferenceThemeShow = false"
            @confirm="conferenceThemeConfirm"
          />
        </van-popup>
      </transition>
      <!-- 所属科室 -->
      <transition name="van-slide-up">
        <van-popup v-model="sectionShow" position="bottom" class="section_popup">
          <van-row class="section_button">
            <van-col span="8" @click="sectionShow = false">取消</van-col>
            <van-col span="8" class="section_title">科室选择</van-col>
            <van-col span="8" @click="sectionConfirm">确认</van-col>
          </van-row>
          <van-checkbox-group v-model="sectionSelect" :max="3">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in sectionList"
                clickable
                :key="index + 'se'"
                :title="item.section_name"
                @click="toggle(index)"
              >
                <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-popup>
      </transition>
      <!-- 时间选择 -->
      <transition name="van-slide-up">
        <van-popup v-model="mettingStartTimeShow" position="bottom">
          <van-datetime-picker
            v-model="mettingDate"
            title="时间选择"
            type="datetime"
            :formatter="formatter"
            :min-date="minDate"
            @cancel="mettingStartTimeShow = false"
            @confirm="mettingTimeConfirm"
          />
        </van-popup>
      </transition>
      <!-- 人数选择 -->
      <transition name="van-slide-up">
        <van-popup v-model="userNumShow" position="bottom">
          <van-picker
            show-toolbar
            title="人数选择"
            :columns="userNumList"
            @cancel="userNumShow = false"
            @confirm="userNumConfirm"
          />
        </van-popup>
      </transition>
    </van-row>
  </van-row>
</template>
<script>
import { minutesTimeFormat, minDate } from "../../js/public";
import { upload, photograph } from "@/js/upload";
export default {
  name: "visit",
  data() {
    return {
      hospitalByproductId: null, //产品关联科室，医院
      mettingByProductId: null, //产品关联会议
      secAndHosData: null, //医院和科室的数组
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      //会议数据
      productShow: false,
      product: "",
      productId: "",
      productList: [],
      conferenceThemeShow: false,
      conferenceTheme: "",
      conferenceThemeId: "",
      conferenceThemeList: [],

      sectionShow: false,
      sectionList: [], //科室信息列表
      sectionSelect: [], //存放选择的科室
      mettingStartTimeShow: false,
      mettingStartTime: "",
      mettingDate: new Date(),
      userName: "",
      userNumShow: false,
      userNum: "",
      userNumList: [
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20"
      ],
      personnelPhoto: [],
      signPhoto: []
    };
  },
  created() {
    // H5 plus事件处理
    function plusReady() {
      // 设置系统状态栏背景为蓝色
      plus.navigator.setStatusBarBackground("#2A76FF");
      plus.navigator.setStatusBarStyle("light");
    }
    if (window.plus) {
      plusReady();
    } else {
      document.addEventListener("plusready", plusReady, false);
    }
    this.getInfoByProductId();
    this.minDate = minDate();

    // console.log(this.$route.query.data);
    //初始化从首页已开发医院点击创建会议的医院的名称，id
    this.hospital = this.$route.query.data.infomation.content;
    this.hospitalId = this.$route.query.data.infomation.hospital_id;
  },
  methods: {
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      }
      return value;
    },
    onBack() {
      history.back();
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    //通过产品关联会议
    getInfoByProductId() {
      let params = { hospital_id: this.$route.query.data.infomation.hospital_id };
      this.$api
        .hospitalDevelopdMeeting(params)
        .then(res => {
          console.log(res);
          this.hospitalByproductId = res.getInfoByProductId;
          this.mettingByProductId = res.getTopicByProductId;
          if (res.code == 200) {
            if (res.getInfoByProductId.length == 0) {
              this.$dialog
                .alert({
                  title: "提示",
                  message: "该医院下您开发的产品还未签约，暂不可以创建会议！"
                })
                .then(() => {
                  this.$router.push({ path: "/" });
                });
              return false;
            }
            //后台返回数据的product去重
            var arr1 = {};
            this.productList = res.getInfoByProductId.reduce((item, next) => {
              arr1[next.product_id]
                ? ""
                : (arr1[next.product_id] =
                    true && item.push({ id: next.product_id, text: next.product_name+'-'+next.specification }));
              return item;
            }, []);
            // console.log("this.productList", this.productList); //控制台查看结果
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 产品确认
    productConfirm(value) {
      this.productShow = false;
      this.product = value.text;
      this.productId = value.id;

      //初始化会议，科室
      this.conferenceTheme = "";
      this.conferenceThemeId = "";
      this.sectionList = [];
      this.sectionSelect = [];

      var mettingArr = {};
      let mettingTemp = [];
      //根据产品关联会议主题
      this.mettingByProductId.forEach(item => {
        if (value.id == item.product_id) {
          mettingTemp.push({ id: item.id, text: item.product_topic });
        }
      });
      this.conferenceThemeList = mettingTemp.reduce((item, next) => {
        mettingArr[next.id]
          ? ""
          : (mettingArr[next.id] = true && item.push({ id: next.id, text: next.text }));
        return item;
      }, []);

      //通过选择的产品请求出科室信息
      let params = { product_id: value.id };
      this.$api
        .meetingGetSection(params)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.sectionList = res.product_section_list;
          } else {
            this.$toast.fail("获取科室信息失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 会议主题确认
    conferenceThemeConfirm(value) {
      this.conferenceThemeShow = false;
      this.conferenceTheme = value.text;
      this.conferenceThemeId = value.id;
    },
    sectionConfirm() {
      this.sectionShow = false;
    },
    mettingTimeConfirm(event) {
      console.log(event);
      this.mettingStartTime = minutesTimeFormat(event);
      this.mettingStartTimeShow = false;
    },
    userNumConfirm(value) {
      this.userNum = value;
      this.userNumShow = false;
    },
    //会议人员拍照上传
    personCamera() {
      photograph()
        .then(res => {
          console.log("305", res);
          upload(res, 0).then(res => {
            this.personnelPhoto.push(res);
          });
        })
        .catch(err => {
          console.log("310", err);
        });
    },

    //签到表拍照
    singCamera() {
      photograph()
        .then(res => {
          console.log("305", res);
          upload(res, 0).then(res => {
            this.signPhoto.push(res);
          });
        })
        .catch(err => {
          console.log("310", err);
        });
    },
    //人员拍照
    // uploadPersonPhoto(file) {
    //   if (this.personnelPhoto.length >= 2) {
    //     this.$toast.fail("此处最多可传2张照片");
    //   } else {
    //     upload(file, 0).then(res => {
    //       this.personnelPhoto.push(res);
    //     });
    //   }
    // },
    // uploadSignPhoto(file) {
    //   if (this.signPhoto.length >= 1) {
    //     this.$toast.fail("此处最多可传1张照片");
    //   } else {
    //     upload(file, 0).then(res => {
    //       this.signPhoto.push(res);
    //     });
    //   }
    // },

    //删除照片
    deletePhoto(type, index) {
      // console.log(type, index);
      if (type == 1) {
        this.personnelPhoto.splice(index, 1);
      } else if (type == 2) {
        this.signPhoto.splice(index, 1);
      }
    },

    //创建会议
    createMetting(type) {
      if (
        this.productId == "" ||
        this.conferenceThemeId == "" ||
        this.hospital == "" ||
        this.sectionSelect.length == 0 ||
        this.mettingStartTime == "" ||
        this.userName == "" ||
        this.userNum == "" ||
        this.personnelPhoto.length == 0 ||
        this.signPhoto.length == 0
      ) {
        this.$toast.fail("请填写完整必填信息");
        return false;
      }
      console.log("所属科室", this.sectionSelect);
      let sectionIdList = [];
      this.sectionSelect.forEach(value => {
        sectionIdList.push(value.section_id);
      });
      // console.log("产品", this.productId, this.product);
      // console.log("会议主题", this.conferenceThemeId, this.conferenceTheme);
      // console.log("医院", this.hospitalId, this.hospital);
      // console.log("时间", this.mettingStartTime);
      // console.log("演讲人", this.userName);
      // console.log("演讲人数", this.userNum);
      // console.log("人员照片1", this.personnelPhoto[0]);
      // console.log("人员照片2", this.personnelPhoto[1]);
      // console.log("签到照片", this.signPhoto[0]);
      if (type == 1) {
        this.$toast.loading({
          message: "会议创建中...",
          forbidClick: true,
          duration: 0,
          loadingType: "spinner"
        });
      } else if (type == 2) {
        this.$toast.loading({
          message: "会议提交中...",
          forbidClick: true,
          duration: 0,
          loadingType: "spinner"
        });
      }
      let postData = {
        is_meeting: type,
        product_id: this.productId,
        product_topic_id: this.conferenceThemeId,
        hospital_id: this.hospitalId,
        section_id_list: sectionIdList,
        start_time: this.mettingStartTime,
        speaker: this.userName,
        num: this.userNum,
        personnel_image: this.personnelPhoto[0],
        personnel_image_two: this.personnelPhoto[1],
        sign_image: this.signPhoto[0]
      };
      this.$api
        .createMeeting(postData)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$toast.success(type == 1 ? "会议创建成功" : "会议提交成功");
            setTimeout(() => {
              this.productId = "";
              this.conferenceThemeId = "";
              this.hospitalId = "";
              this.sectionSelect = [];
              this.mettingStartTime = "";
              this.userName = "";
              this.userNum = "";
              this.personnelPhoto = "";
              this.signPhoto = "";
              this.$router.push({ path: "/mettingrecord" });
            }, 1500);
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
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
.section_popup {
  height: 13rem;
  overflow: hidden;
}
.van-popup .van-checkbox-group {
  height: calc(100% - 2rem);
  position: relative;
  margin-top: 2rem;
  overflow: auto;
}
.van-popup .van-checkbox-group span {
  font-size: 0.6875rem;
}
.van-popup .section_button {
  padding: 0rem 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: 2rem;
  line-height: 2rem;
  border-bottom: 1px solid #eee;
}
.van-popup .section_button .van-col {
  font-size: 0.625rem;
  color: #1989fa;
}
.van-popup .section_button .van-col:nth-child(1) {
  text-align: left;
}
.van-popup .section_button .van-col:nth-child(3) {
  text-align: right;
}
.van-popup .section_button .section_title {
  font-size: 0.6875rem;
  font-weight: 500;
  color: #333;
  text-align: center;
}
.section_popup .van-cell__title {
  text-align: left;
}
.metting_content .van-field__body .van-field__control {
  color: #a8aec1;
}
</style>
<style scoped>
.visit {
  margin-top: 2rem;
  overflow: hidden;
}
.main_body2 {
  text-align: left;
  overflow-y: auto;
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
.info_module span em {
  font-style: normal;
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
.photoUpload {
  width: 100%;
  height: 100%;
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
  position: relative;
}
.after_camera .visit_img .delete_img {
  position: absolute;
  top: -0.2rem;
  right: -0.35rem;
  color: #999;
  font-weight: bold;
  font-size: 0.8rem;
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
