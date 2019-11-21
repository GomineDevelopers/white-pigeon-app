<template>
  <van-row class="Answer">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="识别测试" />
    </van-row>
    <van-row class="main_body">
      <van-row v-for="(item,index) in questionList" :key="index+'q'">
        <van-row class="answer_item" v-show="showQuestion==index+1">
          <van-row class="answer_num">{{index+1}}/5&nbsp;单选题</van-row>
          <van-row class="answer_question">{{item.questionTitle}}</van-row>
          <van-row class="answer_option">
            <van-radio-group v-model="item.questionAnswer">
              <van-cell
                v-for="(option,index2) in item.questionOption"
                :key="index2+'o'"
                :title="option"
                clickable
                @click="item.questionAnswer = option"
              >
                <van-radio slot="right-icon" :name="option" />
              </van-cell>
            </van-radio-group>
          </van-row>
          <van-row class="next_btn">
            <van-button type="info" @click="nextQuestion" v-if="index<questionList.length-1">下一题</van-button>
            <van-button type="info" @click="submit" v-if="index==questionList.length-1">提交</van-button>
          </van-row>
        </van-row>
      </van-row>
    </van-row>
    <van-row class="refuse_daio">
      <van-dialog
        v-model="dialogShow"
        title="如果您有推荐码，即可使用推荐码免试进入！"
        show-cancel-button
        confirm-button-text="提交"
        cancel-button-text="识别测试"
      >
        <van-field class="refuse_text" v-model="refuseValue" placeholder />
      </van-dialog>
    </van-row>
  </van-row>
</template>
<script>
export default {
  name: "answer",
  data() {
    return {
      dialogShow: true,
      showQuestion: 1,
      answer1: "",
      answer2: "",
      answer3: "",
      radio: "",
      refuseValue: "",
      questionList: [
        {
          questionTitle: "可用来注册的是",
          questionOption: ["通用名", "商用名", "化学名"],
          questionAnswer: ""
        },
        {
          questionTitle: "目前我国生物制药企业最大的问题是",
          questionOption: [
            "生产企业数量少",
            "缺乏具有自主知识产权的产品",
            "生产规模小",
            "以上说法都不正确"
          ],
          questionAnswer: ""
        },
        {
          questionTitle: "药品生产质量管理规范的英文缩写为",
          questionOption: ["WHO", "OTC", "GMP", "FDA"],
          questionAnswer: ""
        },
        {
          questionTitle: "非处方药的英文缩写",
          questionOption: ["WHO", "OTC", "GMP", "GSP"],
          questionAnswer: ""
        },
        {
          questionTitle: "一般情况下，对患者的诊断治疗等具有最终决定权的是",
          questionOption: ["主任医师", "教授", "科主任", "院长"],
          questionAnswer: ""
        }
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
  },
  methods: {
    nextQuestion() {
      if (this.showQuestion < this.questionList.length) {
        this.showQuestion++;
        console.log(this.showQuestion);
      }
    },
    //提交
    submit() {
      console.log("答题完毕，提交！");
      console.log(this.questionList);
      this.$router.push({ path: "/improvepersonalinfo" });
    }
  }
};
</script>
<style>
.answer_item {
  background: #fff;
  height: 82vh;
  position: relative;
  box-shadow: 0rem 0rem 0.3125rem #ccc;
  padding: 0.3125rem;
  border-radius: 0.1875rem;
}
.answer_option span {
  font-size: 0.625rem;
}
.answer_option .van-cell {
  padding: 0.6rem 0.4375rem;
  border-color: 0rem solid #fff;
  background: #f5f5f5;
  margin-top: 0.4375rem;
  border-radius: 0.375rem;
}
.answer_option .van-radio__icon .van-icon {
  width: 0.9375rem;
  height: 0.9375rem;
  line-height: 0.9375rem;
  font-size: 0.5em;
}
.next_btn .van-button--info {
  width: 100%;
  border-radius: 0.25rem;
  height: 1.5625rem;
  line-height: 1.5625rem;
}
.Answer .van-dialog__header {
  padding-top: 1rem;
}
.Answer .van-dialog__header {
  height: 1.6rem;
  line-height: 1rem;
  font-size: 0.625rem;
  text-align: left;
  margin-left: 0.625rem;
}
.Answer .refuse_text {
  /* height: 1.25rem; */
  line-height: 1.3125rem;
  font-size: 0.625rem;
  border: 1px solid #ccc;
  width: 90%;
  margin: 0.875rem auto;
  border-radius: 0.25rem;
  padding: 0.125rem;
}
.Answer .van-dialog__cancel,
.Answer .van-dialog__confirm {
  height: 1.75rem;
  line-height: 1.75rem;
}
</style>
<style scoped>
.answer_item {
  text-align: left;
}
.answer_num {
  font-size: 0.75rem;
  color: #a8aec1;
}
.answer_question {
  font-size: 0.625rem;
  padding: 0.4375rem 0rem 0.3125rem 0rem;
}
.next_btn {
  position: absolute;
  bottom: 0.625rem;
  right: 0.3125rem;
  left: 0.3125rem;
}
</style>