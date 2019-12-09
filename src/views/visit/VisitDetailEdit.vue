<template>
  <van-row class="visit">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="拜访编辑" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body2">
      <!-- 拜访 -->
      <van-row class="visit_content">
        <van-row class="info_module" @click="hospitalShow = true">
          <van-row class="row_title">医院</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{hospital_name ? hospital_name:'请选择'}}</span>
            <van-icon name="arrow" />
          </van-row>
        </van-row>
        <van-row class="info_module" @click="customerShow=true">
          <van-row class="row_title">客户</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{doctor_name ? doctor_name:'请选择'}}</span>
            <van-icon name="arrow" />
          </van-row>
        </van-row>
        <van-row class="info_module" @click="timeShow=true">
          <van-row class="row_title">开始时间</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{start_time ? start_time:'开始时间'}}</span>
            <van-icon name="arrow" />
          </van-row>
        </van-row>
        <van-row class="info_module" @click="visitPurposeShow=true">
          <van-row class="row_title">拜访目的</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{visit_goal ? visit_goal:'请选择'}}</span>
            <van-icon name="arrow" />
          </van-row>
        </van-row>
        <van-row class="info_module" @click="visitChannelShow=true">
          <van-row class="row_title">拜访渠道</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{visitChannel ? visitChannel:'请选择'}}</span>
            <van-icon name="arrow" />
          </van-row>
        </van-row>
        <van-row class="info_module" @click="productShow=true">
          <van-row class="row_title">产品</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{product_name ? product_name:'请选择'}}</span>
            <van-icon name="arrow" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">拜访定位</van-row>
          <van-row class="icon_right flex">
            <span class="flex_1">{{visit_position}}</span>
            <van-icon name="replay" @click="location" />
          </van-row>
        </van-row>
        <van-row class="info_module">
          <van-row class="row_title">拍照上传</van-row>
          <van-row class="flex after_camera">
            <van-row
              class="visit_img"
              v-for="(visitPhotoList,index) in visitPhoto"
              :key="index+'vi'"
            >
              <img :src="visitPhotoList" />
              <van-icon name="clear" class="del_icon" @click="deleteImg(index)" />
            </van-row>
            <van-uploader
              v-show="visitPhoto.length < 3"
              class="upload_btn"
              v-model="fileList"
              :preview-image="false"
              :max-count="3"
              :after-read="afterRead"
              capture="camera"
            >
              <van-row class="flex camera_icon">
                <van-icon name="photograph" />
                <span>点击拍照</span>
              </van-row>
            </van-uploader>
          </van-row>
        </van-row>
        <van-row class="middle_button flex">
          <button class="middle_button2" @click="checkData">提交</button>
        </van-row>
      </van-row>
    </van-row>
    <baidu-map :center="center" @ready="handler"></baidu-map>
    <!-- 医院选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-popup v-model="hospitalShow" position="bottom">
          <van-picker
            show-toolbar
            title="医院选择"
            :columns="hospitalList"
            @cancel="hospitalShow = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </transition>
    </van-row>

    <!-- 客户选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-popup v-model="customerShow" position="bottom">
          <van-picker
            show-toolbar
            title="客户选择"
            :columns="customerList"
            @cancel="customerShow = false"
            @confirm="customerConfirm"
          />
        </van-popup>
      </transition>
    </van-row>

    <!-- 时间选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-popup v-model="timeShow" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            title="时间选择"
            type="datetime"
            :min-date="minDate"
            @cancel="timeShow = false"
            @confirm="timeConfirm"
          />
        </van-popup>
      </transition>
    </van-row>
    <!-- 拜访目的 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-popup v-model="visitPurposeShow" position="bottom">
          <van-picker
            show-toolbar
            title="拜访目的选择"
            :columns="visitPurposeList"
            @cancel="visitPurposeShow = false"
            @confirm="visitPurposeConfirm"
          />
        </van-popup>
      </transition>
    </van-row>
    <!-- 拜访渠道 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-popup v-model="visitChannelShow" position="bottom">
          <van-picker
            show-toolbar
            title="拜访渠道选择"
            :columns="visitChannelList"
            @cancel="visitChannelShow = false"
            @confirm="visitChannelConfirm"
          />
        </van-popup>
      </transition>
    </van-row>
    <!-- 产品 -->
    <van-row class="showbank">
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
    </van-row>
  </van-row>
</template>
<script>
import { upload } from "@/js/upload";
import {minDate,minutesTimeFormat } from "@/js/public";
export default {
  name: "visitdetailedit",
  data() {
    return {
      hospitalShow: false,
      customerShow: false,
      timeShow: false,
      visitPurposeShow: false,
      visitChannelShow: false,
      productShow: false,
      hospital_name: "",
      doctor_name: "",
      start_time: "",
      visit_goal: "",
      visitChannel: "",
      product_name: "",
      hospital_id: "",
      doctor_id: "",
      visit_goal_id: "",
      visit_channel: "",
      product_id: "",
      visit_position: "",
      visitPhoto: [],
      hospitalList: [],
      customerList: [],
      visitPurposeList: [],
      visitChannelList: [{ id: 1, text: "面对面拜访" }],
      productList: [],
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
      fileList: [],
      center: { lng: 0, lat: 0 }
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
    this.$toast.loading({
      message: "数据加载中...",
      forbidClick: true,
      duration: 0,
      loadingType: "spinner"
    });
  },
  mounted() {
    this.visit_id = this.$route.query.id;
    this.getVisitGoal();
    this.minDate = minDate();
  },
  methods: {
    // 拜访定位
    location() {
      this.$toast.loading({
      message: "正在定位...",
      forbidClick: true,
      loadingType: "spinner"
    });
      this.handler();
    },
    handler() {
      let geoLocation = new BMap.Geolocation();
      geoLocation.getCurrentPosition(r => {
        let addr = r.address;
				this.visit_position = addr.city + addr.district + addr.street + addr.street_number;
      })
    },
    // 获取拜访数据
    getVistDetail() {
      let visit_id = this.visit_id;
      this.$api
        .visitDetail({ visit_id })
        .then(res => {
          if (res.code == 200) {
            let data = res.visit_detail;

            data.visit_image == null
              ? ""
              : (this.$data.visitPhoto[0] = data.visit_image);
            data.visit_image_two == null
              ? ""
              : (this.$data.visitPhoto[1] = data.visit_image_two);
            data.visit_image_three == null
              ? ""
              : (this.$data.visitPhoto[2] = data.visit_image_three);

            if (data.visit_channel == 1) {
              this.$data.visitChannel = "面对面拜访";
            }
            Object.assign(this.$data, res.visit_detail);
            this.hospitalInfo.map(item => {
              if (item.hospital_id == data.hospital_id) {
                this.customerList.push({
                  id: item.doctor_id,
                  text: item.doctor_name
                });
              }
            });
            this.productInfo.map(item => {
              if (item.hospital_id == data.hospital_id) {
                this.productList.push({
                  id: item.product_id,
                  text: item.product_name
                });
              }
            });
          }
          this.$toast.clear();
        })
        .catch(err => {
          console.log(err);
          this.$toast.clear();
        });
    },
    // 获取拜访关联的医院
    getVisitRelation() {
      this.$api
        .visitRelation()
        .then(res => {
          if (res.code == 200) {
            let hospitalInfo = res.getInfoByHospitalId;
            let productInfo = res.getproductByHospitalId;
            if (hospitalInfo.length != 0) {
              let currHospitalObj = {};
              this.hospitalInfo = hospitalInfo;
              this.productInfo = productInfo;
              this.hospitalList = hospitalInfo.reduce((item, next) => {
                currHospitalObj[next.hospital_id]
                  ? ""
                  : (currHospitalObj[next.hospital_id] =
                      true &&
                      item.push({
                        id: next.hospital_id,
                        text: next.hospital_name
                      }));
                return item;
              }, []);
              this.getVistDetail();
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取拜访目的
    getVisitGoal() {
      this.$api
        .visitGoal()
        .then(res => {
          if (res.code == 200) {
            this.visitPurposeList = res.visit_goal_list.map(item => {
              return { id: item.id, text: item.visit_goal };
            });
            this.getVisitRelation();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择医院
    onConfirm(v) {
      this.hospitalShow = false;
      this.hospital_name = v.text;
      this.hospital_id = v.id;
      this.doctor_name = "";
      this.doctor_id = "";
      this.product_name = "";
      this.product_id = "";
      this.customerList = [];
      this.productList = [];
      this.hospitalInfo.map(item => {
        if (item.hospital_id == v.id) {
          this.customerList.push({
            id: item.doctor_id,
            text: item.doctor_name
          });
        }
      });
      this.productInfo.map(item => {
        if (item.hospital_id == v.id) {
          this.productList.push({
            id: item.product_id,
            text: item.product_name
          });
        }
      });
    },
    // 选择客户
    customerConfirm(v) {
      this.customerShow = false;
      this.doctor_name = v.text;
      this.doctor_id = v.id;
    },
    // 开始时间选择
    timeConfirm(v) {
      this.timeShow = false;
      this.start_time = minutesTimeFormat(v)
    },
    // 选择拜访目的
    visitPurposeConfirm(v) {
      this.visitPurposeShow = false;
      this.visit_goal = v.text;
      this.visit_goal_id = v.id;
    },
    // 拜访渠道选择
    visitChannelConfirm(v) {
      this.visitChannelShow = false;
      this.visitChannel = v.text;
      this.visit_channel = v.id;
    },
    // 产品选择
    productConfirm(v) {
      this.productShow = false;
      this.product_name = v.text;
      this.product_id = v.id;
    },
    //拜访拍照上传
    afterRead(file) {
      upload(file, 0).then(res => {
        this.visitPhoto.push(res);
      });
    },
    // 删除图片
    deleteImg(i) {
      this.visitPhoto.splice(i,1);
    },
    // 检测上传数据是否为空
    checkData() {
      if (!this.hospital_id) {
        this.$toast("医院不能为空");
      } else if (!this.doctor_id) {
        this.$toast("客户不能为空");
      } else if (!this.start_time) {
        this.$toast("开始时间不能为空");
      } else if (!this.visit_goal_id) {
        this.$toast("拜访目的不能为空");
      } else if (!this.visit_channel) {
        this.$toast("拜访渠道不能为空");
      } else if (!this.product_id) {
        this.$toast("产品不能为空");
      } else if (!this.visit_position) {
        this.$toast("拜访定位不能为空");
      } else {
        let data = {
          visit_id: this.visit_id,
          hospital_id: this.hospital_id,
          doctor_id: this.doctor_id,
          start_time: this.start_time,
          goal_visit_id: this.visit_goal_id,
          visit_channel: this.visit_channel,
          product_id: this.product_id,
          visit_position: this.visit_position,
          visit_image: this.visitPhoto[0] || null,
          visit_image_two: this.visitPhoto[1] || null,
          visit_image_three: this.visitPhoto[2] || null
        };
        this.upDataToServer(data);
      }
    },
    // 上传数据到服务器
    upDataToServer(data) {
      this.$api
        .visitEdit(data)
        .then(res => {
          if (res.code == 200) {
            this.$toast.success("上传成功");
            setTimeout(() => {
              this.$router.replace("/visitrecord");
            }, 1000);
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onBack() {
      history.back();
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
  margin-top: 2rem;
  /* height: 100vh; */
  overflow: hidden;
}
.main_body2 {
  text-align: left;
  /* height: 76vh; */
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
  float: left;
  flex-wrap: wrap;
  padding: 0.5rem 0rem;
}
.after_camera .visit_img {
  width: 4.1rem;
  min-width: 4.1rem;
  height: 4.1rem !important;
  margin-right: 0.625rem;
  position: relative;
}
.after_camera .visit_img:nth-child(3n) {
  margin-right: 0rem;
}
.after_camera .visit_img img {
  width: 100%;
  height: 100%;
}
.after_camera .visit_img .del_icon {
  position: absolute;
  top: -8px;
  right: -8px;
  color: #969799;
  font-size: 18px;
  background-color: #fff;
  border-radius: 100%;
}
.after_camera .van-uploader {
  width: auto !important;
}
.after_camera .camera_icon {
  min-width: 4.1rem;
  width: 4.1rem;
  height: 4.1rem;
}
.after_camera .camera_icon .van-icon {
  color: #2692f3;
}
.middle_button2 {
  width: 100%;
}
</style>