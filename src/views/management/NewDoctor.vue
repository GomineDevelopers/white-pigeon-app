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
        <van-row class="icon_right flex_align_center flex">
          <span class="flex_1">
            <van-field v-model="hospitalValue" placeholder="请输入" @input="hospitalShow = true" />
          </span>
          <van-icon name="arrow" @click="hospitalShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">
          科室
          <i>*</i>
        </van-row>
        <van-row class="icon_right flex_align_center flex">
          <span class="flex_1">
            <van-field v-model="dutyValue" placeholder="请输入" @input="dutyShow = true" />
          </span>
          <van-icon name="arrow" @click="dutyShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">
          性别
          <i>*</i>
        </van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{ sexValue ? sexValue : "请选择" }}</span>
          <van-icon name="arrow" @click="sexShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">
          客户状态
          <i>*</i>
        </van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{ customerStatus ? customerStatus : "请选择" }}</span>
          <van-icon name="arrow" @click="customerStatusShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">
          职务
          <i>*</i>
        </van-row>
        <van-row class="icon_right flex_align_center flex">
          <!-- <span class="flex_1">{{ officeValue ? officeValue : "请选择" }}</span> -->
          <span class="flex_1">
            <van-field v-model="officeValue" placeholder="请输入" @input="officeShow = true" />
          </span>
          <van-icon name="arrow" @click="officeShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">学历</van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{ educationValue ? educationValue : "请选择" }}</span>
          <van-icon name="arrow" @click="educationShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">专业人士分类</van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{ professionValue ? professionValue : "请选择" }}</span>
          <van-icon name="arrow" @click="professionShow = true" />
        </van-row>
      </van-row>
      <van-row class="info_module">
        <van-row class="row_title">学术头衔</van-row>
        <van-row class="icon_right flex">
          <span class="flex_1">{{ academicValue ? academicValue : "请选择" }}</span>
          <van-icon name="arrow" @click="academicShow = true" />
        </van-row>
      </van-row>
      <van-row class="public_btn" @click="create">
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
            :columns="filterHospital"
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
            :columns="filterDutyList"
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
    <!-- 客户状态选择 -->
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
            :columns="filterOffice"
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
            title="专业人士分类选择"
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
      hospitalId: "", //医院id
      hospitalList: [],
      dutyValue: "",
      dutyId: "",
      dutyShow: false,
      dutyList: [],
      sexValue: "",
      sexId: "",
      sexShow: false,
      sexList: [
        { id: 1, text: "男" },
        { id: 2, text: "女" },
        { id: 3, text: "保密" }
      ],
      customerStatus: "",
      customerStatusId: "",
      customerStatusShow: false,
      customerStatusList: [
        { id: 1, text: "在职" },
        { id: 2, text: "离职" }
      ],
      officeValue: "",
      officeId: "",
      officeShow: false,
      officeList: [
        { id: "1", text: "病区副护士长" },
        { id: "2", text: "病区护士长" },
        { id: "3", text: "采购" },
        { id: "4", text: "处长" },
        { id: "5", text: "床位医生" },
        { id: "6", text: "带组医生" },
        { id: "7", text: "负责人" },
        { id: "8", text: "副处长" },
        { id: "9", text: "副局长" },
        { id: "10", text: "副科长" },
        { id: "11", text: "副书记" },
        { id: "12", text: "副所长" },
        { id: "13", text: "副院长" },
        { id: "14", text: "副站长" },
        { id: "15", text: "副主任" },
        { id: "16", text: "进修护士" },
        { id: "17", text: "进修医生" },
        { id: "18", text: "局长" },
        { id: "19", text: "科副护士长" },
        { id: "20", text: "科护士长" },
        { id: "21", text: "科长" },
        { id: "22", text: "库管" },
        { id: "23", text: "秘书" },
        { id: "24", text: "普通职员" },
        { id: "25", text: "书记" },
        { id: "26", text: "所长" },
        { id: "27", text: "院长" },
        { id: "28", text: "院长助理" },
        { id: "29", text: "站长" },
        { id: "30", text: "主管" },
        { id: "31", text: "主任" },
        { id: "32", text: "主任助理" },
        { id: "33", text: "助教" },
        { id: "34", text: "助理" },
        { id: "35", text: "住院部医生" },
        { id: "36", text: "住院部医师" },
        { id: "37", text: "组长" },
        { id: "38", text: "未知" }
      ],
      educationValue: "",
      educationId: "",
      educationShow: false,
      educationList: [
        { id: 1, text: "学士/大学本科" },
        { id: 5, text: "硕士" },
        { id: 3, text: "博士" },
        { id: 6, text: "高中" },
        { id: 4, text: "初中级以下" },
        { id: 7, text: "中专" },
        { id: 2, text: "大专" },
        { id: 8, text: "其他" }
      ],
      professionValue: "",
      professionId: "",
      professionShow: false,
      // 1-护师（士）2-技师（士）3-检验师（士）4-其他卫生技术人员 5-药剂师（士）6-执业医师
      professionList: [
        { id: 1, text: "护师（士）" },
        { id: 2, text: "技师（士）" },
        { id: 3, text: "检验师（士）" },
        { id: 4, text: "药剂师" },
        { id: 5, text: "执业医师" },
        { id: 6, text: "其他卫生技术人员" }
      ],
      academicValue: "",
      academicId: "",
      academicShow: false,
      // 1-副教授 2-副研究员 3-讲师 4-教授 5-无学术职称 6-研究院 7-助教 8-未知
      academicList: [
        { id: 1, text: "副教授" },
        { id: 2, text: "副研究员" },
        { id: 3, text: "讲师" },
        { id: 4, text: "教授" },
        { id: 5, text: "无学术职称" },
        { id: 6, text: "研究院" },
        { id: 7, text: "助教" },
        { id: 8, text: "未知" }
      ]
    };
  },
  //过滤
  computed: {
    //医院搜索filter过滤筛选
    filterHospital() {
      if (this.hospitalValue == "") {
        return this.hospitalList;
      } else {
        return this.hospitalList.filter(value => {
          return value.text.match(this.hospitalValue);
        });
      }
    },

    //科室过滤
    filterDutyList() {
      if (this.dutyValue == "") {
        return this.dutyList;
      } else {
        return this.dutyList.filter(value => {
          return value.text.match(this.dutyValue);
        });
      }
    },

    //职务过滤
    filterOffice() {
      if (this.officeValue == "") {
        return this.officeList;
      } else {
        return this.officeList.filter(value => {
          return value.text.match(this.officeValue);
        });
      }
    }
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
    this.gethospitalList();
    this.getSection();
  },
  methods: {
    onBack() {
      history.back();
    },
    //获取医院列表
    gethospitalList() {
      this.$api
        .hospitalGethospitalId()
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            res.hospital_id_list.forEach(value => {
              this.hospitalList.push({
                text: value.hospital_name,
                id: value.hospital_id
              });
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取科室
    getSection() {
      this.$api
        .hospitalGetSection()
        .then(res => {
          // console.log("科室信息", res);
          if (res.code == 200) {
            res.section_list.forEach(value => {
              this.dutyList.push({
                text: value.section_name,
                id: value.section_id
              });
            });
            // console.log(this.dutyList);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    hospitalConfirm(value) {
      this.hospitalShow = false;
      this.hospitalValue = value.text;
      this.hospitalId = value.id;
    },
    dutyConfirm(value) {
      this.dutyShow = false;
      this.dutyValue = value.text;
      this.dutyId = value.id;
    },
    sexConfirm(value) {
      this.sexValue = value.text;
      this.sexId = value.id;
      this.sexShow = false;
    },
    statusConfirm(value) {
      this.customerStatusShow = false;
      this.customerStatus = value.text;
      this.customerStatusId = value.id;
    },
    officeConfirm(value) {
      this.officeValue = value.text;
      this.officeId = value.id;
      this.officeShow = false;
    },
    educationConfirm(value) {
      this.educationValue = value.text;
      this.educationId = value.id;
      this.educationShow = false;
    },
    professionConfirm(value) {
      this.professionValue = value.text;
      this.professionId = value.id;
      this.professionShow = false;
    },
    academicConfirm(value) {
      this.academicValue = value.text;
      this.academicId = value.id;
      this.academicShow = false;
    },

    //创建
    create() {
      if (
        this.doctorName == "" ||
        this.hospitalId == "" ||
        this.dutyId == "" ||
        this.sexId == "" ||
        this.customerStatusId == "" ||
        this.officeId == ""
      ) {
        this.$toast.fail("请填写完整必填信息");
        return false;
      }
      // console.log("this.doctorName", this.doctorName);
      // console.log("this.hospitalId", this.hospitalId, this.hospitalValue);
      // console.log("this.dutyId", this.dutyId, this.dutyValue);
      // console.log("this.sexId", this.sexId, this.sexValue);
      // console.log("this.customerStatusId", this.customerStatusId, this.customerStatus);
      // console.log("this.officeId", this.officeId, this.officeValue);
      this.$toast.loading({
        message: "创建中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner"
      });
      let postData = {
        doctor_name: this.doctorName,
        hospital_id: this.hospitalId,
        section_id: this.dutyId,
        sex: this.sexId,
        doctor_status: this.customerStatusId,
        duty: this.officeId,
        educate: this.educationId,
        doctor_type: this.professionId,
        academic_title: this.academicId
      };
      this.$api
        .createDoctor(postData)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$toast.success("创建成功");
            setTimeout(() => {
              this.$router.push({ path: "/doctormanagement" });
            }, 2000);
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
.info_module .van-cell {
  padding: 0.18rem 0rem 0rem 0rem;
  font-size: 0.625rem;
}
.info_module .van-field__control {
  color: #77787b !important;
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
  color: #77787b;
  font-size: 0.625rem;
}
.icon_right {
  font-size: 0.625rem;
  color: #a8aec1;
  margin: 0.25rem 0rem;
}
</style>
