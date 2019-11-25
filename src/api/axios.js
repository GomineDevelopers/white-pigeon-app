import { get, post } from "./http";
let api = {
  login: params => post("/Course/lists", params)
};
export default api;
