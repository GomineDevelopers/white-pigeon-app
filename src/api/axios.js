import {
  get,
  post
} from "./http";
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
  hospitalinit: params => post("hospitalManager/hospitalinit", params), //用户所在地区的医院信息
};
export default api;