
<template>
  <van-row class="improvepersonalinfo">
    <van-row class="top_nav_bar">
      <van-nav-bar title="完善信息" />
    </van-row>
    <van-row class="main_body">
      <van-row class="info_module">
        <van-row>所属城市</van-row>
        <van-row class="icon_right flex">
          <span>{{areaValue ? areaValue:'请选择业务所属省市'}}</span>
          <van-icon name="arrow" @click="areaListShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row>姓名</van-row>
        <van-row>
          <van-field v-model="userName" placeholder="请输入姓名" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row>身份证号</van-row>
        <van-row>
          <van-field v-model="IDnumber" placeholder="请输入身份证号号码" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row>证件地址</van-row>
        <van-row>
          <van-field v-model="IDaddress" placeholder="请输入身份证证件地址" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row>证件有效期</van-row>
        <van-row class="icon_right flex">
          <span>{{IDdateValue ? IDdateValue:'请选择身份证有效期'}}</span>
          <van-icon name="arrow" @click="IDdateShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row>身份证照片</van-row>
        <van-row class="IDcard_upload flex">
          <van-row class="IDcard flex flex_align_center" @click="IDcardUpload1">
            <img :src="IDcardurl1" class="IDcardimg" v-show="IDcardurl1" />
            <img src="../../assets/image/idcard1.png" v-show="!IDcardurl1" />
          </van-row>
          <van-row class="IDcard flex flex_align_center" @click="IDcardUpload2">
            <img :src="IDcardurl2" class="IDcardimg" v-show="IDcardurl2" />
            <img src="../../assets/image/idcard2.png" v-show="!IDcardurl2" />
          </van-row>
          <!-- <van-col span="12">
            <van-uploader :after-read="afterRead" />
          </van-col>
          <van-col span="12">
            <van-uploader :after-read="afterRead" />
          </van-col>-->
        </van-row>
      </van-row>
      <van-row class="submit_btn" @click="submitInfo">
        <van-button type="info">提&nbsp;交</van-button>
      </van-row>
    </van-row>
    <!-- 省市区选择 -->
    <!-- 上滑进入 -->
    <transition name="van-slide-up">
      <van-row class="area_option" v-show="areaListShow">
        <van-area :area-list="areaList" @confirm="areaConfirmFn" @cancel="areaListShow = false" />
      </van-row>
    </transition>

    <!-- 身份证时间选择 -->
    <transition name="van-slide-up">
      <van-row class="area_option" v-show="IDdateShow">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @confirm="dateConfirmFn"
          @cancel="IDdateShow = false"
        />
      </van-row>
    </transition>

    <!-- 照片选取 -->
    <van-row class="showOption">
      <transition name="van-slide-up">
        <van-row v-show="photographShow">
          <van-picker
            show-toolbar
            :columns="photographOption"
            @cancel="photographShow = false"
            @confirm="photographConfirm"
          />
        </van-row>
      </transition>
    </van-row>
  </van-row>
</template>
<script>
import AreaList from "@/js/area";
export default {
  name: "improvepersonalinfo",
  data() {
    return {
      areaList: AreaList, // 指定数据源
      areaListShow: false,
      IDdateShow: false,
      photographShow: false,
      currentDate: new Date(),
      photographOption: ["拍照", "从相册选取"],
      IDcardFlag: null,
      userName: "",
      areaValue: "",
      IDnumber: "",
      IDdateValue: "",
      IDaddress: "",
      IDcardurl1: "",
      IDcardurl2: ""
    };
  },
  created() {
    // H5 plus事件处理
    function plusReady() {
      // 设置系统状态栏背景为白色
      plus.navigator.setStatusBarBackground("#FFF");
      plus.navigator.setStatusBarStyle("dark");
    }
    if (window.plus) {
      plusReady();
    } else {
      document.addEventListener("plusready", plusReady, false);
    }
  },
  methods: {
    //地区选择确认
    areaConfirmFn(event) {
      this.show = false;
      let arr, SelectProvinceName, SelectCityName, SelectCountyName;
      arr = event;
      SelectProvinceName = arr[0].name; // 省
      SelectCityName = arr[1].name; // 市
      SelectCountyName = arr[2].name; // 区
      this.areaValue =
        SelectProvinceName + " / " + SelectCityName + " / " + SelectCountyName;
      this.areaListShow = false;
      console.log(
        "点击了确定按钮",
        SelectProvinceName,
        SelectCityName,
        SelectCountyName
      );
    },

    //日期选择确定
    dateConfirmFn(event) {
      console.log(event);
      this.IDdateValue = this.timeFormat(event);
      console.log(this.IDdateValue);
      this.IDdateShow = false;
    },

    IDcardUpload1() {
      let vm = this;
      vm.photographShow = true;
      vm.IDcardFlag = 1; //设置标示，当前为身份证正面
    },
    IDcardUpload2() {
      let vm = this;
      vm.photographShow = true;
      vm.IDcardFlag = 2; //设置标示，当前为身份证反面
    },
    photographConfirm(value, index) {
      let vm = this;
      vm.photographShow = false;
      console.log(index);
      if (index == 0) {
        vm.captureImage();
      }
      if (index == 1) {
        vm.galleryImg();
      }
    },

    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "年" + month + "月" + day + "日";
    },

    // 从相册中选取图片
    galleryImg() {
      let This = this;
      console.log("从相册中选择图片:");
      plus.gallery.pick(
        function(path) {
          //从相册中选择图片
          //通过This.IDcardFlag判断当前是身份证是正面还是反面
          if (This.IDcardFlag === 1) {
            This.IDcardurl1 = path;
          } else if (This.IDcardFlag === 2) {
            This.IDcardurl2 = path;
          }
          // This.IDcardurl1 = path;
          // alert(path);
        },
        function(e) {
          //取消选择图片
          console.log("取消选择图片");
        },
        { filter: "image" }
      );
    },

    captureImage() {
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
              //通过This.IDcardFlag判断当前是身份证是正面还是反面
              if (This.IDcardFlag === 1) {
                This.IDcardurl1 = entry.fullPath;
              } else if (This.IDcardFlag === 2) {
                This.IDcardurl2 = entry.fullPath;
              }
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

    submitInfo() {
      let vm = this;
      this.$Dialog
        .confirm({
          message: "请确定您填写的姓名与注册 手机号姓名一致。",
          confirmButtonText: "确认", //改变确认按钮上显示的文字
          cancelButtonText: "修改" //改变取消按钮上显示的文字
        })
        .then(() => {
          // on confirm
          console.log("已确认信息无误！");
          vm.$router.push({ path: "/home" });
        })
        .catch(() => {
          // on cancel
          console.log("返回修改信息！");
        });
    }
  }
};
</script>
<style scoped>
.info_module {
  font-size: 0.6875rem;
  text-align: left;
  /* padding: 0.3125rem 0rem; */
  border-bottom: 1px solid rgba(238, 238, 238);
  margin-bottom: 0.4375rem;
}
.info_module .van-cell {
  padding: 0rem 0rem;
  line-height: 0rem;
  font-size: 0.625rem;
  color: #a8aec1 !important;
}
.info_module .van-row:nth-child(2) {
  margin: 0.5rem 0rem;
  color: #a8aec1;
  font-size: 0.625rem;
}
.info_module span {
  font-size: 0.625rem;
}
.icon_right {
  justify-content: space-between;
}
.icon_right span {
  flex: 1;
}
.area_option {
  position: fixed;
  left: 0rem;
  right: 0rem;
  bottom: 0rem;
  background: #ccc;
}
.van-button--normal,
.submit_btn {
  width: 100%;
  padding: 0px;
  height: 2.1875rem;
  line-height: 2.1875rem;
  border-radius: 0.1875rem;
}
.van-button--normal,
.submit_btn span {
  font-size: 0.75rem;
}
.IDcard_upload {
  justify-content: space-between;
}
.IDcard {
  margin: 0rem !important;
  width: 47%;
  height: 5.3rem;
  box-shadow: 0rem 0rem 0.3125rem #ccc;
  justify-content: center;
}
.IDcard img {
  width: 90%;
}
.IDcard:nth-child(1) {
  margin-right: 0.5rem !important;
}
.IDcard .IDcardimg {
  width: 100%;
  height: 100%;
}
.showOption {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>