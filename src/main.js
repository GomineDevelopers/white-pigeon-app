import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//自己的配置
import api from "./api/axios";
import BaiduMap from "vue-baidu-map";
import jquery from "jquery";
import "@/js/rem";
import "@/js/vant.js";
import "@/css/public.css";

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: "4vWwiDYUhYY3S5uLoPbZqUEz"
});
import { commonTools } from "@/js/public";

Vue.prototype.$api = api;
Vue.prototype.$commonTools = commonTools;
Vue.prototype.$ = jquery;

// 获取本地存储token
(() => {
  let localToken = localStorage.getItem("item");
  store.commit("setToken", localToken);
})();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
