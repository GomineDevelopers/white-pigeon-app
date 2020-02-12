<template>
  <van-row class="approve_content">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <div class="approve_list">
        <div
          class="approve_item flex justify_between"
          v-for="(item, index) in approveList"
          :key="index + 'b'"
          @click="getDetail(item.id, item.status, item.is_sign)"
        >
          <div class="approve_item_detail">
            <ul>
              <li class="prodect_name flex justify_start flex_align_center">
                <span>产品名：</span>
                <span>{{ item.product_name }}-{{item.specification}}</span>
              </li>
              <li class="flex justify_start flex_align_center">
                <span>医院名：</span>
                <span>{{ item.hospital_name }}</span>
              </li>
              <li class="flex justify_start flex_align_center">
                <span>申请时间：</span>
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
</template>
<script>
export default {
  name: "applymodule",
  props: {
    status: Number
  },
  data() {
    return {
      loading: false, //加载
      finished: false, //完成
      page: 1, //页码
      row: 5, //每页显示条数
      approveList: []
    };
  },
  watch: {
    status(newVal, oldVal) {
      console.log("newVal", newVal);
      this.page = 1; //初始化
      this.approveList = []; //列表数据
      this.finished = false; //完成
    }
  },
  methods: {
    //加载更多
    onLoad() {
      let params = {
        hospital_product_status: this.status,
        page: this.page,
        row: this.row
      };
      this.$api
        .hospitalManagerList(params)
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            if (res.hospital_product_list.length < this.row) {
              this.approveList.push(...res.hospital_product_list);
              // 加载状态结束
              this.finished = true;
            } else {
              this.approveList.push(...res.hospital_product_list);
              this.page++; //此处还有一个问题：页码为1时不等滑动就加载了页码2的内容，  页码为2时滑动加载了页码3和页码4的内容
            }
          } else {
            // 加载状态结束
            this.finished = true;
          }
          // 加载状态结束
          this.loading = false; //注意：此处重要
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDetail(id, status, isSign) {
      //判断status是否为已通过
      if (status == 1) {
        //判断是否签约  1-已签约 2-未签约
        if (isSign == 2) {
          console.log("未签约", isSign);
          this.$api
            .userInfo()
            .then(res => {
              console.log(res);
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
                //银行卡信息完善跳转签约
                this.$router.replace({
                  path: "/signcontract",
                  query: { id: id, redirect: this.$router.currentRoute.fullPath }
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$router.push({
            path: "/productapplydetail",
            query: { id: id }
          });
        }
      } else {
        this.$router.push({
          path: "/productapplydetail",
          query: { id: id }
        });
      }
    }
  }
};
</script>
<style scoped>
.approve_content {
  /* margin-top: 0.3125rem; */
  overflow: auto;
  /* height: 23.875rem; */
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
