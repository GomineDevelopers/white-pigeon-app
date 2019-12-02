import { get, post } from "./http";
let api = {
  userInfo: params => post("/membercreate/user", params), //用户信息
  register: params => post("/membercreate/createMember", params), //注册
  authCode: params => post("/sendCode", params), //获取验证码
  loginPassword: params => post("/membercreate/login", params), //密码登录
  changePassword: params => post("/membercreate/changePassword", params), //修改密码
  forgetPassword: params => post("/membercreate/forgetPassword", params), //忘记密码
  loginSMS: params => post("", params), //短信登录
  question: params => post("/membercreate/question", params), //答题
  referraCode: params => post("/membercreate/referraCode", params), //推荐码
  selectProvice: params => post("/membercreate/selectProvice", params), //用户选择省
  completeUserInfo: params => post("membercreate/completeUser", params), //完善用户信息
  hospitalinit: params => post("hospitalManager/hospitalinit", params), //用户所在地区的医院信息
  hospitalList: params => post("hospitalManager/hospitalList", params), //医院搜索
  hospitalBlank: params => post("hospitalManager/hospitalBlank", params), //空白医院
  hospitalNotDevelop: params => post("hospitalManager/hospitalNotDevelop", params), //不可开发医院
  hospitalDevelopment: params => post("hospitalManager/hospitalDevelopment", params), //开发中医院
  hospitalDevelopd: params => post("hospitalManager/hospitalDevelopd", params), //已开发医院
  hospitalGetProductName: params => post("hospitalManager/hospitalGetProductName", params), //获取产品名称
  hospitalApply: params => post("hospitalManager/hospitalApply", params), //空白医院提交申请
  hospitalDevelopmentApply: params => post("hospitalManager/hospitalDevelopmentApply", params), //开发中医院提交申请
  hospitalDevelopdApply: params => post("hospitalManager/hospitalDevelopdApply", params), //已开发医院提交申请
  hospitalManagerList: params => post("hospitalManager/hospitalManagerList", params), //申请列表页
  hospitalManagerDetail: params => post("hospitalManager/hospitalManagerDetail", params), //申请列表页详情
  hospitalGetSection: params => post("hospitalManager/hospitalGetSection", params), //科室列表
  regionApprove: params => post("/regionManager/regionApprove", params), //区域经理审核医院产品列表
  regionProDetial: params => post("/regionManager/regionHospitalProductDetail", params), //区域经理审核产品详情
  regionProPass: params => post("/regionManager/regionHospitalProductSubmit", params), //区域经理审核产品通过
  regionProRefuse: params => post("/regionManager/regionHospitalProductRefuse", params), //区域经理审核产品拒绝
  regionDoctorList: params => post("/regionManager/regionDoctorList", params), //区域经理审核医生列表
  regionDoctorDetail: params => post("/regionManager/regionDoctorDetail", params), //区域经理审核医生详情
  regionDoctorCheck: params => post("/regionManager/regionDoctorCheck", params), //区域经理审核医生（通过&拒绝）
  bankFill: params => post("/signManager/BankFill", params), //补全银行卡信息

  hospitalApplyRecord: params => post("hospitalManager/hospitalApplyRecord", params) //申请记录数目
};
export default api;
