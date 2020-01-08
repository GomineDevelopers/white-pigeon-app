<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <!-- <van-nav-bar
        title="会议记录"
        left-arrow
        @click-left="onBack()"
        @click-right="mettingOptionNav = !mettingOptionNav"
      >
        <van-icon name="ellipsis" class="add_icon" slot="right" />
      </van-nav-bar> -->
      <van-nav-bar title="会议记录" left-arrow @click-left="onBack()" @click-right="newMetting">
        <van-icon class="add_icon" name="add" slot="right" />
      </van-nav-bar>
    </van-row>
    <!-- 点击右上角展示操作菜单开始 -->
    <!-- <transition name="van-slide-right">
      <van-row class="optionNav" v-show="mettingOptionNav">
        <van-row class="optionnav_content">
          <van-row class="optionNavItem">
            <span class="flex flex_align_center" @click="mettingFiltrate = true">
              <van-icon name="filter-o" />筛选
            </span>
          </van-row>
          <van-row class="optionNavItem">
            <span class="flex flex_align_center" @click="newMetting">
              <van-icon name="plus" />新建
            </span>
          </van-row>
        </van-row>
      </van-row>
    </transition> -->
    <!-- 点击右上角展示操作菜单结束 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-row class="metting_data_total top_nav border_bom">
        <van-row class="top_nav_list">
          <van-col
            :class="index === navActive ? 'active' : ''"
            v-for="(navItem, index) in navList"
            :key="index + 'a'"
            @click="navHandle(index, navItem.status)"
          >
            <van-row>{{ navItem.num }}</van-row>
            <van-row>{{ navItem.name }}</van-row>
          </van-col>
        </van-row>
      </van-row>
      <van-row class="metting_body">
        <metting-record-list :status="status" :productId="productId"></metting-record-list>
      </van-row>
    </van-pull-refresh>
    <!-- 会议产品筛选 -->
    <transition name="van-slide-up">
      <van-popup v-model="mettingFiltrate" position="bottom">
        <van-row>
          <van-picker
            show-toolbar
            title="产品筛选"
            :default-index="productDefaultIndex"
            :columns="productList"
            @cancel="
              mettingFiltrate = false;
              mettingOptionNav = false;
            "
            @confirm="productConfirm"
          />
        </van-row>
      </van-popup>
    </transition>
  </van-row>
</template>
<script>
import mettingrecordlist from "@/views/components/MettingRecordList";
export default {
  name: "visitrecord",
  inject: ["reload"], //刷新页面
  components: {
    "metting-record-list": mettingrecordlist
  },
  data() {
    return {
      productDefaultIndex: 0, //产品选中
      isLoading: false,
      mettingUserNum: "-",
      mettingNum: "-",
      mettingFiltrate: false,
      mettingOptionNav: false,
      prodectName: "",
      productId: null,
      productList: [
        // { id: 0, text: value.product_name }
      ],
      navActive: 0,
      status: 7,
      navList: [
        { name: "全部", num: "-", status: 7 },
        { name: "合格", num: "-", status: 1 },
        { name: "不合格", num: "-", status: 2 },
        { name: "已核销", num: "-", status: 4 },
        { name: "已失效", num: "-", status: 5 }
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

    this.getMetting();
  },
  methods: {
    onBack() {
      this.$router.push("/");
    },
    navHandle(index, status) {
      this.navActive = index;
      this.status = status;
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.reload(); //刷新当前页面，加载新数据
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    //获取会议统计
    getMetting() {
      //会议统计
      this.$api
        .meetingApplyRecord()
        .then(res => {
          console.log("会议统计", res);
          if (res.code == 200) {
            this.navList[0].num = res.apply_record_num;
            this.navList[1].num = res.pass_apply_record_num;
            this.navList[2].num = res.refuse_apply_record_num;
            this.navList[3].num = res.charge_off_apply_record_num;
            this.navList[4].num = res.failure_apply_record_num;
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });

      //产品
      this.$api
        .meetingGetProductList()
        .then(res => {
          // console.log("产品列表", res);
          if (res.code == 200) {
            res.product_list.forEach(value => {
              this.productList.push({ id: value.id, text: value.product_name });
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    productConfirm(value) {
      this.mettingFiltrate = false;
      this.mettingOptionNav = false;
      this.prodectName = value.text;
      this.productId = value.id;

      //筛选数据初始化
      this.mettingList = [];
      this.page = 1;
      this.finished = false;
    },
    newMetting() {
      this.$api
        .userInfo()
        .then(res => {
          //判断用户银行卡信息是否完善
          if (
            res.user.account_name == null ||
            res.user.card_no == null ||
            res.user.open_bank == null
          ) {
            //银行卡信息不完善跳转银行卡完善信息页
            this.$Dialog
              .confirm({
                message: "请先完善银行卡信息！",
                confirmButtonText: "前往",
                cancelButtonText: "取消"
              })
              .then(() => {
                this.$router.push({
                  path: "/bankcard",
                  query: {
                    redirect: this.$router.currentRoute.fullPath
                  }
                });
              })
              .catch(() => {
                console.log("取消完善银行卡信息！");
              });
          } else {
            this.$router.push({ path: "/newMetting" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.add_icon {
  font-size: 1.2rem;
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
}
.optionNavItem .van-icon {
  margin-right: 0.3125rem;
  font-size: 0.8rem;
  font-weight: bold;
}
.metting_data_total {
  margin-top: 2rem;
  padding: 0.6rem 0rem;
  border: 1px solid #eee;
}
.metting_data_total .van-col {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
}
.metting_data_total .van-col span:nth-child(2) {
  color: #000;
}
.metting_body {
  padding: 0rem 1rem 1rem 1rem;
  text-align: left;
  min-height: 60vh;
}
.top_nav {
  font-size: 0.75rem;
  padding: 0.5rem 0rem 0.3rem 0rem;
}
.top_nav .top_nav_list {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
}
.top_nav .van-col {
  text-align: center;
  width: 20%;
}
.top_nav .active {
  color: #3399ff;
}
</style>
