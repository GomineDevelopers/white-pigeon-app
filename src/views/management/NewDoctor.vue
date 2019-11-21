<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="新建医生" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body new_doctor">
      <van-row class="info_module">
        <van-row class="row_title">
          医生姓名
          <i>*</i>
        </van-row>
        <van-row class="icon_right flex">
          <van-field v-model="doctorName" placeholder="请输入" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">
          所属医院
          <i>*</i>
        </van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{hospitalValue ? hospitalValue:'请选择'}}</span>
          <van-icon name="arrow" @click="hospitalShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">
          科室
          <i>*</i>
        </van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{dutyValue ? dutyValue:'请选择'}}</span>
          <van-icon name="arrow" @click="dutyShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">
          性别
          <i>*</i>
        </van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{sexValue ? sexValue:'请选择'}}</span>
          <van-icon name="arrow" @click="sexShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">
          客户状态
          <i>*</i>
        </van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{customerStatus ? customerStatus:'请选择'}}</span>
          <van-icon name="arrow" @click="customerStatusShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">
          职务
          <i>*</i>
        </van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{officeValue ? officeValue:'请选择'}}</span>
          <van-icon name="arrow" @click="officeShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">学历</van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{educationValue ? educationValue:'请选择'}}</span>
          <van-icon name="arrow" @click="educationShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">专业人士分类</van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{professionValue ? professionValue:'请选择'}}</span>
          <van-icon name="arrow" @click="professionShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">学术头衔</van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{academicValue ? academicValue:'请选择'}}</span>
          <van-icon name="arrow" @click="academicShow = true" />
        </van-row>
      </van-row>
      <van-row class="public_btn">
        <button>创&nbsp;建</button>
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
            @confirm="hospitalConfirm"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 科室选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="dutyShow">
          <van-picker
            show-toolbar
            title="科室选择"
            :columns="dutyList"
            @cancel="dutyShow = false"
            @confirm="dutyConfirm"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 性别选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="sexShow">
          <van-picker
            show-toolbar
            title="性别选择"
            :columns="sexList"
            @cancel="sexShow = false"
            @confirm="sexConfirm"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 性别选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="customerStatusShow">
          <van-picker
            show-toolbar
            title="状态选择"
            :columns="customerStatusList"
            @cancel="customerStatusShow = false"
            @confirm="statusConfirm"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 职务选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="officeShow">
          <van-picker
            show-toolbar
            title="职务选择"
            :columns="officeList"
            @cancel="officeShow = false"
            @confirm="officeConfirm"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 学历选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="educationShow">
          <van-picker
            show-toolbar
            title="学历选择"
            :columns="educationList"
            @cancel="educationShow = false"
            @confirm="educationConfirm"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 专业人士选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="professionShow">
          <van-picker
            show-toolbar
            title="专业人士选择"
            :columns="professionList"
            @cancel="professionShow = false"
            @confirm="professionConfirm"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 学术头衔选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="academicShow">
          <van-picker
            show-toolbar
            title="学术头衔选择"
            :columns="academicList"
            @cancel="academicShow = false"
            @confirm="academicConfirm"
          />
        </van-row>
      </transition>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "newdoctor",
  data() {
    return {
      doctorName: "",
      hospitalShow: false,
      hospitalValue: "",
      hospitalList: [
        "上海交通大学医学院附属仁济医院（东院）",
        "上海邮电医院",
        "复旦大学附属中山医院",
        "上海市儿童医院",
        "上海长海医院"
      ],
      dutyValue: "",
      dutyShow: false,
      dutyList: ["骨科", "外科", "内科", "妇科"],
      sexValue: "",
      sexShow: false,
      sexList: ["男", "女"],
      customerStatus: "",
      customerStatusShow: false,
      customerStatusList: ["在职", "离职"],
      officeValue: "",
      officeShow: false,
      officeList: ["院长", "主任医师", "副主任医师", "医师"],
      educationValue: "",
      educationShow: false,
      educationList: ["本科", "硕士", "博士"],
      professionValue: "",
      professionShow: false,
      professionList: ["专家", "专家", "专家"],
      academicValue: "",
      academicShow: false,
      academicList: []
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
    hospitalConfirm(value) {
      this.hospitalValue = value;
      this.hospitalShow = false;
    },
    dutyConfirm(value) {
      this.dutyValue = value;
      this.dutyShow = false;
    },
    sexConfirm(value) {
      this.sexValue = value;
      this.sexShow = false;
    },
    statusConfirm(value) {
      this.customerStatus = value;
      this.customerStatusShow = false;
    },
    officeConfirm(value) {
      this.officeValue = value;
      this.officeShow = false;
    },
    educationConfirm(value) {
      this.educationValue = value;
      this.educationShow = false;
    },
    professionConfirm(value) {
      this.professionValue = value;
      this.professionShow = false;
    },
    academicConfirm(value) {
      this.academicValue = value;
      this.academicShow = false;
    }
  }
};
</script>
<style>
.info_module .van-cell {
  padding: 0.18rem 0rem 0rem 0rem;
  font-size: 0.625rem;
}
.info_module .van-field__control {
  color: #a8aec1 !important;
}
</style>
<style scoped>
.new_doctor {
  text-align: left;
}
.info_module {
  font-size: 0.6875rem;
  text-align: left;
  border-bottom: 1px solid rgba(238, 238, 238);
  margin-bottom: 0.4375rem;
}
.info_module .row_title i {
  font-style: normal;
  color: red;
}
.icon_right span {
  color: #a8aec1;
  font-size: 0.625rem;
}
.icon_right {
  font-size: 0.625rem;
  color: #a8aec1;
  margin: 0.25rem 0rem;
}
</style>