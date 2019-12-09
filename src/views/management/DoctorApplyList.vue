<template>
  <van-row>
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="开发记录" left-arrow @click-left="onBack()"> </van-nav-bar>
    </van-row>
    <van-row class="main_body">
      <van-row class="approve_content">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="approve_list">
            <div
              class="approve_item flex justify_between"
              v-for="(item, index) in approveList"
              :key="index + 'b'"
            >
              <div class="approve_item_detail">
                <ul>
                  <li class="prodect_name flex justify_start flex_align_center">
                    <!-- <span>医生名：</span> -->
                    <span>{{ item.doctor_name }}</span>
                  </li>
                  <li class="flex justify_start flex_align_center">
                    <!-- <span>医院名：</span> -->
                    <span>{{ item.hospital_name }}</span>
                  </li>
                  <li class="flex justify_start flex_align_center">
                    <span>开发时间：</span>
                    <span>{{ item.create_time }}</span>
                  </li>
                </ul>
              </div>
              <div class="approve_state flex">
                <img v-if="item.status == 3" src="@/assets/image/approveing.png" />
                <img v-if="item.status == 1" src="@/assets/image/approve_pass.png" />
                <img v-if="item.status == 2" src="@/assets/image/approve_no.png" />
              </div>
            </div>
          </div>
        </van-list>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "doctorapplylist",
  data() {
    return {
      loading: false, //加载
      finished: false, //完成
      page: 1, //页码
      row: 5, //每页显示条数
      approveList: []
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
    //加载更多
    onLoad() {
      console.log("当前页码", this.page);
      let params = {
        page: this.page,
        row: this.row
      };
      setTimeout(() => {
        this.$api
          .applyRecord(params)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              if (res.doctor_apply_list.length < this.row) {
                this.approveList.push(...res.doctor_apply_list);
                // 加载状态结束
                this.finished = true;
                this.loading = false;
              } else {
                this.approveList.push(...res.doctor_apply_list);
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
    }
  }
};
</script>
<style scoped>
.main_body {
  height: 90vh;
  overflow: auto;
  padding: 0rem 1rem 1rem 1rem;
}
.approve_content {
  overflow: auto;
  height: 100%;
  overflow: auto;
}
.approve_item {
  border-bottom: 1px solid #ecf1f8;
  padding: 0.4rem 0rem;
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
.approve_item_detail ul li.prodect_name span {
  color: #333;
  font-size: 0.6875rem;
}
</style>
