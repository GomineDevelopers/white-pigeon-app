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
import { Cookie } from "@/js/cookie";

Vue.prototype.$api = api;
Vue.prototype.$ = jquery;
Vue.prototype.$Cookie = Cookie;

// 获取本地存储token
// (() => {
//   let localToken = localStorage.getItem('token');
//   store.commit("setToken", localToken);
// })();

// 检查用户登录状态
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token"); //从localStorage中取用户uid
  //以下几个路由无需token
  if (
    to.path == "/retrievePassword" ||
    to.path == "/loginsms" ||
    to.path == "/register" ||
    to.path == "/loginprotocol"
  ) {
    next();
  } else {
    if (token) {
      store.commit("setToken", token);
      if (store.state.userInfo.length == 0) {
        console.log("用户信息不存在！");
        api
          .userInfo()
          .then(res => {
            console.log("用户信息", res);
            if (res.code == 200) {
              store.state.userInfo = res.user;
              if (store.state.userInfo.is_regional_mangager == 1) {
                //本地存储区域经理的角色  1-经理  2-普通用户
                router.replace({ path: "/approveindex" });
              } else {
                if (
                  (store.state.userInfo.invite_code == null ||
                    store.state.userInfo.invite_code == "") &&
                  store.state.userInfo.identify_status != 1
                ) {
                  router.replace({ path: "/answer" });
                } else {
                  next();
                }
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        if (store.state.userInfo.is_regional_mangager == 1) {
          //本地存储区域经理的角色  1-经理  2-普通用户
          router.replace({ path: "/approveindex" });
        } else {
          if (
            (store.state.userInfo.invite_code == null || store.state.userInfo.invite_code == "") &&
            store.state.userInfo.identify_status != 1
          ) {
            router.replace({ path: "/answer" });
          } else {
            next();
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
