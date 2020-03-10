<template>
  <van-row class="approve_content">
    <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
      <div class="approve_list">
        <div
          class="approve_item"
          v-for="(item, index) in visitList"
          :key="index + 'b'"
          @click="enterDetail(item.id, item.status)"
        >
          <van-swipe-cell>
            <div class=" flex justify_between flex_align_center">
              <div class="approve_item_detail">
                <ul>
                  <li>{{ item.hospital_name }}</li>
                  <li class="flex justify_start flex_align_center">
                    <span>目的：</span>
                    <span>{{ item.visit_goal }}</span>
                  </li>
                  <li class="flex justify_start flex_align_center">
                    <span>拜访时间：</span>
                    <span>{{ item.start_time }}</span>
                  </li>
                </ul>
              </div>
              <div class="approve_state">
                <img v-if="item.status == 1" src="@/assets/image/hg.png" />
                <img v-if="item.status == 2" src="@/assets/image/bhg.png" />
                <img v-if="item.status == 3" src="@/assets/image/shz.png" />
                <img v-if="item.status == 4" src="@/assets/image/yhx.png" />
                <img v-if="item.status == 5" src="@/assets/image/ysx.png" />
                <img v-if="item.status == 6" src="@/assets/image/wtj.png" />
              </div>
            </div>
            <van-button
              v-if="item.status == 6"
              slot="right"
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="deleteItem(item.id)"
            />
          </van-swipe-cell>
        </div>
      </div>
    </van-list>
  </van-row>
</template>
<script>
export default {
  name: "visitRecordList",
  inject: ["reload"], //刷新页面
  props: {
    status: Number
  },
  data() {
    return {
      loading: false, //加载
      finished: false, //完成
      finishedText: "没有更多了",
      page: 1, //页码
      row: 3, //每页显示条数
      visitList: []
    };
  },
  watch: {
    status(newVal, oldVal) {
      setTimeout(() => {
        // 清空列表数据
        this.visitList = [];
        this.finished = false; //
        this.page = 1; //初始化页码

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      }, 1000);
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
        .catch(error => {
          console.log(error);
        });
    },
    //点击每一项
    enterDetail(id, status) {
      if (status == 6) {
        this.$router.push({ path: "/visitdetailedit", query: { id: id } });
      } else {
        this.$router.push({ path: "/visitdetailcontent", query: { id: id } });
      }
    },
    deleteItem(id) {
      console.log("确认");
      this.$Dialog
        .confirm({
          message: "确认删除此条拜访记录吗？",
          confirmButtonText: "确定", //改变确认按钮上显示的文字
          cancelButtonText: "取消" //改变取消按钮上显示的文字
        })
        .then(() => {
          let params = { visit_id: id };
          this.$api
            .visitDel(params)
            .then(res => {
              if (res.code == 200) {
                this.$toast.success("操作成功");
                setTimeout(() => {
                  this.reload(); //刷新当前页面，加载新数据
                }, 500);
              } else {
                this.$toast.fail(res.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {});
    }
  }
};
</script>
<style>
.approve_item .van-swipe-cell {
  width: 100%;
}
.approve_item .van-swipe-cell__right {
  right: -1px;
}
.approve_item .van-swipe-cell__right .van-button--normal {
  height: 100%;
  font-size: 10px;
}
.approve_item .van-swipe-cell__right .van-button--normal span {
  font-size: 0.65rem;
}
</style>
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
