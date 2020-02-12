<template>
  <van-row class="signcontract">
    <van-row class="top_nav_bar nav_bgm">
      <van-nav-bar title="合同签署" left-arrow @click-left="onBack()" />
    </van-row>
    <van-row class="main_body">
      <van-row class="public_module">
        <van-row class="party_title">技术服务合同</van-row>
        <!-- 甲方 -->
        <van-row class="party">
          <van-row class="party_item">
            <van-row>甲方：</van-row>
            <span class="content_detail">{{ firstPartyName }}</span>
          </van-row>
        </van-row>
        <!-- 乙方 -->
        <van-row class="party second_party">
          <van-row class="party_item">
            <van-row>乙方（服务商）名称：</van-row>
            <span class="content_detail">{{ secondPartyName }}</span>
          </van-row>
          <van-row class="party_item">
            <van-row>身份证号：</van-row>
            <span class="content_detail">{{ IDcard }}</span>
          </van-row>
          <van-row class="party_item">
            <van-row>家庭住址：</van-row>
            <span class="content_detail">{{ address }}</span>
          </van-row>
          <van-row class="party_item">
            <van-row>联系方式：</van-row>
            <span class="content_detail">{{ tel }}</span>
          </van-row>
        </van-row>

        <!-- 委托事项、工期和支付费用  -->
        <van-row class="sign_matter">
          <van-row class="sign_title1">一.委托事项、期限</van-row>
          <van-row class="sign_matter_item font_11">
            <span>1.技术服务的开始时间:</span>
            <br />
            <span class="start_time">
              {{ startTime.split("-")[0] }}年 {{ startTime.split("-")[1] }}月
              {{ startTime.split("-")[2] }}日
            </span>
          </van-row>
          <van-row class="sign_matter_item font_11">
            <span>2.技术服务的结束时间:</span>
            <br />
            <span class="end_time">
              {{ endTime.split("-")[0] }}年 {{ endTime.split("-")[1] }}月
              {{ endTime.split("-")[2] }}日
            </span>
          </van-row>
          <van-row class="sign_matter_item font_11">
            <span class="time_notice"
              >默认本合同约定的起始时间与结束时间为实际服务的起始时间与结束时间。</span
            >
          </van-row>
          <van-row class="sign_title1">二．推广宣传内容和乙方应具有的条件</van-row>
          <van-row class="sign_matter_item font_11">
            <span>1.推广宣传内容：</span>
            <van-row class="marign_top_12">
              <span class="product_content">推广产品：</span>
              <br />
              <span class="content_detail">{{ product }}</span>
            </van-row>
            <van-row class="marign_top_12">
              <span class="product_content">推广内容：</span>
              <br />
              <span class="content_detail">{{ content }}</span>
            </van-row>
            <van-row class="marign_top_12">
              <span class="product_content">推广对象（医院）：</span>
              <br />
              <span class="content_detail">{{ hospital }}</span>
            </van-row>
          </van-row>
          <van-row class="sign_matter_item font_11">
            <span>2. 乙方应具有的条件:</span>
            <ul class="disc_ul">
              <li>医学/药学/生物工程医药相关背景。</li>
              <li>有一年以上医药行业市场 推广相关工作经验。</li>
              <li>能独立组织并完成学术推广活动。</li>
              <li>擅长人际交流及沟通，表达能力佳。</li>
              <li>拥有推广工作中所需仪器设备，如电脑、便携式投影仪、手机等。</li>
            </ul>
          </van-row>
          <van-row class="sign_matter_item font_11">
            <span>3. 乙方不得具有以下身份或情形:</span>
            <ul class="disc_ul">
              <li>不得为军人、公职人员等国家法律法规和纪律规定禁止从事兼职或经商的人员。</li>
              <li>
                不得为公司雇员等其他与企业具有劳动/劳务合同关系、或其他类似的劳动人事法律关系并从与其有前述关系的公司取得工资薪金所得的人员
                。
              </li>
              <li>不得为企业法定代表人、股东、董事、监事等其他从所属公司取得收入的人员。</li>
            </ul>
          </van-row>
          <van-row class="sign_matter_item font_11">
            <span>4. 技术服务的要求:</span>
            <ul class="disc_ul">
              <li>验收方式可以通过线上的方式提交。服务过程中和完成后不得随意泄露甲方信息。</li>
              <li>
                根据甲方业务需求，对甲方指定重点产品在全国范围内指定医院及产品进行学术推广活动，作为有行业经验的市场推广人员协助完成甲方指定产品的学术推广工作，审核合格的推广工作由甲方支付服务费用。
              </li>
              <li>通过公司指定平台记录此签约产品推广行为。</li>
              <li>推广形式可为点对点，点对面的形式进行临床拜访或者推广活动。</li>
            </ul>
          </van-row>
          <van-row class="sign_title1">三.协作事项与双方责任</van-row>
          <van-row>
            <ul>
              <li>
                1.甲方与乙方应确认好工作内容、工作期限、交付标准、支付金额等事项，无异议后乙方开始工作，乙方应尽责完成约定技术服务工作。
                乙方可以在服务过程中根据实际需求情况申请延迟完成时间，但必须得到甲方的同意才能生效。
              </li>
              <li>
                2.为了最大程度确保乙方按甲方的委托要求完成服务，甲方应尽量详细地向乙方说明需求详情，交付要求，
                并提供必要的相关材料和支持。
              </li>
              <li>
                3.乙方应在合同约定期限内完成服务内容，并提交验收；如未在约定的期限内为完成服务，视为无法完成该服务并放弃服务费用。
              </li>
              <li>
                4.未经甲方书面同意，乙方不得将本合同服务通过转包或分包等方式交由第三方完成或提供，否则甲方有权拒绝验收服务成果，支付服务费用。
              </li>
              <li>
                5.乙方须妥善保管甲方提供的技术资料，不得私自复制、转移、转让以及其他各类方式向其他第三方提供甲方的技术资料。
              </li>
              <li>
                6.本协议订立后，乙方应按照约定的工作期限内完成工作内容，并提交验收;如工作期限内发生委托服务合同内容发生变更的，需要双方协商一致并签订书面补充协议，方可作为合同附件与主合同具有同等法律效力。否则视为合同约定未变更。
              </li>
              <li>
                7.乙方需确保提供的服务未侵害他人的著作权或其它合法权利，如甲方因使用乙方提供的服务而导致有第三方对甲方提起侵害著作权或其它知识产权诉讼，乙方应负责出面抗辩并承担由此产生的所有赔偿责任。
              </li>
              <li>
                8.
                乙方承诺不是法人、军人、公职人员等国家法律法规和纪律规定禁止从事兼职或经商人员的身份。
              </li>
              <li>
                9.
                乙方不得做出任何损伤甲方利益的任何行为，若出现此情况，甲方有权拒绝支付服务费用，乙方需赔偿甲方因乙方产生的所有损失。
              </li>
            </ul>
          </van-row>
          <!-- 费用核算开始 -->
          <van-row class="sign_title1">四．费用核算&支付方式</van-row>
          <van-row class="sign_matter_item font_11">
            <span>1.拜访：费用核算为300元/次拜访</span>
            <van-row class="marign_top_8">
              <span>合格标准：</span>
              <ul>
                <li>A） 签到位置不能与乙方医院相距1千米以上</li>
                <li>B） 每天每家医院的拜访必须有一张或一张以上签到照片，并包含医院门牌名称</li>
                <li>C） 照片必须具有真实性</li>
                <li>D） 拜访必须为已提交状态</li>
              </ul>
            </van-row>
            <span
              >2.活动：费用核算标准：500元/人次
              （例；一次活动邀请5位参与者，为5人次，参与者需为甲方目标客户人群）</span
            >
            <van-row class="marign_top_8">
              <span>审核标准：</span>
              <ul>
                <li>A） 每场活动必须上传两张或以上照片，并满足以下要求</li>
                <li class="padding_left_5">a) 包含签到表（签到表人员必须与上报到场人员相符）</li>
                <li class="padding_left_5">
                  b) 体现宣传甲方指定产品（参会人员需与甲方指定产品ppt同框）
                </li>
                <li>B） 照片必须具有真实性</li>
              </ul>
            </van-row>
            <van-row class="marign_top_8">
              <span>3.支付前提：</span>
              <br />
              <span class="font_size_10">
                乙方需在双方达成协商同意的开发时间 （自
                <i class="date_i">{{ startTime.split("-")[0] }}</i
                >年 <i class="date_i">{{ startTime.split("-")[1] }}</i
                >月 <i class="date_i">{{ startTime.split("-")[2] }}</i
                >日 到<i class="date_i">{{ estimatedTime.split("-")[0] }}</i
                >年 <i class="date_i">{{ estimatedTime.split("-")[1] }}</i
                >月 <i class="date_i">{{ estimatedTime.split("-")[2] }}</i
                >日 止）内，
                完成第一次推广对象（医院）的进药，否则之前所做的所有学术推广服务视为无效服务，甲方不予支付费用。
              </span>
            </van-row>
            <van-row class="marign_top_8">
              <span>4.支付方式：</span>
              <br />
              <span class="font_size_10"
                >甲方将按照乙方所做有效学术推广服务进行付费，已甲方指定的付款方式为准。</span
              >
            </van-row>
          </van-row>
          <!-- 费用核算结束 -->

          <van-row class="sign_title1">五．保密及个人信息采集使用授权</van-row>
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

          <van-row class="sign_title1">
            六.本合同一式 2 份，甲方执 1 份，乙方执 1
            份，自双方签字盖章后生效。电子签名与实体签名具有同等效力。每份合同具有同等法律效力。
          </van-row>
          <van-row class="sign_moudle">
            <van-row class="first_company font_11">
              <span>甲方：{{ firstPartyName }}</span>
              <br />
              <span>
                日期：
                {{ startTime.split("-")[0] }}年 {{ startTime.split("-")[1] }}月
                {{ startTime.split("-")[2] }}日
              </span>
            </van-row>
            <van-row class="second_party_sign">
              <van-row class="font_11">
                <span>乙方：</span>
              </van-row>
            </van-row>
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
            <span class="strat_time">
              日期：
              {{ startTime.split("-")[0] }}年 {{ startTime.split("-")[1] }}月
              {{ startTime.split("-")[2] }}日
            </span>
          </van-row>
        </van-row>
      </van-row>
      <van-row class="public_btn">
        <button @click="goManagement">提&nbsp;交</button>
      </van-row>
    </van-row>
  </van-row>
</template>
<script>
import { timeFormat } from "@/js/public";
import { upload } from "@/js/upload";
export default {
  name: "signcontract",
  data() {
    return {
      dateShow: false,
      endDateShow: false,
      currentDate: new Date(),
      signStatus: false,
      firstPartyName: "", //甲方名称

      secondPartyName: "", // 乙方名称
      IDcard: "", //身份证
      address: "", //家庭住址
      tel: "", //联系方式

      startTime: "",
      endTime: "",

      product: "",
      content: "",
      hospital: "",
      estimatedTime: "", //产品开发预估完成时间

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
    this.getContractInfo();
    console.log(this.$route.query.redirect);
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
    onBack() {
      history.back();
    },
    getContractInfo() {
      this.$toast.loading({
        message: "数据加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner"
      });
      //用户信息
      this.$api
        .userInfo()
        .then(res => {
          if (res.code == 200) {
            this.secondPartyName = res.user.name; // 乙方名称
            this.IDcard = res.user.id_card;
            this.address = res.user.id_address;
            this.tel = res.user.email;
          }
        })
        .catch(error => {
          console.log(error);
        });
      //合同信息
      let params = { hospital_product_id: this.$route.query.id };
      this.$api
        .getContractInfo(params)
        .then(res => {
          console.log(res,'-----------');
          if (res.code == 200) {
            this.$toast.clear();
            this.firstPartyName = res.getContractInfo.product_company; //甲方名称
            let nowDate = new Date();
            let startDate = timeFormat(nowDate);
            this.startTime = startDate;
            let endFDate = nowDate.setMonth(nowDate.getMonth() + 12);
            //计算产品预估完成时间 （当前时间 + 提交开发时选择的预估开发时间）
            let estimated_time = new Date().setMonth(
              new Date().getMonth() + res.getContractInfo.estimated_month
            );
            this.estimatedTime = timeFormat(estimated_time);
            this.endTime = timeFormat(endFDate);
            this.product = res.getContractInfo.product_name+'-'+res.getContractInfo.specification;
            this.content = res.getContractInfo.product_name +'-'+ res.getContractInfo.specification+ "产品的所有甲方指定推广宣传内容";
            this.hospital = res.getContractInfo.hospital_name;
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
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
      // let img = this.$refs.canvasCont.toDataURL();
      // console.log(this.base64ToFile(img));
      this.signStatus = true;
      return;
    },
    // base64编码的图片
    base64ToFile(dataurl) {
      let filename = "usersign" + this.$route.query.id + new Date().getTime();
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
      this.signStatus = false;
      this.img = "";
      this.canvasTxt.clearRect(0, 0, this.$refs.canvasCont.width, this.$refs.canvasCont.height);
      this.isShowSignLabel = true;
    },
    goManagement() {
      if (!this.signStatus) {
        this.$toast.fail("请签名");
        return false;
      }
      this.$toast.loading({
        message: "合同提交中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner"
      });
      let base64Img = this.$refs.canvasCont.toDataURL();
      let files = this.base64ToFile(base64Img);
      let file = { content: base64Img, file: files };
      console.log(file);
      upload(file, 0).then(res => {
        this.img = res;
        let params = {
          hospital_product_id: this.$route.query.id,
          sign_image: this.img
        };
        console.log(params);
        this.$api
          .SignSubmit(params)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$toast.success("合同提交成功");
              setTimeout(() => {
                if (this.$route.query.redirect) {
                  this.$router.replace({
                    path: decodeURIComponent(this.$route.query.redirect)
                  });
                } else {
                  this.$router.push({ path: "/" });
                }
              }, 2000);
            } else {
              this.$toast.fail(res.message);
            }
          })
          .catch(error => {
            this.$toast.clear();
            console.log(error);
          });
      });
    }
  }
};
</script>
<style scoped>
.public_module {
  text-align: left;
}
.party {
  font-size: 0.75rem;
  text-align: left;
}
.party_title {
  font-size: 0.75rem;
  padding: 0.625rem 0rem;
  font-weight: bold;
  text-align: center;
}
.party_item,
.sign_matter_item {
  padding: 0.2rem 0rem;
}
.second_party {
  margin-top: 0.8rem;
}
.sign_matter {
  margin: 0.625rem 0rem;
  font-size: 0.75rem;
}
.sign_title1 {
  color: #000;
  margin: 0.5rem 0rem 0.3125rem 0rem;
}

.font_11 span {
  font-size: 0.6875rem;
}
.marign_top_8 {
  margin-top: 0.3rem;
}
.marign_top_12 {
  margin-top: 0.5rem;
}
.marign_top_8 ul {
  padding: 0.3125rem 0.3125rem 0.3125rem 0rem !important;
}
.font_size_10 {
  font-size: 0.625rem !important;
}
.marign_top_8 ul li.padding_left_5 {
  padding-left: 0.7rem;
}
.time_notice {
  font-size: 0.625rem !important;
  color: #999;
}
.border_bom {
  display: inline-block;
  width: 100%;
}
.first_company {
  position: relative;
}
.end_time,
.start_time {
  display: block;
  margin-top: 0.3rem;
  color: #615d5d;
  border-bottom: 1px solid #eee;
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
.strat_time {
  font-size: 0.6875rem;
}
.content_detail {
  display: block;
  width: 100%;
  font-size: 0.6875rem;
  color: #615d5d;
  border-bottom: 1px solid #eee;
  margin-top: 0.3rem;
}
.date_i {
  text-decoration: underline;
  font-style: normal;
}
</style>
