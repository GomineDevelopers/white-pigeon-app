//获取医院等级
export function setHospitalLevel(level) {
  switch (level) {
    case 1:
      return "三级甲等";
      break;
    case 2:
      return "三级乙等";
      break;
    case 3:
      return "三级丙等";
      break;
    case 4:
      return "二级甲等";
      break;
    case 5:
      return "二级乙等";
      break;
    case 6:
      return "二级丙等";
      break;
    case 7:
      return "一级甲等";
      break;
    case 8:
      return "一级乙等";
      break;
    case 9:
      return "一级丙等";
      break;
    case 10:
      return "未知";
      break;
    default:
      break;
  }
}

//获取医院类型
export function setHospitalType(type) {
  switch (type) {
    case 1:
      return "综合医院";
      break;
    case 2:
      return "专科医院";
      break;
    case 3:
      return "整形美容医院";
      break;
    case 4:
      return "未知";
      break;
    default:
      break;
  }
}

//获取医院运营类型
export function setHospitalRunType(runType) {
  switch (runType) {
    case 1:
      return "国营医院";
      break;
    case 2:
      return "股份制医院";
      break;
    case 3:
      return "中外合资医院";
      break;
    case 4:
      return "合伙制医院";
      break;
    case 5:
      return "民营医院";
      break;
    case 6:
      return "未知";
      break;
    default:
      break;
  }
}

//获取医生职位
export function setDoctorDuty(id) {
  switch (id) {
    case 1:
      return "病区副护士长";
      break;
    case 2:
      return "病区护士长";
      break;
    case 3:
      return "采购";
      break;
    case 4:
      return "处长";
      break;
    case 5:
      return "床位医生";
      break;
    case 6:
      return "带组医生";
      break;
    case 7:
      return "负责人";
      break;
    case 8:
      return "副处长";
      break;
    case 9:
      return "副局长";
      break;
    case 10:
      return "副科长";
      break;
    case 11:
      return "副书记";
      break;
    case 12:
      return "副所长";
      break;
    case 13:
      return "副院长";
      break;
    case 14:
      return "副站长";
      break;
    case 15:
      return "副主任";
      break;
    case 16:
      return "进修护士";
      break;
    case 17:
      return "进修医生";
      break;
    case 18:
      return "局长";
      break;
    case 19:
      return "科副护士长";
      break;
    case 20:
      return "科护士长";
      break;
    case 21:
      return "科长";
      break;
    case 22:
      return "库管";
      break;
    case 23:
      return "秘书";
      break;
    case 24:
      return "普通职员";
      break;
    case 25:
      return "书记";
      break;
    case 26:
      return "所长";
      break;
    case 27:
      return "院长";
      break;
    case 28:
      return "院长助理";
      break;
    case 29:
      return "站长";
      break;
    case 30:
      return "主管";
      break;
    case 31:
      return "主任";
      break;
    case 32:
      return "主任助理";
      break;
    case 33:
      return "助教";
      break;
    case 34:
      return "助理";
      break;
    case 35:
      return "住院部医生";
      break;
    case 36:
      return "总住院医师";
      break;
    case 37:
      return "组长";
      break;
    case 38:
      return "未知";
      break;
    default:
      break;
  }
}

//获取性别
export function setSex(type) {
  switch (type) {
    case 1:
      return "男";
      break;
    case 2:
      return "女";
      break;
    case 3:
      return "保密";
      break;
    default:
      break;
  }
}

//获取医生状态
export function setStatus(type) {
  switch (type) {
    case 1:
      return "在职";
      break;
    case 2:
      return "离职";
      break;
    default:
      break;
  }
}
//医生学历
export function setEducation(type) {
  switch (type) {
    case 1:
      return "学士/大学本科";
      break;
    case 2:
      return "大专";
      break;
    case 3:
      return "博士";
      break;
    case 4:
      return "初中级以下";
      break;
    case 5:
      return "硕士";
      break;
    case 6:
      return "高中";
      break;
    case 7:
      return "中专";
      break;
    case 8:
      return "其他";
      break;
    default:
      break;
  }
}
//专业人士分类
export function setDoctorType(type) {
  switch (type) {
    case 1:
      return "护师（士）";
      break;
    case 2:
      return "技师（士）";
      break;
    case 3:
      return "检验师（士）";
      break;
    case 4:
      return "其他卫生技术人员";
      break;
    case 5:
      return "药剂师（士）";
      break;
    case 6:
      return "执业医师";
      break;
    default:
      break;
  }
}

//医生头衔
export function setAcademicTitle(type) {
  switch (type) {
    case 1:
      return "副教授";
      break;
    case 2:
      return "副研究员";
      break;
    case 3:
      return "讲师";
      break;
    case 4:
      return "教授";
      break;
    case 5:
      return "无学术职称";
      break;
    case 6:
      return "研究院";
      break;
    case 7:
      return "助教";
      break;
    case 8:
      return "未知";
      break;
    default:
      break;
  }
}

//时间格式转换
export function timeFormat(time) {
  // 时间格式化 2019-09-08
  var datetime = new Date();
  datetime.setTime(time);
  var year = datetime.getFullYear();
  var month =
    datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  var day = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  return year + "-" + month + "-" + day;
}

//时间格式转换  2019-09-08 14：50：00
export function minutesTimeFormat(time) {
  var datetime = new Date();
  datetime.setTime(time);
  var year = datetime.getFullYear();
  var month =
    datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
  var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  return year + "-" + month + "-" + date + "  " + hour + ":" + minute + ":" + "00";
}

// 开始时间为当前时间的前两天
export function minDate() {
  let minDate = new Date(new Date() - 172800000);
  let time = new Date(minDate);
  return time;
}
