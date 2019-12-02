<template>
  <van-row class="signcontract">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="合同签署" />
    </van-row>
    <van-row class="main_body">
      <van-row class="public_module">
        <van-row class="party_title">服务合同</van-row>
        <!-- 甲方 -->
        <van-row class="party">
          <van-row class="party_item">
            <van-row>甲方（需求方）公司名称：</van-row>
            <van-row>
              <van-field v-model="firstPartyName" />
            </van-row>
          </van-row>
          <van-row class="party_item">
            <van-row>注册地址：</van-row>
            <van-row>
              <van-field v-model="registeredAddress" />
            </van-row>
          </van-row>
          <van-row class="party_item">
            <van-row>主要负责人：</van-row>
            <van-row>
              <van-field v-model="principal" />
            </van-row>
          </van-row>
          <van-row class="party_item">
            <van-row>联系方式：</van-row>
            <van-row>
              <van-field v-model="phone" type="number" />
            </van-row>
          </van-row>
        </van-row>
        <!-- 乙方 -->
        <van-row class="party second_party">
          <van-row class="party_item">
            <van-row>乙方（服务商）名称：</van-row>
            <van-row>
              <van-field v-model="secondPartyName" />
            </van-row>
          </van-row>
          <van-row class="party_item">
            <van-row>身份证号：</van-row>
            <van-row>
              <van-field v-model="IDcard" />
            </van-row>
          </van-row>
          <van-row class="party_item">
            <van-row>家庭住址：</van-row>
            <van-row>
              <van-field v-model="address" />
            </van-row>
          </van-row>
          <van-row class="party_item">
            <van-row>联系方式：</van-row>
            <van-row>
              <van-field v-model="tel" type="number" />
            </van-row>
          </van-row>
        </van-row>

        <!-- 委托事项、工期和支付费用  -->
        <van-row class="sign_matter">
          <van-row class="sign_title1">一.委托事项、工期和支付费用</van-row>
          <van-row class="sign_matter_item">
            <span>1.技术服务的开始时间:</span>
            <br />
            <span class="border_bom van-cell start_time" @click="dateShow = true">
              {{ startTime }}
            </span>
          </van-row>
          <van-row class="sign_matter_item">
            <span>2.技术服务的结束时间:</span>
            <br />
            <span class="border_bom van-cell end_time" @click="endDateShow = true">{{
              endTime
            }}</span>
          </van-row>
          <van-row class="sign_matter_item">
            <span>3.技术服务的费用结算:</span>
            <br />
            <span>
              <van-field v-model="cost" />
            </span>
          </van-row>
          <van-row class="sign_title1">二．宣传内容和人员要求</van-row>
          <van-row class="sign_matter_item">
            <span>1.宣传内容：</span>
            <br />
            <span class="product_content">产品：</span>
            <br />
            <span>
              <van-field v-model="product" />
            </span>
            <span class="product_content">对象（医院）：</span>
            <br />
            <span>
              <van-field v-model="hospital" />
            </span>
          </van-row>
          <van-row class="sign_matter_item">
            <span>2. 活动人员要求:</span>
            <ul class="disc_ul">
              <li>医学/药学/生物工程医药相关背景</li>
              <li>有一年以上医药行业市场 推广相关工作经验</li>
              <li>能独立组织并完成学术推广活动</li>
              <li>有抗病毒、抗抑郁等相关产品推广经验</li>
              <li>自带推广工作 中可能用到的仪器设备，如电脑、投影仪、手机等</li>
              <li>擅长人际交流及沟通，表达能力佳</li>
            </ul>
          </van-row>
          <van-row class="sign_matter_item">
            <span>3. 技术服务的要求:</span>
            <ul class="disc_ul">
              <li>
                要求服务者责任心强，能够根据需求约定，在服务结束时间保质保量的完成需求。验收方式可以通过线上的方式提交。服务过程中和完成后不得随意泄露甲方信息。
              </li>
              <li>
                根据甲方业务需求，对公司重点产品在全国范围内指定医院及产品进行学术推广活动。
              </li>
            </ul>
          </van-row>
          <van-row class="sign_title1">三.协作事项与双方责任</van-row>
          <van-row>
            <ul>
              <li>
                1.甲方与乙方应确认好工作内容、工作期限、交付标准、支付金额等事项，无异议后乙方开始工作。
              </li>
              <li>
                2.为了最大程度确保乙方按甲方的委托要求完成服务，甲方应尽量详细地向乙方说明需求详情，交付要求，
                并提供必要的相关材料和支持。
              </li>
              <li>
                3.由于甲方需求不明确或提供的材料存在错误、遗漏、失效、缺失、伪造、变造等原因导致乙方无法提供服
                务或提供的服务无法符合甲方要求的，相关的责任和后果由甲方承担。
              </li>
              <li>
                4.未经甲方同意，乙方不得将本合同项下服务通过转包或分包等方式交由第三方完成或提供，否则甲方有权
                拒绝验收服务成果，支付服务费用。
              </li>
              <li>
                5.服务过程中，甲方应当予以配合，发生的合理费用由双方协商承担，并可以通过合同变更方式修改委托事
                项。但乙方不得将应当由乙方承担的工作交由甲方，甲方有权拒绝。
              </li>
              <li>
                6.本协议订立后，乙方应按照约定的工作期限内完成工作内容，并提交验收;如工作期限内发生委托服务合
                同内容发生变更的，需要双方协商一致并签订补充协议，方可作为合同附件与主合同具有同等法律效力。否则视
                为合同约定未变更。
              </li>
              <li>
                7.
                乙方不得做出任何损伤甲方利益的任何行为，若出现此情况，甲方有权拒绝支付服务费用，乙方需赔偿甲方因乙方产生的所有损失。
              </li>
            </ul>
          </van-row>
          <van-row class="sign_title1">四．保密及权利</van-row>
          <van-row>
            <ul>
              <li>
                1.乙方须妥善保管因本合同而取得的甲方提供的技术资料。除为履行本合同外，乙方不得为其它目的使用该
                技术资料;且除经甲方同意外，乙方不得复制、转移、转让以及其他各类方式向其他第三方提供甲方的技术资
                料。
              </li>
              <li>
                2.乙方确保提供的服务未侵害他人之著作权或其它合法权利，如甲方因使用乙方提供的服务而导致有第三人
                对甲方提起侵害著作权或其它权利之诉讼
                ，乙方应负责出面抗辩并承担由此产生的所有赔偿责任。
              </li>
              <li>
                3.双方同意，乙方在本合同项下提供的服务工作成果归甲方所有。但服务中涉及第三方知识产权的除外。
              </li>
              <li>
                4.甲乙双方应严格按照本合同约定履行各自义务，任何一方违反本合同约定的，应向另一方承担全部违约责
                任，包括但不限于继续履行、支付违约金、赔偿损失等。
              </li>
            </ul>
          </van-row>
          <van-row class="sign_title1"
            >五.本合同一式 2 份，甲方执 1 份，乙方执 1 份，每份合同具有同等法律效力。</van-row
          >
          <van-row class="sign_moudle">
            <van-row>
              甲方：
              <br />上海臣邦医药科技股份有限公司
            </van-row>
            <van-row class="second_party_sign">乙方：</van-row>
            <!-- <van-row class="signature_card flex">电子签名</van-row> -->
            <div :style="sign_lable_css" class="sign_label">
              <span v-show="isShowSignLabel">电子签名</span>
            </div>
            <div class="canvas_box" ref="canvasBox">
              <canvas
                @touchstart="touchStart"
                @touchmove="touchMove"
                @touchend="touchEnd"
                ref="canvasCont"
              ></canvas>
              <van-icon class="reset_btn" name="replay" @click="resetSign" />
            </div>
            <img :src="img" />
          </van-row>
        </van-row>
      </van-row>
      <van-row class="public_btn">
        <button @click="goManagement">提&nbsp;交</button>
      </van-row>
    </van-row>
    <!-- 开始时间选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row class="area_option" v-show="dateShow">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            @confirm="dateConfirm"
            @cancel="dateShow = false"
          />
        </van-row>
      </transition>
    </van-row>
    <!-- 结束时间选择 -->
    <van-row class="showbank">
      <transition name="van-slide-up">
        <van-row class="area_option" v-show="endDateShow">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            @confirm="endDateConfirm"
            @cancel="endDateShow = false"
          />
        </van-row>
      </transition>
    </van-row>
  </van-row>
</template>
<script>
import { timeFormat } from "@/js/public";
export default {
  name: "signcontract",
  data() {
    return {
      dateShow: false,
      endDateShow: false,
      currentDate: new Date(),
      firstPartyName: "", //甲方名称
      registeredAddress: "", //注册地址
      principal: "", //主要负责人
      phone: "", //联系方式

      secondPartyName: "", // 乙方名称
      IDcard: "", //身份证
      address: "", //家庭住址
      tel: "", //联系方式

      startTime: "",
      endTime: "",
      cost: "",
      product: "",
      hospital: "",

      canvasTxt: null,
      startX: 0,
      startY: 0,
      img: null,
      isShowSignLabel: true, //签名提示
      sign_lable_css: {
        //签名提示样式
        width: 0,
        height: 0,
        lineHeight: 0
      }
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
  mounted() {
    let canvas = this.$refs.canvasCont;
    canvas.width = this.$refs.canvasBox.offsetWidth - 2;
    canvas.height = canvas.width / 2;

    let txtPosLeft = canvas.width / 2;
    let txtPosRight = canvas.width / 4;
    this.canvasTxt = canvas.getContext("2d");
    this.sign_lable_css.width = `${canvas.width}px`;
    this.sign_lable_css.height = `${canvas.width / 2}px`;
    this.sign_lable_css.lineHeight = `${canvas.width / 2}px`;
  },
  methods: {
    //手势事件
    touchStart(ev) {
      let evt = ev || event;
      evt.preventDefault();

      if (evt.touches.length == 1) {
        this.startX = evt.targetTouches[0].pageX - evt.target.offsetLeft;
        this.startY = evt.targetTouches[0].pageY - evt.target.offsetTop;
        this.isShowSignLabel = false;
      }
    },
    //手势移动事件
    touchMove(ev) {
      let evt = ev || event;
      evt.preventDefault();
      if (evt.touches.length == 1) {
        let obj = {
          x: evt.targetTouches[0].pageX - evt.target.offsetLeft,
          y: evt.targetTouches[0].pageY - evt.target.offsetTop
        };

        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
      }
    },
    //手势结束事件
    touchEnd(ev) {
      let img = this.$refs.canvasCont.toDataURL();
      console.log(this.base64ToFile(img));
      return;
    },
    // base64编码的图片
    base64ToFile(dataurl) {
      let filename = "usersign";
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      });
    },
    //重写签名
    resetSign() {
      this.canvasTxt.clearRect(0, 0, this.$refs.canvasCont.width, this.$refs.canvasCont.height);
      this.isShowSignLabel = true;
    },
    dateConfirm(event) {
      this.startTime = timeFormat(event);
      this.dateShow = false;
    },
    endDateConfirm(event) {
      this.endTime = timeFormat(event);
      this.endDateShow = false;
    },
    goManagement() {
      this.img = this.$refs.canvasCont.toDataURL();
      // firstPartyName: "", //甲方名称
      // registeredAddress: "", //注册地址
      // principal: "", //主要负责人
      // phone: "", //联系方式

      // secondPartyName: "", // 乙方名称
      // IDcard: "", //身份证
      // address: "", //家庭住址
      // tel: "", //联系方式

      // startTime: "",
      // endTime: "",
      // cost: "",
      // product: "",
      // hospital: "",
      let regs = /^1[3456789]\d{9}$/;
      if (!regs.test(this.phone) || !regs.test(this.tel)) {
        this.$toast.fail("手机号码有误");
        return false;
      }
      if (this.IDcard.length < 18) {
        this.$toast.fail("身份证号码有误");
        return false;
      }
      if (
        this.firstPartyName == "" ||
        this.registeredAddress == "" ||
        this.principal == "" ||
        this.secondPartyName == "" ||
        this.address == "" ||
        this.startTime == "" ||
        this.endTime == "" ||
        this.cost == "" ||
        this.product == "" ||
        this.hospital == ""
      ) {
        this.$toast.fail("请填写完整合同信息");
        return false;
      }

      // this.$router.push({ path: "/hospitalmanagement" });
    }
  }
};
</script>
<style>
.signcontract .van-cell {
  padding: 0.18rem 0rem 0rem 0rem;
  font-size: 0.75rem;
  border-bottom: 1px solid #eee;
}
</style>
<style scoped>
.public_module {
  text-align: left;
}
.party {
  font-size: 0.75rem;
  text-align: left;
}
.party_title {
  font-size: 0.875rem;
  padding: 0.625rem 0rem;
  font-weight: bold;
  text-align: center;
}
.party_item,
.sign_matter_item {
  padding: 0.2rem 0rem;
}
.second_party {
  margin-top: 1rem;
}
.sign_matter {
  margin-top: 0.625rem;
  font-size: 0.75rem;
}
.sign_title1 {
  font-weight: bold;
  margin: 0.5rem 0rem 0.3125rem 0rem;
}
.border_bom {
  display: inline-block;
  width: 100%;
}
.end_time,
.start_time {
  height: 1.4rem;
}
.product_content {
  margin-top: 0.625rem;
}
.sign_matter .sign_matter_item ul {
  padding: 0.3125rem 0.3125rem 0.3125rem 0.75rem;
}
.sign_matter ul li {
  font-size: 0.625rem;
  margin-bottom: 0.375rem;
  line-height: 1rem;
}
.sign_matter ul.disc_ul li {
  list-style-type: disc;
}
.sign_moudle .van-row:nth-child(1) {
  margin-top: 0.625rem;
}
.sign_moudle .van-row {
  line-height: 1.125rem;
}
.second_party_sign {
  margin: 0.625rem 0rem 0.1875rem 0rem;
}
/* .signature_card {
  width: 100%;
  height: 7.5rem;
  border: 1px solid #eee;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  color: #999;
  margin-bottom: 0.625rem;
} */

.canvas_box {
  box-sizing: border-box;
  flex: 1;
}
canvas {
  /* background: #f8faff; */
  background: transparent;
  border: 1px solid #e6e6e6;
}
.sign_label {
  position: absolute;
  z-index: -1;
  font-size: 16px;
  color: #a8aec1;
  text-align: center;
  background: #f8faff;
}
.reset_btn {
  float: right;
  color: #3399ff;
  margin-right: 5px;
  margin-top: -28px;
}
</style>
