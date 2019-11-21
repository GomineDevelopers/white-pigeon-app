<template>
  <van-row class="productapply">
    <van-row class="top_nav border_bom">
      <van-col
        :class="index === navActive ? 'active':''"
        span="6"
        v-for="(navItem,index) in navList"
        :key="index+'a'"
        @click="navHandle(index,navItem.status)"
      >
        <van-row>{{navItem.num}}</van-row>
        <van-row>{{navItem.name}}</van-row>
      </van-col>
    </van-row>
    <van-row class="main_body3">
      <apply-module :data="approveList"></apply-module>
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
      navList: [
        { name: "全部", num: "52", status: "all" },
        { name: "审核中", num: "34", status: "approveing" },
        { name: "未通过", num: "4", status: "notPass" },
        { name: "已通过", num: "36", status: "pass" }
      ],
      approveList: null,
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
      ],
      //审核中
      approveingList: [
        {
          title: "产品XXXX",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "approveing"
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
          hospitalName: "复旦大学附属眼耳鼻喉科医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "approveing"
        }
      ],
      //未通过
      notPassList: [
        {
          title: "产品XXXX",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "notPass"
        },
        {
          title: "产品XXXX",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "notPass"
        },
        {
          title: "产品XXXX",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "notPass"
        },
        {
          title: "产品XXXX",
          hospitalName: "上海长海医院",
          sales: "产品1 - 3321/月",
          approveDate: "2019.10.15 15:32:32",
          approveState: "notPass"
        }
      ],
      //已通过
      passList: [
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
          approveState: "pass"
        },
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
          approveState: "pass"
        }
      ]
    };
  },
  mounted() {
    this.approveList = this.approveAllList;
  },
  methods: {
    navHandle(index, status) {
      this.navActive = index;
      console.log(status);
      switch (status) {
        case "all":
          this.approveList = this.approveAllList;
          break;
        case "approveing":
          this.approveList = this.approveingList;
          break;
        case "notPass":
          this.approveList = this.notPassList;
          break;
        case "pass":
          this.approveList = this.passList;
          break;
        default:
          break;
      }
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
  padding: 0.5rem 1rem 1.25rem 1rem;
  text-align: left;
  height: 70vh;
  overflow-y: auto;
}
.top_nav {
  font-size: 0.6875rem;
  padding: 0.9375rem 0rem 0.4375rem 0rem;
}
.top_nav .van-col {
  text-align: center;
}
.top_nav .active {
  color: #3399ff;
}
</style>