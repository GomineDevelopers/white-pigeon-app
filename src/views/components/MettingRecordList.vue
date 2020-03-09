<template>
  <van-row class="approve_content">
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
        @click="getDetail(item.status, item.id)"
      >
        <div class="approve_item_detail">
          <ul>
            <li>
              {{ item.product_topic }}
              -
              <span>{{ item.speaker }}</span>
            </li>
            <li class="flex justify_start">
              <span>{{ item.product_name + "-" + item.specification }}</span>
            </li>
            <li class="flex justify_start">
              <span>{{ item.start_time }}</span>
            </li>
          </ul>
        </div>
        <div class="approve_state flex">
          <img v-if="item.status == '1'" src="@/assets/image/hg.png" />
          <img v-if="item.status == '2'" src="@/assets/image/bhg.png" />
          <img v-if="item.status == '3'" src="@/assets/image/shz.png" />
          <img v-if="item.status == '4'" src="@/assets/image/yhx.png" />
          <img v-if="item.status == '5'" src="@/assets/image/ysx.png" />
          <img v-if="item.status == '6'" src="@/assets/image/wtj.png" />
        </div>
      </div>
    </van-list>
  </van-row>
</template>
<script>
export default {
  name: "MettingRecordList",
  props: {
    status: Number,
    productId: Number
  },
  watch: {
    status(newVal, oldVal) {
      this.page = 1; //初始化
      this.mettingList = []; //列表数据
      this.loading = false; //加载
      this.finished = false; //完成
    }
  },
  data() {
    return {
      loading: false, //加载
      finished: false, //完成
      page: 1, //页码
      row: 5, //每页显示条数
      //会议列表
      mettingList: [
        // {
        //   title: "主题名称XXXX",
        //   user: "刘某某",
        //   prodect: "产品1",
        //   mettingDate: "2019.10.15",
        //   mettingState: "new"
        // }
      ]
    };
  },
  methods: {
    //获取会议列表
    getMettingList() {
      // console.log("当前页码", this.page);
      let params = {
        meeting_type: this.status,
        page: this.page,
        row: this.row
      };
      this.$api
        .createList(params)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            if (res.meeting_list.length < this.row) {
              this.mettingList.push(...res.meeting_list);
              // 加载状态结束
              this.finished = true;
              this.loading = false;
            } else {
              this.mettingList.push(...res.meeting_list);
              this.page++; //此处还有一个问题：页码为1时不等滑动就加载了页码2的内容，  页码为2时滑动加载了页码3和页码4的内容
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
    },
    //点击每一项
    getDetail(status, id) {
      console.log(status);
      if (status == 6) {
        this.$router.replace({
          path: "/mettingdetailedit",
          query: { id: id, redirect: this.$router.currentRoute.fullPath }
        });
      } else {
        this.$router.push({ path: "/mettingdetailcontent", query: { id: id } });
      }
    }
  }
};
</script>

<style scoped>
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
