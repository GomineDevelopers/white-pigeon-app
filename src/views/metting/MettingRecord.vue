<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar
        title="会议记录"
        left-arrow
        @click-left="onBack()"
        @click-right="mettingOptionNav = !mettingOptionNav"
      >
        <van-icon name="ellipsis" class="add_icon" slot="right" />
      </van-nav-bar>
    </van-row>
    <!-- 点击右上角展示操作菜单开始 -->
    <transition name="van-slide-right">
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
    </transition>
    <!-- 点击右上角展示操作菜单结束 -->
    <van-row class="metting_data_total">
      <van-col span="12">
        <span>48</span>
        <span>会议总次数</span>
      </van-col>
      <van-col span="12">
        <span>238</span>
        <span>会议总人数</span>
      </van-col>
    </van-row>
    <van-row class="metting_body">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getMettingList"
      >
        <div
          class="approve_item flex justify_between"
          v-for="(item, index) in mettingList"
          :key="index + 'b'"
          @click="getDetail(item.mettingState)"
        >
          <div class="approve_item_detail">
            <ul>
              <li>
                {{ item.title }}
                -
                <span>{{ item.user }}</span>
              </li>
              <li class="flex justify_start">
                <span>{{ item.prodect }}</span>
              </li>
              <li class="flex justify_start">
                <span>{{ item.mettingDate }}</span>
              </li>
            </ul>
          </div>
          <div class="approve_state flex">
            <img v-if="item.mettingState == 'qualified'" src="@/assets/image/hg.png" />
            <img v-if="item.mettingState == 'noqualified'" src="@/assets/image/bhg.png" />
            <img v-if="item.mettingState == 'auditing'" src="@/assets/image/shz.png" />
            <img v-if="item.mettingState == 'pass'" src="@/assets/image/yhx.png" />
            <img v-if="item.mettingState == 'failure'" src="@/assets/image/ysx.png" />
          </div>
        </div>
      </van-list>
      <!-- <van-row class="more">查看更多</van-row> -->
    </van-row>
    <!-- 会议产品筛选 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row v-show="mettingFiltrate">
          <van-picker
            show-toolbar
            title="产品筛选"
            :columns="productList"
            @cancel="mettingFiltrate = false"
            @confirm="productConfirm"
          />
        </van-row>
      </transition>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "visitrecord",
  data() {
    return {
      mettingFiltrate: false,
      mettingOptionNav: false,
      loading: false, //加载
      finished: false, //完成
      page: 1, //页码
      row: 5, //每页显示条数
      mettingList: [
        // {
        //   title: "主题名称XXXX",
        //   user: "刘某某",
        //   prodect: "产品1",
        //   mettingDate: "2019.10.15",
        //   mettingState: "new"
        // }
      ],
      productList: ["产品1", "产品2", "产品3", "产品4", "产品5"]
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
    getMettingList() {
      console.log("当前页码", this.page);
      let params = {
        page: this.page,
        row: this.row
      };
      setTimeout(() => {
        this.$api
          .createList(params)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              if (res.doctor_apply_list.length < this.row) {
                //   this.mettingList.push(...res.doctor_apply_list);
                // 加载状态结束
                this.finished = true;
                this.loading = false;
              } else {
                //   this.mettingList.push(...res.doctor_apply_list);
                this.page++; //此处还有一个问题：页码为1时不等滑动就加载了页码2的内容，  页码为2时滑动加载了页码3和页码4的内容
                this.loading = false;
              }
            } else {
              // 加载状态结束
              this.finished = true;
            }
            // 加载状态结束
            // this.loading = false; //注意：此处重要
          })
          .catch(error => {
            console.log(error);
          });
      }, 1000);
    },
    productConfirm(value) {
      this.mettingFiltrate = false;
    },
    newMetting() {
      this.$router.push({ path: "/newMetting" });
    },
    //点击每一项
    getDetail(status) {
      console.log(status);
      if (status != "new") {
        this.$router.push({ path: "/mettingdetailcontent" });
      } else {
        this.$router.push({ path: "/mettingdetailedit" });
      }
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
}
.metting_item {
  padding: 0.4rem;
}

.metting_name span:nth-child(2) {
  font-size: 0.625rem;
}
.metting_item ul li {
  padding: 0.125rem 0px;
}
.approve_item {
  border-bottom: 1px solid #ecf1f8;
  padding: 0.4rem 0rem;
}
.approve_item_detail {
  width: 80%;
  text-align: left;
}
.approve_item_detail ul li {
  padding: 0.125rem 0px;
}
.approve_item_detail ul li:nth-child(1) {
  font-size: 0.75rem;
}
.approve_item_detail ul li:nth-child(1) span {
  color: #333;
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
