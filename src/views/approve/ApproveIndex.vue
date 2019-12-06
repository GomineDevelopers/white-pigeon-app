<template>
  <van-row class="approve">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar v-if="role == 2" title="审批" left-arrow @click-left="onBack()" />
      <van-nav-bar v-if="role == 1" title="经理审批" left-arrow @click-left="logOut()" />
    </van-row>
    <van-row class="tabs flex">
      <van-row class="approve_nav flex">
        <span :class="active == 0 ? 'active' : ''" @click="switchOption">产品</span>
        <span :class="active == 1 ? 'active' : ''" @click="switchOption">医生</span>
      </van-row>
    </van-row>
    <van-list
      class="approve_list manager_approve"
      v-show="active == 0"
      v-model="proLoading"
      :finished="proFinished"
      finished-text="无更多的产品申请"
      @load="getProductData"
    >
      <div
        class="approve_item flex justify_between"
        v-for="(item, index) in productList"
        :key="index + 'a'"
        @click="getDetail(item.id)"
      >
        <div class="approve_item_detail">
          <ul>
            <li>{{ item.name }}提交的产品申请</li>
            <li class="flex justify_start">
              <span>医院名：</span>
              <span>{{ item.hospital_name }}</span>
            </li>
            <li class="flex justify_start">
              <span>承诺销量：</span>
              <span>{{ item.product_name }} {{ item.promise_sales }}/月</span>
            </li>
            <li class="flex justify_start">
              <span>申请时间：</span>
              <span>{{ item.create_time }}</span>
            </li>
          </ul>
        </div>
        <div class="approve_state flex">
          <img v-if="item.status == 3" src="@/assets/image/approve.png" />
          <img v-if="item.status == 1" src="@/assets/image/approve_pass.png" />
          <img v-if="item.status == 2" src="@/assets/image/approve_no.png" />
        </div>
      </div>
    </van-list>
    <van-list
      class="approve_list manager_approve"
      v-show="active == 1"
      v-model="docLoading"
      :finished="docFinished"
      finished-text="无更多医生需要审核"
      @load="getHospitalData"
    >
      <div
        class="approve_item flex justify_between"
        v-for="(item, index) in hospitalList"
        :key="index + 'b'"
        @click="getDoctorDetail(item.doctor_id)"
      >
        <div class="approve_item_detail">
          <ul>
            <li>{{ item.user_name }}提交的医生申请</li>
            <li class="flex justify_start">
              <span>医院名：</span>
              <span>{{ item.hospital_name }}</span>
            </li>
            <li class="flex justify_start">
              <span>医生：</span>
              <span>{{ item.doctor_name }}</span>
            </li>
            <li class="flex justify_start">
              <span>申请时间：</span>
              <span>{{ item.create_time }}</span>
            </li>
          </ul>
        </div>
        <div class="approve_state flex">
          <img v-if="item.status == 3" src="@/assets/image/approve.png" />
          <img v-if="item.status == 1" src="@/assets/image/approve_pass.png" />
          <img v-if="item.status == 2" src="@/assets/image/approve_no.png" />
        </div>
      </div>
    </van-list>
  </van-row>
</template>
<script>
export default {
  name: "approveindex",
  data() {
    return {
      role: "", //角色
      active: 0, //选项状态 0: 产品， 1: 医生
      proLoading: false, //产品数据是否继续加载
      docLoading: false, //产品数据是否继续加载
      proFinished: false, //产品数据是否加载完成
      docFinished: false, //医生数据是否加载完成
      proPage: 1, //产品页
      docPage: 1, //医生页
      row: 10,
      productList: [], //产品审批数据
      hospitalList: [] //医生审批数据
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
    let active = this.$route.query.active;
    active ? (this.active = active) : (this.active = 0);
    this.role = localStorage.getItem("role");
  },
  methods: {
    // 获取产品审批数据
    getProductData() {
      this.$api
        .regionApprove({
          page: this.proPage,
          row: this.row
        })
        .then(res => {
          switch (res.code) {
            case 200:
              let list = res.regional_hospital_product_list;
              this.productList = this.productList.concat(list);

              if (list.length === this.row) {
                this.proPage += 1;
                this.proLoading = false;
              } else {
                this.proLoading = false;
                this.proFinished = true;
              }
              break;
            case 9002:
              this.proLoading = false;
              this.proFinished = true;
              break;
            case 101:
              this.$dialog
                .alert({
                  message: res.message
                })
                .then(() => {
                  this.$router.push("/loginpassword");
                });
              break;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取医生审批数据
    getHospitalData() {
      // console.log("医生");
      this.$api
        .regionDoctorList({
          page: this.docPage,
          row: this.row
        })
        .then(res => {
          switch (res.code) {
            case 200:
              let list = res.check_hospital_list;
              this.hospitalList = this.hospitalList.concat(list);

              if (list.length === this.row) {
                this.docPage += 1;
                this.docLoading = false;
              } else {
                this.docLoading = false;
                this.docFinished = true;
              }
              break;
            case 9000:
              this.docLoading = false;
              this.docFinished = true;
              break;
            case 101:
              this.$dialog
                .alert({
                  message: res.message
                })
                .then(() => {
                  this.$router.push("/loginpassword");
                });
              break;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onBack() {
      history.back();
    },
    //退出登录
    logOut() {
      this.$Dialog
        .confirm({
          message: "退出登录？",
          confirmButtonText: "确定", //改变确认按钮上显示的文字
          cancelButtonText: "取消" //改变取消按钮上显示的文字
        })
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          this.$router.push({ path: "/loginpassword" });
          console.log("退出登录");
        })
        .catch(() => {
          console.log("取消退出登录！");
        });
    },
    // 切换产品和医生选项
    switchOption() {
      let _this = this;
      let scrollOffset =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (_this.active == 0) {
        _this.active = 1;
        this.productOffset = scrollOffset;
        if (!_this.hospitalList.length) {
          _this.getHospitalData();
          return;
        }
        setTimeout(() => {
          window.scrollTo(0, _this.hospitalOffset);
        }, 100);
      } else {
        _this.active = 0;
        _this.hospitalOffset = scrollOffset;
        if (!_this.productList.length) {
          _this.getProductData();
          return;
        }
        setTimeout(() => {
          window.scrollTo(0, _this.productOffset);
        }, 100);
      }
    },
    getDetail(id) {
      this.$router.push({ path: "/hospitalapprove", query: { id: id } });
    },
    getDoctorDetail(id) {
      this.$router.push({ path: "/doctorapprove", query: { id: id } });
    }
  },
  watch: {}
};
</script>
<style>
.manager_approve {
  padding-top: 120px;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
}
</style>
<style scoped>
.tabs {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 999;
  padding-top: 20px;
  padding-bottom: 10px;
  background: #fff;
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
.approve_content {
  margin-top: 0.3125rem;
  overflow: auto;
  /* height: 23.875rem; */
  height: 80vh;
}
.approve_item {
  border-bottom: 1px solid #ecf1f8;
  padding: 0.4375rem 0rem 0.1875rem 0rem;
}
.approve_item_detail {
  width: 80%;
  text-align: left;
}
.approve_item_detail ul li span:nth-child(1) {
  /* width: 3.75rem; */
  white-space: nowrap;
}
.approve_item_detail ul li {
  padding: 0.125rem 0px;
}
.approve_item_detail ul li:nth-child(1) {
  font-size: 0.75rem;
  /* font-weight: bold; */
}
.approve_item_detail ul li span {
  font-size: 0.625rem;
  color: #a8aec1;
}
.approve_state {
  align-items: center;
  justify-content: center;
}
.approve_state img {
  width: 2.8125rem;
  height: 2.1875rem;
}
</style>
