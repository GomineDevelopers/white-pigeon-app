<template>
  <van-row class="bankcard">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="银行卡设置" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="bankcard_content">
      <van-row class="flex card_item border_bom">
        <span>开户名</span>
        <span class="flex_1 sales_input">
          <van-field v-model="name" placeholder="请输入" />
        </span>
      </van-row>
      <van-row class="flex card_item border_bom">
        <span class="title">开户行</span>
        <van-row class="openingBank flex flex_1" @click="showOpeningBank">
          <span class="flex_1">{{ openingBankValue ? openingBankValue : "请选择" }}</span>
          <van-icon name="arrow" />
        </van-row>
      </van-row>
      <van-row class="flex card_item border_bom">
        <span class="title">开户行支行</span>
        <span class="flex_1 sales_input">
          <van-field v-model="bankBranch" placeholder="请输入" />
        </span>
      </van-row>
      <van-row class="flex card_item border_bom">
        <span>银行卡号</span>
        <span class="flex_1 sales_input">
          <van-field
            v-model="bankCard"
            type="number"
            maxlength="19"
            placeholder="你本人的银行卡卡号"
          />
        </span>
      </van-row>
      <van-row class="notice">温馨提示：请提供与平台注册手机号绑定的银行账号</van-row>
      <van-row class="public_btn">
        <button @click="goContract">确&nbsp;认</button>
      </van-row>
    </van-row>
    <!-- 开户行选择 -->
    <!-- 上滑进入 -->
    <transition name="van-slide-up">
      <van-popup v-model="openingBankShow" position="bottom">
        <van-picker
          show-toolbar
          title="开户行选择"
          :columns="openingBank"
          @cancel="openingBankShow = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </transition>
  </van-row>
</template>
<script>
import bankList from "@/js/bank";
export default {
  nama: "bankcard",
  data() {
    return {
      openingBankShow: false,
      bankList: bankList,
      openingBank: [],
      name: "",
      bankCard: "", //卡号
      bankBranch: "", //支行
      openingBankValue: "", //开户行 银行卡中文  中国工商银行
      openingBankId: "" //银行卡简称 ICBC
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
    this.getBankList();
    this.getBankInfo();
  },
  methods: {
    onBack() {
      history.back();
    },
    showOpeningBank() {
      this.openingBankShow = true;
    },
    onConfirm(value) {
      this.openingBankShow = false;
      this.openingBankValue = value.text;
      this.openingBankId = value.id;
    },
    // 获取银行列表
    getBankList() {
      let temp = [];
      this.bankList.bankList.forEach(value => {
        temp.push({ text: value.text, id: value.value });
      });
      this.openingBank = temp;
    },
    // 获取银行卡信息
    getBankInfo() {
      this.$api
        .userInfo()
        .then(res => {
          console.log(res);
          this.name = res.user.account_name || "";
          this.bankCard = res.user.card_no || "";
          this.bankList.bankList.forEach(item => {
            if (item.value == res.user.open_bank) {
              this.openingBankValue = item.text;
            }
          });
          this.bankBranch = res.user.bank_branch || "";
          this.openingBankId = res.user.open_bank || "";
        })
        .catch(error => {
          console.log(error);
        });
    },
    goContract() {
      if (
        this.name == "" ||
        this.bankCard == "" ||
        this.openingBankValue == "" ||
        this.openingBankId == ""
      ) {
        this.$toast.fail("请填写完整信息");
        return false;
      }
      this.$Dialog
        .confirm({
          message: "为保证付款顺利，请务必确认银行卡信息与本人账户信息一致！",
          confirmButtonText: "确定", //改变确认按钮上显示的文字
          cancelButtonText: "返回" //改变取消按钮上显示的文字
        })
        .then(() => {
          // console.log("已确认信息无误！");
          let params = {
            account_name: this.name,
            open_bank: this.openingBankId,
            card_no: this.bankCard,
            bank_branch: this.bankBranch
          };
          this.$api
            .bankFill(params)
            .then(res => {
              // console.log(res);
              if (res.code == 200) {
                this.$toast.success("提交成功");
                setTimeout(() => {
                  if (this.$route.query.redirect) {
                    this.$router.push({ path: this.$route.query.redirect });
                  } else {
                    this.$router.go(-1);
                  }
                }, 2000);
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
.padding_3 {
  padding: 0.5rem 0.3rem;
}

.bankcard_content .padding_3 .van-cell {
  font-size: 0.75rem;
  padding: 0rem 1rem;
}
.card_item .van-cell {
  font-size: 0.75rem;
  padding: 0rem 1rem;
}
.bankcard .showbank {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
.bankcard .van-field__control {
  color: #999;
  font-size: 0.75rem;
}
</style>
<style scoped>
.bankcard_content {
  margin-top: 2rem;
}
.flex {
  align-items: center;
}
.flex span {
  font-size: 0.75rem;
}
.flex span:nth-child(1) {
  width: 3.9rem;
  text-align: left;
}
.openingBank {
  color: #999;
}
.openingBank span {
  font-size: 0.75rem;
}
.openingBank {
  padding-left: 1rem;
}
.notice {
  font-size: 0.625rem;
  color: #999;
  text-align: left;
  margin-top: 0.3125rem;
  padding: 0.3125rem 1rem;
}
.card_item {
  padding: 0.6rem 1rem;
}
.public_btn {
  padding: 0rem 1rem;
}
.openingBank .van-icon {
  color: #c7c7cc;
  font-size: 0.75rem;
}
</style>
