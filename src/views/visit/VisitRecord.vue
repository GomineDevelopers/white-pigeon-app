<template>
  <van-row class="productapply">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="拜访记录" left-arrow @click-left="onBack()" @click-right="newVisit">
        <van-icon class="add_icon" name="add" slot="right" />
      </van-nav-bar>
    </van-row>

    <van-row class="top_nav border_bom">
      <van-row class="top_nav_list">
        <van-col
          :class="index === navActive ? 'active':''"
          v-for="(navItem,index) in navList"
          :key="index+'a'"
          @click="navHandle(index,navItem.status)"
        >
          <van-row>{{navItem.num}}</van-row>
          <van-row>{{navItem.name}}</van-row>
        </van-col>
      </van-row>
      <van-row class="newest_date">最新核销日期：2019.10.12</van-row>
    </van-row>

    <van-row class="main_body3">
      <van-row class="approve_content">
        <div class="approve_list">
          <div
            class="approve_item flex justify_between"
            v-for="(item,index) in visitList"
            :key="index+'b'"
            @click="getDetail(item.visitState)"
          >
            <div class="approve_item_detail">
              <ul>
                <li>{{item.title}}</li>
                <li class="flex justify_start">
                  <span>目的：</span>
                  <span>{{item.goal}}</span>
                </li>
                <li class="flex justify_start">
                  <span>拜访时间：</span>
                  <span>{{item.visitDate}}</span>
                </li>
              </ul>
            </div>
            <div class="approve_state flex">
              <img v-if="item.visitState == 'qualified'" src="@/assets/image/hg.png" />
              <img v-if="item.visitState == 'noqualified'" src="@/assets/image/bhg.png" />
              <img v-if="item.visitState == 'auditing'" src="@/assets/image/shz.png" />
              <img v-if="item.visitState == 'pass'" src="@/assets/image/yhx.png" />
              <img v-if="item.visitState == 'failure'" src="@/assets/image/ysx.png" />
            </div>
          </div>
        </div>
        <van-row class="more">查看更多</van-row>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "visitrecord",
  data() {
    return {
      navActive: 0,
      navList: [
        { name: "全部", num: "52", status: "all" },
        { name: "合格", num: "34", status: "qualified" },
        { name: "不合格", num: "4", status: "noqualified" },
        { name: "已核销", num: "36", status: "pass" },
        { name: "已失效", num: "4", status: "failure" }
      ],
      visitList: null,
      //全部
      visitAllList: [
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "new"
        },
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "auditing"
        },
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "qualified"
        },
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "noqualified"
        },
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "pass"
        },
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "failure"
        }
      ],
      //合格
      qualifiedList: [
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "qualified"
        },
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "qualified"
        },
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "qualified"
        }
      ],
      //不合格
      notqualifiedList: [
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "noqualified"
        },
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "noqualified"
        },
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "noqualified"
        }
      ],
      //已核销
      passList: [
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "pass"
        },
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "pass"
        },
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "pass"
        }
      ],
      //已失效
      failureList: [
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "failure"
        },
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "failure"
        },
        {
          title: "医院名XXXX",
          goal: "产品1",
          visitDate: "2019.10.15",
          visitState: "failure"
        }
      ]
    };
  },
  mounted() {
    this.visitList = this.visitAllList;
  },
  methods: {
    navHandle(index, status) {
      this.navActive = index;
      console.log(status);
      switch (status) {
        case "all":
          this.visitList = this.visitAllList;
          break;
        case "qualified":
          this.visitList = this.qualifiedList;
          break;
        case "noqualified":
          this.visitList = this.notqualifiedList;
          break;
        case "pass":
          this.visitList = this.passList;
          break;
        case "failure":
          this.visitList = this.failureList;
          break;
        default:
          break;
      }
      //console.log(this.visitList);
    },
    onBack() {
      history.back();
    },
    //创建拜访
    newVisit() {
      this.$router.push({ path: "/newvisit" });
    },
    //点击每一项
    getDetail(status) {
      console.log(status);
      if (status != "new") {
        this.$router.push({ path: "/visitdetailcontent" });
      } else {
        this.$router.push({ path: "/visitdetailedit" });
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
  padding: 0rem 1rem 1.25rem 1rem;
  text-align: left;
  height: 70vh;
  overflow-y: auto;
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
.newest_date {
  text-align: right;
  padding-right: 0.5rem;
  margin-top: 0.625rem;
  font-size: 0.625rem;
  color: #a8aec1;
}
.approve_content {
  /* margin-top: 0.3125rem; */
  overflow: auto;
  /* height: 23.875rem; */
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
.add_icon {
  font-size: 1rem;
}
</style>