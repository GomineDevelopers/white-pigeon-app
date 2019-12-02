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
  hospitalApplyRecord: params => post("hospitalManager/hospitalApplyRecord", params), //申请记录数目
  hospitalManagerDetail: params => post("hospitalManager/hospitalManagerDetail", params) //申请列表页
};
export default api;
