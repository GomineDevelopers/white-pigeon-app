<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar
        title="医生管理"
        left-arrow
        @click-left="onBack()"
        @click-right="moreOptionNav = !moreOptionNav"
      >
        <van-icon name="ellipsis" class="add_icon" slot="right" />
      </van-nav-bar>
    </van-row>
    <!-- 点击右上角展示操作菜单开始 -->
    <transition name="van-slide-right">
      <van-row class="optionNav" v-show="moreOptionNav">
        <van-row class="optionnav_content">
          <van-row class="optionNavItem">
            <span class="flex flex_align_center" @click="newDoctor">
              <van-icon name="plus" />新增医生</span
            >
          </van-row>
          <van-row class="optionNavItem">
            <span class="flex flex_align_center" @click="doctorApplyList">
              <img src="../../assets/image/record_con.png" />
              新增记录
            </span>
          </van-row>
        </van-row>
      </van-row>
    </transition>
    <!-- 点击右上角展示操作菜单结束 -->
    <van-row class="main_body">
      <van-row class="search_body flex flex_align_center">
        <van-field v-model="keyWords" placeholder="请输入医生名" @input="hospitalShow = false" />
        <span class="filtrate" @click="hospitalShow = true">筛选</span>
        <span class="search_icon flex flex_align_center" @click="search">
          <van-icon name="search" />
        </span>
      </van-row>
      <van-row class="doctor_list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getDoctorList"
        >
          <van-row
            class="doctor_item flex flex_align_center"
            v-for="(list, index) in doctorList"
            :key="index + 'do'"
            @click="doctorDetail(list.id)"
          >
            <van-row class="doctor_item_left flex_1">
              <van-row class="doctor_item_name">
                <span class="doctor_name">{{ list.name }}</span>
                <span class="doctor_duty">{{ list.duty }}</span>
              </van-row>
              <van-row class="hospiatl_section">
                <span class="doctor_hos">{{ list.hospital }}</span>
                <span class="doctor_office">{{ list.section }}</span>
              </van-row>
            </van-row>
            <van-row>
              <van-icon name="arrow" class="right_icon" />
            </van-row>
          </van-row>
        </van-list>
      </van-row>
    </van-row>
    <!-- 筛选 -->
    <transition name="van-slide-up">
      <van-popup v-model="hospitalShow" position="bottom">
        <van-row>
          <van-picker
            show-toolbar
            :columns="hospitalList"
            @cancel="hospitalShow = false"
            @confirm="onConfirm"
          />
        </van-row>
      </van-popup>
    </transition>
  </van-row>
</template>
<script>
import { setDoctorDuty } from "../../js/public";
export default {
  name: "doctormanagement",
  data() {
    return {
      moreOptionNav: false,
      hospitalShow: false,
      keyWords: "",
      page: 1,
      row: 6,
      loading: false, //加载
      finished: false, //完成
      doctorList: [
        // {
        //   name: "张豆豆",
        //   duty: "副主任医师",
        //   hospital: "北京协和医院",
        //   section: "骨科"
        // }
      ],
      hospitalList: [
        // "上海交通大学医学院附属仁济医院（东院）",
        // "上海邮电医院",
        // "复旦大学附属中山医院",
        // "上海市儿童医院",
        // "上海长海医院"
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
    this.gethospitalList();
  },
  methods: {
    getDoctorList() {
      console.log("当前页码", this.page);
      let params = {
        doctor_key: this.keyWords,
        page: this.page,
        row: this.row
      };
      setTimeout(() => {
        this.$api
          .doctorList(params)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              if (res.doctor_list.length < this.row) {
                res.doctor_list.forEach(value => {
                  this.doctorList.push({
                    name: value.doctor_name,
                    id: value.id,
                    hospital: value.hospital_name,
                    duty: setDoctorDuty(value.duty),
                    section: value.section_name
                  });
                });
                // 加载状态结束
                this.finished = true;
                this.loading = false;
              } else {
                res.doctor_list.forEach(value => {
                  this.doctorList.push({
                    name: value.doctor_name,
                    id: value.id,
                    hospital: value.hospital_name,
                    duty: setDoctorDuty(value.duty),
                    section: value.section_name
                  });
                });
                this.page++;
                this.loading = false;
              }
            } else {
              // 加载状态结束
              this.loading = false;
              this.finished = true;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }, 500);
    },
    //获取医院列表
    gethospitalList() {
      this.$api
        .hospitalGethospitalId()
        .then(res => {
          if (res.code == 200) {
            res.hospital_id_list.forEach(value => {
              this.hospitalList.push({
                text: value.hospital_name,
                id: value.id
              });
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onBack() {
      this.$router.push("/");
    },
    onConfirm(value) {
      this.keyWords = value.text;
      this.hospitalShow = false;
    },
    search() {
      this.hospitalShow = false;
      this.doctorList = [];
      this.page = 1;
      this.finished = false; //初始化完成状态  @load="getDoctorList" 自动加载
    },
    newDoctor() {
      this.$api
        .userInfo()
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            if (res.user.is_complete != 1) {
              this.$Dialog
                .confirm({
                  message: "请您完善个人信息，再进行开发操作。",
                  confirmButtonText: "前往", //改变确认按钮上显示的文字
                  cancelButtonText: "取消" //改变取消按钮上显示的文字
                })
                .then(() => {
                  this.$router.replace({
                    path: "/improvepersonalinfo",
                    query: {
                      redirect: this.$router.currentRoute.fullPath
                    }
                  }); //去完善信息
                })
                .catch(() => {
                  console.log("取消完善信息！");
                });
            } else {
              this.$router.push({
                path: "/newdoctor"
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
      // this.$router.push({ path: "/newdoctor" });
    },
    doctorDetail(id) {
      console.log("医生id", id);
      this.$router.push({
        path: "/doctordetail",
        query: {
          id: id
        }
      });
    },
    doctorApplyList() {
      this.$router.push({ path: "/doctorapplylist" });
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
.main_body {
  height: 86vh;
  overflow: auto;
}
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
  /* height: 80vh;
  overflow: auto; */
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
.optionNav {
  width: 5rem;
  height: 3.6rem;
  padding: 0.3rem 0rem;
  position: fixed;
  top: 1.8rem;
  right: 0.3rem;
  font-size: 0.75rem;
  background: #fff;
  border-radius: 0.375rem;
  box-shadow: 0rem 0rem 0.3125rem #ccc;
  z-index: 99;
}
.optionnav_content {
  position: relative;
}
.optionNav::after {
  display: block;
  content: "";
  border-width: 8px 8px 8px 8px;
  border-style: solid;
  border-color: transparent transparent #fff transparent;
  position: absolute;
  right: 0.6rem;
  top: -0.65rem;
}
.optionNavItem {
  height: 1.6rem;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
}
.optionNavItem span {
  font-size: 0.625rem;
  color: #333;
}
.optionNavItem span img {
  width: 0.9rem;
  margin-right: 0.3rem;
}
.optionNavItem .van-icon {
  margin-right: 0.3125rem;
  font-size: 0.8rem;
  font-weight: bold;
  color: #3f4459;
}
.hospiatl_section {
  margin-top: 0.3125rem;
  line-height: 0.9rem;
}
</style>
