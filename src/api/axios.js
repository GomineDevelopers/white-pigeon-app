import { get, post } from "./http";
let api = {
  userInfo: params => post("/membercreate/user", params), //用户信息
  register: params => post("/membercreate/createMember", params), //注册
  authCode: params => post("/sendCode", params), //获取验证码
  loginPassword: params => post("/membercreate/login", params), //密码登录
  changePassword: params => post("/membercreate/changePassword", params), //修改密码
  forgetPassword: params => post("/membercreate/forgetPassword", params), //忘记密码
  loginSMS: params => post("", params), //短信登录
  updateCid: params => post("/membercreate/updateCid", params), //上传cid
  question: params => post("/membercreate/question", params), //答题
  referraCode: params => post("/membercreate/referraCode", params), //推荐码
  selectProvice: params => post("/membercreate/selectProvice", params), //用户选择省
  completeUserInfo: params => post("/membercreate/completeUser", params), //完善用户信息
  hospitalinit: params => post("/hospitalManager/hospitalinit", params), //用户所在地区的医院信息
  hospitalList: params => post("/hospitalManager/hospitalList", params), //医院搜索
  hospitalBlank: params => post("/hospitalManager/hospitalBlank", params), //空白医院
  hospitalNotDevelop: params =>
    post("/hospitalManager/hospitalNotDevelop", params), //不可开发医院
  hospitalDevelopment: params =>
    post("/hospitalManager/hospitalDevelopment", params), //开发中医院
  hospitalDevelopd: params => post("/hospitalManager/hospitalDevelopd", params), //已开发医院
  hospitalGetProductName: params =>
    post("/hospitalManager/hospitalGetProductName", params), //获取产品名称
  hospitalApply: params => post("/hospitalManager/hospitalApply", params), //空白医院提交申请
  hospitalDevelopmentApply: params =>
    post("/hospitalManager/hospitalDevelopmentApply", params), //开发中医院提交申请
  hospitalDevelopdApply: params =>
    post("/hospitalManager/hospitalDevelopdApply", params), //已开发医院提交申请
  hospitalManagerList: params =>
    post("/hospitalManager/hospitalManagerList", params), //申请列表页
  hospitalManagerDetail: params =>
    post("/hospitalManager/hospitalManagerDetail", params), //申请列表页详情
  hospitalGetSection: params =>
    post("/hospitalManager/hospitalGetSection", params), //科室列表
  hospitalGethospitalId: params =>
    post("/hospitalManager/hospitalGethospitalId", params), //医院列表
  hospitalManager: params => post("/hospitalManager/hospitalManager", params), //已开发医院搜索
  regionApprove: params => post("/regionManager/regionApprove", params), //区域经理审核医院产品列表
  regionProDetial: params =>
    post("/regionManager/regionHospitalProductDetail", params), //区域经理审核产品详情
  regionProPass: params =>
    post("/regionManager/regionHospitalProductSubmit", params), //区域经理审核产品通过
  regionProRefuse: params =>
    post("/regionManager/regionHospitalProductRefuse", params), //区域经理审核产品拒绝
  regionDoctorList: params => post("/regionManager/regionDoctorList", params), //区域经理审核医生列表
  regionDoctorDetail: params =>
    post("/regionManager/regionDoctorDetail", params), //区域经理审核医生详情
  regionDoctorCheck: params => post("/regionManager/regionDoctorCheck", params), //区域经理审核医生（通过&拒绝）
  bankFill: params => post("/signManager/BankFill", params), //补全银行卡信息
  doctorList: params => post("/doctorManager/doctorList", params), //搜索已通过医生列表
  createDoctor: params => post("/doctorManager/createDoctor", params), //创建医生
  applyRecord: params => post("/doctorManager/applyRecord", params), //创建医生列表
  doctorDetail: params => post("/doctorManager/doctorDetail", params), //申请医生详情
  meetingGetInfoByProductId: params =>
    post("/meetingManager/meetingGetInfoByProductId", params), //会议通过产品关联
  createMeeting: params => post("/meetingManager/createMeeting", params), //创建/提交会议
  meetingGetSection: params =>
    post("/meetingManager/meetingGetSection", params), //通过产品获取科室信息
  meetingApplyRecord: params =>
    post("/meetingManager/meetingApplyRecord", params), //会议统计
  meetingSumPeople: params => post("/meetingManager/meetingSumPeople", params), //会议总人数
  createList: params => post("/meetingManager/createList", params), //会议列表
  meetingGetProductList: params =>
    post("/meetingManager/meetingGetProductList", params), //获取筛选产品列表
  meetingDetail: params => post("/meetingManager/meetingDetail", params), //会议详情
  meetingEdit: params => post("/meetingManager/meetingEdit", params), //会议详情编辑提交
  hospitalDevelopdMeeting: params =>
    post("/hospitalManager/hospitalDevelopdMeeting", params), //会议详情编辑提交
  hospitalApplyRecord: params =>
    post("/hospitalManager/hospitalApplyRecord", params), //申请记录数目
  addFeedback: params => post("/feedbackManager/addFeedback", params), //帮助反馈
  loginOut: params => post("/membercreate/logout", params), //推出登录
  userCenterHospital: params =>
    post("/hospitalManager/hospitalManager", params), //个人中心我的医院
  userCenterProduct: params =>
    post("/hospitalManager/hospitalUserProduct", params), //个人中心我的产品
  userCenterStatistics: params => post("/membercreate/getMyApply", params), //个人中心会议、拜访、申请、积分统计
  notify: params => post("/signManager/SignNotice", params), //消息通知
  createVisit: params => post("/visitManager/createVisit", params), //创建拜访
  visitRelation: params =>
    post("/visitManager/visitGetInfoByHospitalId", params), //拜访关联接口
  visitGoal: params => post("/visitManager/visitGoal", params), //拜访目的
  visitList: params => post("/visitManager/visitList", params), //拜访记录
  visitEdit: params => post("/visitManager/visitEdit", params), //拜访编辑
  visitDetail: params => post("/visitManager/visitDetail", params), //拜访详情
  visitRecord: params => post("/visitManager/visitApplyRecord", params), //拜访记录
  developdVisit: params =>
    post("/hospitalManager/hospitalDevelopdVisit", params), //已开发拜访
  getContractInfo: params => post("/signManager/getContractInfo", params), //获取合同信息
  SignSubmit: params => post("/signManager/SignSubmit", params), //合同签署
  materialList: params => post("/MaterialManager/materialList", params), //新人自学
  materialDetail: params => post("/MaterialManager/materialDetail", params) //新人自学
};
export default api;
