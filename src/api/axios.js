import { get, post } from "./http";
let api = {
  login: params => post("/Course/lists", params),
  register: params => post("/api/membercreate/createMember", params),
  authCode: params => post("/api/sendCode", params)
};
export default api;
