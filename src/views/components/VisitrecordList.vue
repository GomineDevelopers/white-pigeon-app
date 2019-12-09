<template>
    <van-row class="approve_content">
        <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
        <div class="approve_list">
          <div
            class="approve_item flex justify_between"
            v-for="(item,index) in visitList"
            :key="index+'b'"
            @click="enterDetail(item.id, item.status)"
          >
            <div class="approve_item_detail">
              <ul>
                <li>{{item.hospital_name}}</li>
                <li class="flex justify_start flex_align_center">
                  <span>目的：</span>
                  <span>{{item.visit_goal}}</span>
                </li>
                <li class="flex justify_start flex_align_center">
                  <span>拜访时间：</span>
                  <span>{{item.start_time}}</span>
                </li>
              </ul>
            </div>
            <div class="approve_state flex">
              <img v-if="item.status == 1" src="@/assets/image/hg.png" />
              <img v-if="item.status == 2" src="@/assets/image/bhg.png" />
              <img v-if="item.status == 3" src="@/assets/image/shz.png" />
              <img v-if="item.status == 4" src="@/assets/image/yhx.png" />
              <img v-if="item.status == 5" src="@/assets/image/ysx.png" />
              <img v-if="item.status == 6" src="@/assets/image/wtj.png" />
            </div>
          </div>
        </div>
      </van-list>
    </van-row>
</template>
<script >
export default {
  name: "visitRecordList",
  props: {
    status: Number
  },
  data() {
    return {
      loading: false, //加载
      finished: false, //完成
      finishedText: "没有更多了",
      page: 1, //页码
      row: 10, //每页显示条数
      visitList: []
    };
  },
  watch: {
    status(newVal, oldVal) {
      this.page = 1; //初始化
      this.visitList = []; //列表数据
      this.loading = false; //加载
      this.finished = false; //完成
    }
  },
  methods: {
    //加载更多
    onLoad() {
      let params = {
        visit_type: this.status,
        page: this.page,
        row: this.row
      };
        this.$api
            .visitList(params)
            .then(res => {
                this.loading = false;
                switch (res.code) {
                    case 200:
                    let list = res.visit_list;
                    this.visitList = this.visitList.concat(list);
                    
                    if (list.length === this.row) {
                        this.page += 1;
                    } else {
                        this.finished = true;
                    }
                    break;
                    case 9002:
                    this.finished = true;
                    this.finishedText = res.message;
                    break;
                    case 101:
                    this.$dialog.alert({
                        message: res.message
                    }).then( () => {
                        this.$router.push('/loginpassword')
                    });
                    break;
                }
            })
            .catch(error => {
            console.log(error);
            });
    },
   //点击每一项
    enterDetail(id, status) {
      if (status == 6) {
        this.$router.push({ path: "/visitdetailedit", query: { id: id }});
        
      } else {
        this.$router.push({ path: "/visitdetailcontent", query: { id: id }});
      }
    }
  }
};
</script>
<style scoped>

.approve_content {
  padding: 0rem 1rem 1.25rem 1rem;
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
</style>