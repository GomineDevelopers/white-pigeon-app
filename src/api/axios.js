import {
  get,
  post
} from "./http";
let api = {
  register: params => post("/membercreate/createMember", params),
  authCode: params => post("/sendCode", params),
  loginPassword: params => post("/membercreate/login", params),
  loginSMS: params => post("", params),
};
export default api;