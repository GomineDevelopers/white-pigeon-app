<template>
  <van-row class="productapply">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="开发" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="top_nav border_bom">
      <van-col
        :class="index === navActive ? 'active' : ''"
        span="6"
        v-for="(navItem, index) in navList"
        :key="index + 'a'"
        @click="navHandle(index, navItem.status)"
      >
        <van-row>{{ navItem.num }}</van-row>
        <van-row>{{ navItem.name }}</van-row>
      </van-col>
    </van-row>
    <van-row class="main_body3">
      <apply-module :status="status"></apply-module>
    </van-row>
  </van-row>
</template>
<script>
import applymodule from "@/views/components/ApplyModule";
export default {
  name: "productapply",
  components: {
    "apply-module": applymodule
  },
  data() {
    return {
      navActive: 0,
      status: 4,
      navList: [
        { name: "全部", num: "-", status: 4 },
        { name: "审核中", num: "-", status: 3 },
        { name: "未通过", num: "-", status: 2 },
        { name: "已通过", num: "-", status: 1 }
      ],
      approveList: [],
      //全部审核
      approveAllList: [
        {
          title: "产品XXXX",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "pass"
        },
        {
          title: "产品XXXX",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "approveing"
        },
        {
          title: "产品XXXX",
          hospitalName: "复旦大学附属眼耳鼻喉科医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "notPass"
        },
        {
          title: "产品XXXX",
          hospitalName: "上海市儿童医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "approveing"
        },
        {
          title: "产品XXXX",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "notPass"
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
    this.hospitalApplyRecord();
  },
  methods: {
    onBack() {
      this.$router.push({ path: "/" });
    },
    navHandle(index, status) {
      this.navActive = index;
      this.status = status;
    },
    //获取开发记录各分类条数
    hospitalApplyRecord() {
      this.$api
        .hospitalApplyRecord()
        .then(res => {
          if (res.code == 200) {
            this.navList[0].num = res.apply_record_num;
            this.navList[1].num = res.review_apply_record_num;
            this.navList[2].num = res.refuse_apply_record_num;
            this.navList[3].num = res.pass_apply_record_num;
          } else {
            this.$toast.fail(res.message);
          }
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.productapply {
  margin-top: 2.5rem;
  height: 90vh;
  overflow: hidden;
}
.main_body3 {
  padding: 0rem 1rem 1.25rem 1rem;
  text-align: left;
  height: 80vh;
  overflow-y: auto;
}
.top_nav {
  font-size: 0.6875rem;
  padding: 0.4rem 0rem 0.4rem 0rem;
}
.top_nav .van-col {
  text-align: center;
}
.top_nav .active {
  color: #3399ff;
}
.approve_item {
  border-bottom: 1px solid #ecf1f8;
  padding: 0.4rem 0rem;
}
.approve_item_detail ul li.prodect_name span {
  color: #333;
  font-size: 0.6875rem;
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
