<template>
  <van-row class="approve">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="审批" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body height_auto">
      <van-row class="approve_nav flex">
        <span :class="active ? 'active':''" @click="switchOption">全部</span>
        <span :class="active ? '':'active'" @click="switchOption">待审批</span>
      </van-row>
      <van-row class="approve_content">
        <div class="approve_list" v-show="active">
          <div
            class="approve_item flex justify_between"
            v-for="(item,index) in approveList"
            :key="index+'a'"
            @click="getDetail"
          >
            <div class="approve_item_detail">
              <ul>
                <li>{{item.title}}</li>
                <li class="flex justify_start">
                  <span>医院名：</span>
                  <span>{{item.hospitalName}}</span>
                </li>
                <li class="flex justify_start">
                  <span>承诺销量：</span>
                  <span>{{item.sales}}</span>
                </li>
                <li class="flex justify_start">
                  <span>申请时间：</span>
                  <span>{{item.approveDate}}</span>
                </li>
              </ul>
            </div>
            <div class="approve_state flex">
              <img v-if="item.approveState == 'await'" src="@/assets/image/approve.png" />
              <img v-if="item.approveState == 'succeed'" src="@/assets/image/approve_pass.png" />
              <img v-if="item.approveState == 'notPass'" src="@/assets/image/approve_no.png" />
            </div>
          </div>
        </div>
        <div class="approve_list" v-show="!active">
          <div
            class="approve_item flex justify_between"
            v-for="(item,index) in awaitApproveList"
            :key="index+'b'"
            @click="getDetail"
          >
            <div class="approve_item_detail">
              <ul>
                <li>{{item.title}}</li>
                <li class="flex justify_start">
                  <span>医院名：</span>
                  <span>{{item.hospitalName}}</span>
                </li>
                <li class="flex justify_start">
                  <span>承诺销量：</span>
                  <span>{{item.sales}}</span>
                </li>
                <li class="flex justify_start">
                  <span>申请时间：</span>
                  <span>{{item.approveDate}}</span>
                </li>
              </ul>
            </div>
            <div class="approve_state flex">
              <img v-if="item.approveState == 'await'" src="@/assets/image/approve.png" />
              <img v-if="item.approveState == 'succeed'" src="@/assets/image/approve_pass.png" />
              <img v-if="item.approveState == 'notPass'" src="@/assets/image/approve_no.png" />
            </div>
          </div>
        </div>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "approveindex",
  data() {
    return {
      active: true,
      //全部审批
      approveList: [
        {
          title: "XXXX提交的产品申请",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "succeed"
        },
        {
          title: "XXXX提交的医生申请",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "await"
        },
        {
          title: "XXXX提交的产品申请",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "notPass"
        },
        {
          title: "XXXX提交的医生申请",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "await"
        },
        {
          title: "XXXX提交的产品申请",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "notPass"
        },
        {
          title: "XXXX提交的医生申请",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "await"
        }
      ],
      //待审批
      awaitApproveList: [
        {
          title: "XXXX提交的产品申请",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "await"
        },
        {
          title: "XXXX提交的医生申请",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "await"
        },
        {
          title: "XXXX提交的产品申请",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "await"
        },
        {
          title: "XXXX提交的医生申请",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "await"
        },
        {
          title: "XXXX提交的医生申请",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "await"
        },
        {
          title: "XXXX提交的医生申请",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "await"
        }
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
    switchOption() {
      this.active = !this.active;
    },
    getDetail() {
      this.$router.push({ path: "/hospitalapprove" });
    }
  }
};
</script>
<style scoped>
.main_body {
  height: 85vh;
  overflow: hidden;
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