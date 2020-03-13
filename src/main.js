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
import { List, Toast } from "vant";

Vue.use(List);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: "4vWwiDYUhYY3S5uLoPbZqUEz"
});

Vue.prototype.$api = api;
Vue.prototype.$ = jquery;

// 检查用户登录状态
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token"); //从localStorage中取用户uid
  //以下几个路由无需token
  if (
    to.path == "/retrievePassword" ||
    to.path == "/loginsms" ||
    to.ath == "/loginpassword" ||
    to.path == "/register" ||
    to.path == "/loginprotocol"
  ) {
    next();
  } else {
    if (token) {
      store.commit("setToken", token);
      // console.log("localStorage", localStorage.getItem("isAnswer"));
      // console.log("localStorage", localStorage.getItem("role"));
      if (localStorage.getItem("role") == 1) {
        if (
          to.path == "/approveindex" ||
          to.path == "/doctorapprove" ||
          to.path == "/hospitalapprove" ||
          to.path == "/productbonus" ||
          to.path == "/totalbonus" ||
          to.path == "/flowdirectiondownload" ||
          to.path == "/feedbacklist" ||
          to.path == "/loginpassword" ||
          to.path == "/loginsms" ||
          to.path == "/retrievePassword" ||
          to.path == "/register" ||
          to.path == "/loginprotocol"
        ) {
          next(); //注意在router.beforeEach中一定要用next()来跳出导航循环
        } else {
          //如果用户去的页面不是登录页则跳转登录页
          next("/approveindex");
        }
      } else {
        // console.log("普通账号！");
        if (to.path == "/approveindex") {
          next("/");
        } else {
          if (localStorage.getItem("isAnswer") == "true") {
            next();
          } else if (localStorage.getItem("isAnswer") == "false") {
            if (to.path == "/answer") {
              next(); //注意在router.beforeEach中一定要用next()来跳出导航循环
            } else {
              //如果用户去的页面不是登录页则跳转登录页
              next("/answer");
            }
          }
        }
      }
    } else {
      Toast("请先登录！");
      if (to.path == "/loginpassword") {
        next(); //注意在router.beforeEach中一定要用next()来跳出导航循环
      } else {
        //如果用户去的页面不是登录页则跳转登录页
        next("/loginpassword");
      }
    }
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
