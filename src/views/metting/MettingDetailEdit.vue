<template>
  <van-row class="visit">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="会议详情" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body2">
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
            <span class="flex_1">{{ hospital ? hospital : "请选择" }}</span>
            <van-icon name="arrow" />
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
                {{ sectionItem }}
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
            </van-row>
          </van-row>
          <van-row class="camera" v-if="personnelPhoto.length == 0">
            <van-row class="flex camera_icon" @click="personCamera">
              <van-icon name="photograph" />
              <span>点击拍照</span>
            </van-row>
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
          </van-row>
          <van-row class="notice">温馨提示：拍取签到表</van-row>
        </van-row>
        <van-row class="public_btn">
          <button @click="editMetting()">提交</button>
        </van-row>
      </van-row>
    </van-row>
    <!-- 以下为会议页的选项 -->
    <!-- 产品 -->
    <transition name="van-slide-up">
      <van-popup v-model="productShow" position="bottom">
        <van-picker
          show-toolbar
          title="产品选择"
          :default-index="productDefaultIndex"
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
          :default-index="themeDefaultIndex"
          :columns="conferenceThemeList"
          @cancel="conferenceThemeShow = false"
          @confirm="conferenceThemeConfirm"
        />
      </van-popup>
    </transition>
    <!-- 医院 -->
    <transition name="van-slide-up">
      <van-popup v-model="hospitalShow" position="bottom">
        <van-picker
          show-toolbar
          title="医院选择"
          :default-index="hospitalDefaultIndex"
          :columns="hospitalList"
          @cancel="hospitalShow = false"
          @confirm="hospitalListConfirm"
        />
      </van-popup>
    </transition>
    <!-- 所属科室 -->
    <transition name="van-slide-up">
      <van-popup
        v-model="sectionShow"
        position="bottom"
        :close-on-click-overlay="propFalse"
        class="section_popup"
      >
        <van-row class="section_button">
          <van-col span="8" @click="sectionShow = false">取消</van-col>
          <van-col span="8" class="section_title">科室选择</van-col>
          <van-col span="8" @click="sectionCom">确认</van-col>
        </van-row>
        <van-checkbox-group v-model="sectionSelect" :max="3">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in sectionNameList"
              clickable
              :key="index + 'se'"
              :title="item"
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
</template>
<script>
import { minutesTimeFormat } from "../../js/public";
import { upload, photograph } from "@/js/upload";
export default {
  name: "visit",
  data() {
    return {
      propFalse: false,
      hospitalByproductId: null, //产品关联科室，医院
      mettingByProductId: null, //产品关联会议
      secAndHosData: null, //医院和科室的数组
      productDefaultIndex: 0,
      themeDefaultIndex: 0,
      hospitalDefaultIndex: 0,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
      //会议数据
      productShow: false,
      product: "",
      productId: "",
      productList: [],
      conferenceThemeShow: false,
      conferenceTheme: "",
      conferenceThemeId: "",
      conferenceThemeList: [],
      hospitalShow: false,
      hospital: "",
      hospitalId: "",
      hospitalList: [],
      sectionShow: false,
      sectionTotal: [], //每个产品关联的科室信息，包含section_name,section_id
      sectionNameList: [], //所有的科室信息列表名称（为checkbox提供选项的）
      sectionIdList: [], //存放所选科室的id
      sectionSelect: [], //存放选择的科室名称
      mettingStartTimeShow: false,
      mettingStartTime: "",
      mettingDate: new Date(),
      userName: "",
      userNumShow: false,
      userNum: "",
      userNumList: [
        "1",
        "2",
        "3",
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
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35"
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
    this.getMetting();
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
    //获取会议详情
    getMetting() {
      this.$toast.loading({
        message: "数据加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner"
      });
      // console.log("会议id", this.$route.query.id);
      let params = { meeting_id: this.$route.query.id };
      this.$api
        .meetingDetail(params)
        .then(res => {
          console.log("会议详情", res);
          if (res.code == 200) {
            let data = res.meeting_detail[0];
            this.$toast.clear();
            this.product = data.product_name;
            this.productId = data.product_id;
            this.conferenceTheme = data.product_topic;
            this.conferenceThemeId = data.product_topic_id;
            this.hospital = data.hospital_name;
            this.hospitalId = data.hospital_id;
            //处理选中科室
            this.sectionIdList = data.section_id_list.split(",");
            this.sectionSelect = data.section_name.split(",");
            this.mettingStartTime = data.start_time;
            this.userName = data.speaker;
            this.userNum = data.num;
            if (data.personnel_image != null) {
              this.personnelPhoto.push(data.personnel_image);
            }
            if (data.personnel_image_two != null) {
              this.personnelPhoto.push(data.personnel_image_two);
            }
            if (data.sign_image != null) {
              this.signPhoto.push(data.sign_image);
            }
            this.getInfoByProductId();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //通过产品关联会议
    getInfoByProductId() {
      this.$api
        .meetingGetInfoByProductId()
        .then(res => {
          console.log(res);
          this.hospitalByproductId = res.getInfoByProductId;
          this.mettingByProductId = res.getTopicByProductId;
          if (res.code == 200) {
            //后台返回数据的product去重
            var arr1 = {};
            this.productList = res.getInfoByProductId.reduce((item, next) => {
              arr1[next.product_id]
                ? ""
                : (arr1[next.product_id] =
                    true && item.push({ id: next.product_id, text: next.product_name }));
              return item;
            }, []);
            // console.log("this.productList", this.productList); //控制台查看结果
            this.contactHosAndSen(); //初始化默认选项
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //产品关联医院，科室
    contactHosAndSen() {
      //初始化会议，医院，科室
      var mettingArr = {};
      let mettingTemp = [];
      //根据产品关联会议主题
      this.mettingByProductId.forEach(item => {
        if (this.productId == item.product_id) {
          mettingTemp.push({ id: item.id, text: item.product_topic });
        }
      });
      this.conferenceThemeList = mettingTemp.reduce((item, next) => {
        mettingArr[next.id]
          ? ""
          : (mettingArr[next.id] = true && item.push({ id: next.id, text: next.text }));
        return item;
      }, []);

      //根据产品关联医院和科室
      var arr1 = {};
      let temp = [];
      this.hospitalByproductId.forEach(item => {
        if (this.productId == item.product_id) {
          temp.push({ id: item.hospital_id, text: item.hospital_name });
        }
      });
      this.hospitalList = temp.reduce((item, next) => {
        arr1[next.id] ? "" : (arr1[next.id] = true && item.push({ id: next.id, text: next.text }));
        return item;
      }, []);

      //通过选择的产品请求出科室信息
      let params = { product_id: this.productId };
      this.$api
        .meetingGetSection(params)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.sectionTotal = res.product_section_list;
            // console.log("当前产品科室信息", this.sectionTotal);
            this.sectionTotal.forEach(value => {
              this.sectionNameList.push(value.section_name);
            });
          } else {
            this.$toast.fail("获取科室信息失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
      // console.log("当前产品科室名称列表", this.sectionNameList);

      //设置默认选项
      // console.log("产品", this.productId, this.productList);
      // console.log("会议主题id", this.conferenceThemeId, this.conferenceThemeList);
      // console.log("医院", this.hospitalId, this.hospitalList);
      this.productDefaultIndex = this.getAnyIndex(this.productId, this.productList);
      this.themeDefaultIndex = this.getAnyIndex(this.conferenceThemeId, this.conferenceThemeList);
      this.hospitalDefaultIndex = this.getAnyIndex(this.hospitalId, this.hospitalList);
    },
    // 产品确认
    productConfirm(value) {
      this.productShow = false;
      this.product = value.text;
      this.productId = value.id;
      this.conferenceTheme = "";
      this.conferenceThemeId = "";
      this.hospital = "";
      this.hospitalId = "";
      this.sectionTotal = [];
      this.sectionNameList = [];
      this.sectionIdList = [];
      this.sectionSelect = [];
      this.contactHosAndSen();
    },
    // 会议主题确认
    conferenceThemeConfirm(value) {
      this.conferenceThemeShow = false;
      this.conferenceTheme = value.text;
      this.conferenceThemeId = value.id;
    },
    hospitalListConfirm(value) {
      this.hospitalShow = false;
      this.hospital = value.text;
      this.hospitalId = value.id;
    },
    //科室选择确认时
    sectionCom() {
      this.sectionShow = false;
      this.sectionIdList = [];
      console.log(this.sectionTotal, "~~~~~~~~~");
      console.log(this.sectionSelect, "--------");
      this.sectionTotal.forEach(value => {
        this.sectionSelect.forEach(item => {
          if (value.section_name == item) {
            console.log("value---------", value);
            this.sectionIdList.push(value.section_id);
          }
        });
      });
      console.log(this.sectionIdList, "--------");
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
    //删除照片
    deletePhoto(type, index) {
      // console.log(type, index);
      if (type == 1) {
        this.personnelPhoto.splice(index, 1);
      } else if (type == 2) {
        this.signPhoto.splice(index, 1);
      }
    },
    //返回元素在数组中的值
    getAnyIndex(value, array) {
      let tempIndex;
      array.forEach((item, index) => {
        if (value == item.id) {
          tempIndex = index;
        }
      });
      return tempIndex;
    },
    //创建会议
    editMetting() {
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
      this.$toast.loading({
        message: "会议提交中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner"
      });
      let postData = {
        meeting_id: Number(this.$route.query.id),
        product_id: this.productId,
        product_topic_id: this.conferenceThemeId,
        hospital_id: this.hospitalId,
        section_id_list: this.sectionIdList,
        start_time: this.mettingStartTime,
        speaker: this.userName,
        num: this.userNum,
        personnel_image: this.personnelPhoto[0],
        personnel_image_two: this.personnelPhoto[1],
        sign_image: this.signPhoto[0]
      };

      this.$api
        .meetingEdit(postData)
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$toast.success("会议提交成功");
            setTimeout(() => {
              if (this.$route.query.redirect) {
                this.$router.replace({
                  path: decodeURIComponent(this.$route.query.redirect)
                });
              } else {
                this.$router.replace({ path: "/mettingrecord" });
              }
            }, 2000);
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
.metting_content .van-field__body .van-field__control {
  color: #a8aec1;
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
.info_module span em {
  font-style: normal;
}
</style>
