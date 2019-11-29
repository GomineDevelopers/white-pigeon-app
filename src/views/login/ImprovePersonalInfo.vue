<template>
  <van-row class="improvepersonalinfo">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="完善信息" />
    </van-row>
    <van-row class="main_body">
      <!--<van-row class="info_module">
        <van-row>所属城市</van-row>
        <van-row class="icon_right flex"  @click="areaListShow = true">
          <span>{{ areaValue ? areaValue : "请选择业务所属省市" }}</span>
          <van-icon name="arrow" />
        </van-row>
      </van-row>-->
      <van-row class="info_module">
        <van-row>姓名</van-row>
        <van-row>
          <van-field v-model="userName" placeholder="请输入姓名" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row>身份证号</van-row>
        <van-row>
          <van-field v-model="IDnumber" maxlength="18" placeholder="请输入身份证号号码" />
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
        <van-row class="icon_right flex" @click="IDdateShow = true">
          <span>{{ IDdateValue ? IDdateValue : "请选择身份证有效期" }}</span>
          <van-icon name="arrow" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row>身份证照片</van-row>
        <van-row class="IDcard_upload flex">
          <van-uploader class="IDcard flex flex_align_center" :after-read="IDcardFront">
            <img :src="IDcardurl1" class="IDcardimg" v-show="IDcardurl1" />
            <img src="../../assets/image/idcard1.png" v-show="!IDcardurl1" />
          </van-uploader>
          <van-uploader class="IDcard flex flex_align_center" :after-read="IDcardReverse">
            <img :src="IDcardurl2" class="IDcardimg" v-show="IDcardurl2" />
            <img src="../../assets/image/idcard2.png" v-show="!IDcardurl2" />
          </van-uploader>
        </van-row>
      </van-row>
      <van-row class="submit_btn" @click="submitInfo">
        <van-button type="info">提&nbsp;交</van-button>
      </van-row>
    </van-row>
    <!-- 省市区选择 -->
    <!-- 上滑进入 -->
    <!--<transition name="van-slide-up">
      <van-row class="area_option" v-show="areaListShow">
        <van-area :area-list="areaList" @confirm="areaConfirmFn" @cancel="areaListShow = false" />
      </van-row>
    </transition>-->

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
  </van-row>
</template>
<script>
// import AreaList from "@/js/area";
import { upload } from "@/js/upload";

export default {
  name: "improvepersonalinfo",
  data() {
    return {
      // areaList: AreaList, // 指定数据源
      // areaListShow: false,
      // areaValue: "",
      IDdateShow: false,
      currentDate: new Date(),
      IDcardFlag: null,
      userName: "",
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
      // 设置系统状态栏背景为蓝色
      plus.navigator.setStatusBarBackground("#2A76FF");
      plus.navigator.setStatusBarStyle("light");
    }
    if (window.plus) {
      plusReady();
    } else {
      document.addEventListener("plusready", plusReady, false);
    }
  },
  methods: {
    //地区选择确认
    // areaConfirmFn(event) {
    //   this.show = false;
    //   let arr, SelectProvinceName, SelectCityName, SelectCountyName;
    //   arr = event;
    //   SelectProvinceName = arr[0].name; // 省
    //   SelectCityName = arr[1].name; // 市
    //   SelectCountyName = arr[2].name; // 区
    //   this.areaValue =
    //     SelectProvinceName + " / " + SelectCityName + " / " + SelectCountyName;
    //   this.areaListShow = false;
    //   console.log(
    //     "点击了确定按钮",
    //     SelectProvinceName,
    //     SelectCityName,
    //     SelectCountyName
    //   );
    // },

    //日期选择确定
    dateConfirmFn(event) {
      this.IDdateValue = this.timeFormat(event);
      this.IDdateShow = false;
    },
    // 上传身份证正面
    IDcardFront(file) {
      upload(file, 0).then(res => {
        this.IDcardurl1 = res;
      });
    },
    // 上传身份证反面
    IDcardReverse(file) {
      upload(file, 0).then(res => {
        this.IDcardurl2 = res;
      });
    },

    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day;
    },
    // 提交数据
    submitInfo() {
      let _this = this;
      if (!_this.userName) {
        _this.$notify("姓名不能为空");
        return;
      } else if (!_this.IDnumber) {
        _this.$notify("身份证号不能为空");
        return;
      } else if (_this.IDnumber.length < 18) {
        _this.$notify("身份证号位数错误");
        return;
      } else if (!_this.IDaddress) {
        _this.$notify("证件地址不能为空");
        return;
      } else if (!_this.IDdateValue) {
        _this.$notify("证件有效期不能为空");
        return;
      } else if (!_this.IDcardurl1) {
        _this.$notify("身份证人像面不能为空");
        return;
      } else if (!_this.IDcardurl2) {
        _this.$notify("身份证国徽面不能为空");
        return;
      }
      let data = {
        username: _this.userName,
        idcard: _this.IDnumber,
        id_address: _this.IDaddress,
        id_effect_time: _this.IDdateValue,
        id_front_img: _this.IDcardurl1,
        id_back_img: _this.IDcardurl2
      };
      _this.$dialog
        .confirm({
          message: "请确定您填写的姓名与注册 手机号姓名一致。",
          confirmButtonText: "确认", //改变确认按钮上显示的文字
          cancelButtonText: "修改" //改变取消按钮上显示的文字
        })
        .then(() => {
          _this.addData(data);
        })
        .catch(() => {
          console.log("返回修改信息！");
        });
    },
    addData(data) {
      let _this = this;
      _this.$api
        .completeUserInfo(data)
        .then(res => {
          if (res.code === 200) {
            _this.$toast.success(res.message);
            _this.$router.push({ path: "/" });
          } else {
            _this.$toast.fail(res.message);
          }
        })
        .catch(err => {
          _this.$toast.fail(res.message);
        });
    }
  }
};
</script>
<style>
.IDcard .van-uploader__wrapper {
  height: 100%;
}
</style>
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
  overflow: hidden;
}
.IDcard img {
  width: 100%;
}
.IDcard:nth-child(1) {
  margin-right: 0.5rem !important;
}
.IDcard .IDcardimg {
  width: 100%;
  height: 100%;
}
</style>
