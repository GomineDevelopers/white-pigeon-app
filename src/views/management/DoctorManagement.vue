<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="医生管理" left-arrow @click-left="onBack()" @click-right="newDoctor">
        <van-icon class="add_icon" name="add" slot="right" />
      </van-nav-bar>
    </van-row>
    <van-row class="main_body">
      <van-row class="search_body flex flex_align_center">
        <van-field v-model="value" placeholder="请输入用户名" />
        <span class="filtrate" @click="hospitalShow = true">筛选</span>
        <span class="search_icon flex flex_align_center">
          <van-icon name="search" />
        </span>
      </van-row>
      <van-row class="doctor_list">
        <van-row
          class="doctor_item flex flex_align_center"
          v-for="(list,index) in doctorList"
          :key="index+'do'"
          @click="doctorDetail"
        >
          <van-row class="doctor_item_left flex_1">
            <van-row class="doctor_item_name">
              <span class="doctor_name">{{list.name}}</span>
              <span class="doctor_duty">{{list.duty}}</span>
            </van-row>
            <van-row>
              <span class="doctor_hos">{{list.hospital}}</span>
              <span class="doctor_office">{{list.office}}</span>
            </van-row>
          </van-row>
          <van-row>
            <van-icon name="arrow" class="right_icon" />
          </van-row>
        </van-row>
      </van-row>
    </van-row>
    <!-- 筛选 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="hospitalShow">
          <van-picker
            show-toolbar
            :columns="hospitalList"
            @cancel="hospitalShow = false"
            @confirm="onConfirm"
          />
        </van-row>
      </transition>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "doctormanagement",
  data() {
    return {
      hospitalShow: false,
      value: "",
      doctorList: [
        {
          name: "张豆豆",
          duty: "副主任医师",
          hospital: "北京协和医院",
          office: "骨科"
        },
        {
          name: "漆婷薇",
          duty: "副主任医师",
          hospital: "北京协和医院",
          office: "骨科"
        },
        {
          name: "丛霭",
          duty: "副主任医师",
          hospital: "北京协和医院",
          office: "骨科"
        },
        {
          name: "袁彬",
          duty: "主任医师",
          hospital: "上海长海医院",
          office: "外科"
        }
      ],
      hospitalList: [
        "上海交通大学医学院附属仁济医院（东院）",
        "上海邮电医院",
        "复旦大学附属中山医院",
        "上海市儿童医院",
        "上海长海医院"
      ]
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
    onBack() {
      history.back();
    },
    onConfirm(value) {
      this.value = value;
      this.hospitalShow = false;
      console.log(value);
    },
    newDoctor() {
      this.$router.push({ path: "/newdoctor" });
    },
    doctorDetail() {
      this.$router.push({ path: "/doctordetail" });
    }
  }
};
</script>
<style>
.search_body .van-cell {
  border-radius: 0.25rem 0rem 0rem 0.25rem;
  width: 75%;
  padding-right: 0rem;
  font-size: 0.625rem;
}
.search_body .van-cell:not(:last-child)::after {
  border-bottom: none;
}
</style>
<style scoped>
.search_body {
  width: 100%;
  height: 2rem;
  box-shadow: 0rem 0rem 0.3125rem #ccc;
  border-radius: 0.25rem;
  margin-bottom: 0.625rem;
}
.add_icon {
  font-size: 1rem;
}
.filtrate {
  padding-right: 0.4rem;
  border-right: 1px solid #ccc;
  color: #3399ff;
  font-size: 0.625rem;
}
.search_icon {
  margin-left: 0.4rem;
  color: #3399ff;
}
.search_icon .van-icon {
  font-size: 1rem;
  font-weight: bold;
}
.doctor_list {
  text-align: left;
}
.doctor_item {
  padding: 0.4rem 0rem;
  border-bottom: 1px solid rgba(238, 238, 238);
}
.doctor_item_name {
  margin-bottom: -0.2rem;
}
.doctor_name {
  font-size: 0.75rem;
  color: #000;
  margin-right: 0.3125rem;
}
.doctor_duty {
  font-size: 0.625rem;
  color: #3a4055;
}
.doctor_hos {
  font-size: 0.6875rem;
  margin-right: 0.3125rem;
}
.doctor_office {
  font-size: 0.6875rem;
}
.right_icon {
  color: #c7c7cc;
  font-size: 0.75rem;
}
.showbank {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>