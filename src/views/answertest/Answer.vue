<template>
  <van-row class="Answer">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="识别测试" />
    </van-row>
    <van-row class="main_body">
      <van-row v-for="(item,index) in questionList" :key="index+'q'">
        <van-row class="answer_item" v-show="showQuestion==index+1">
          <van-row class="answer_num">{{index+1}}/{{questionList.length}}&nbsp;单选题</van-row>
          <van-row class="answer_question">{{item.questionTitle}}：</van-row>
          <van-row class="answer_option">
            <van-radio-group v-model="item.questionAnswer">
              <van-cell v-for="(option,index2) in item.questionOption" :key="index2+'o'" :title="option" clickable @click="item.questionAnswer = option">
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
      <van-dialog v-model="dialogShow" title="如果您有推荐码，即可使用推荐码免试进入！" show-cancel-button confirm-button-text="提交" cancel-button-text="识别测试" @confirm="referraCode">
        <van-field class="refuse_text" v-model="phone" placeholder />
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
      phone: "",
      questionList: [
        {
          questionTitle: "可用来注册的是",
          questionOption: ["通用名", "商用名", "化学名"],
          questionAnswer: "",
          answer: '商品名'
        },
        {
          questionTitle: "目前我国生物制药企业最大的问题是",
          questionOption: [
            "生产企业数量少",
            "缺乏具有自主知识产权的产品",
            "生产规模小",
            "以上说法都不正确"
          ],
          questionAnswer: "",
          answer: '缺乏具有自主知识产权的产品'
        },
        {
          questionTitle: "药品生产质量管理规范的英文缩写为",
          questionOption: ["WHO", "OTC", "GMP", "FDA"],
          questionAnswer: "",
          answer: 'GMP'
        },
        {
          questionTitle: "非处方药的英文缩写",
          questionOption: ["WHO", "OTC", "GMP", "GSP"],
          questionAnswer: "",
          answer: 'OTC'
        },
        {
          questionTitle: "一般情况下，对患者的诊断治疗等具有最终决定权的是",
          questionOption: ["主任医师", "教授", "科主任", "院长"],
          questionAnswer: "",
          answer: '科主任'
        },
        {
          questionTitle: "药品供应质量管理规范的英文缩写",
          questionOption: ["WHO", "OTC", "GMP", "GSP"],
          questionAnswer: "",
          answer: 'GSP'
        },
        {
          questionTitle: "药物滥用指的是",
          questionOption: ["医生用药不当", "长期大量食用某种药物", "未掌握药物适用症", "无病情依据的长期自我用药"],
          questionAnswer: "",
          answer: '无病情依据的长期自我用药'
        },
        {
          questionTitle: "建立新的医疗机构分类管理制度，将医疗机构分为___和___两类进行管理",
          questionOption: ["公立，私立", "全民，集体", "非营利性，营利性", "医疗，保健"],
          questionAnswer: "",
          answer: '非营利性，营利性'
        },
        {
          questionTitle: "药品的通用名是指",
          questionOption: [
            "按中国药典委员会的药品命名原则制定的药品名称",
            "不同厂家生产的同一药物制剂可以起不同的名字",
            "世界卫生组织制定的药物（原料药）的国际药名",
            "别名"
          ],
          questionAnswer: "",
          answer: '按中国药典委员会的药品命名原则制定的药品名称'
        },
        {
          questionTitle: "药品是指",
          questionOption: [
            "用于预防人疾病的物质",
            "用于诊断人疾病的物质",
            "用于治疗人疾病的物质",
            "用于预防，诊断，治疗人疾病的物质"
          ],
          questionAnswer: "",
          answer: '用于预防，诊断，治疗人疾病的物质'
        },
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
    //下一题
    nextQuestion() {
      if (this.showQuestion < this.questionList.length) {
        this.showQuestion++;
        // console.log(this.showQuestion);
      }
    },
    //提交答题
    submit() {
      let score = 0
      this.questionList.forEach(value => {
        if (value.questionAnswer == value.answer) {
          score += 1
        }
      })
      console.log(score)
      let identify_status = score >= 8 ? '1' : '2';
      console.log(identify_status)
      let params = { identify_status: identify_status }
      this.$api.question(params)
        .then(res => {
          console.log(res)
          if (res.code == 200) {
            this.$toast.success("答题提交成功！");
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 1000)
          } else if (res.code == 9002) {
            this.$toast.fail("对不起您没有通过答题！");
            this.$router.push({ path: '/answer' })
          } else if (res.code == 9004) {
            this.$toast.fail("你已经通过答题了,请勿重复提交");
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 1000)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //推荐码
    referraCode() {
      console.log(this.phone)
      let params = { referra_code: this.phone }
      this.$api.referraCode(params)
        .then(res => {
          console.log(res)
          if (res.code == 200) {
            this.$toast.success("推荐码验证成功！");
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 1000)
          } else if (res.code == 9002) {
            this.$toast.fail("输入的推荐码有误！");
            this.$router.push({ path: '/answer' })
          } else if (res.code == 9004) {
            this.$toast.fail("你已经提交过了,请勿重复提交");
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 1000)
          }
        })
        .catch(error => {
          console.log(error)
        })
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
  font-size: 0.75rem;
  padding: 0.4375rem 0rem 0.3125rem 0rem;
}
.next_btn {
  position: absolute;
  bottom: 0.8rem;
  right: 0.3125rem;
  left: 0.3125rem;
}
</style>