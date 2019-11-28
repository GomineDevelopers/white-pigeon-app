import axios from "axios";
import QS from "qs";
import {
  Toast
} from "vant";
import store from "@/store";
// console.log(store.state);

// 环境的切换
// if (process.env.NODE_ENV == "development") {
//   axios.defaults.baseURL = "http://api.zjsx.com";
// } else if (process.env.NODE_ENV == "debug") {
//   axios.defaults.baseURL = "";
// } else if (process.env.NODE_ENV == "production") {
//   axios.defaults.baseURL = "";
// }

axios.defaults.timeout = 10000; //设置请求超时
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8"; //设置post请求头

// 请求拦截
axios.interceptors.request.use(
  config => {
    const token = store.state.token;
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // var newToken = response.headers.authorization
    // 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token
    if (response.headers.authorization) {
      let newToken = response.headers.authorization
      // console.log("newToken", newToken.split(" ")[1])
      store.dispatch('refreshToken', newToken.split(" ")[1])
    }

    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    // console.log(response);
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 根据返回的状态码进行相关操作，例如登录过期提示，错误提示等等
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: "/loginpassword",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 403:
          Toast({
            message: "登录过期，请重新登录",
            duration: 1000,
            forbidClick: true
          });
          // 清除token
          localStorage.removeItem("token");
          store.commit("setToken", null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;

          // 404请求不存在
        case 404:
          Toast({
            message: "请求资源不存在",
            duration: 1500,
            forbidClick: true
          });
          store.commit("setToken", null);
          localStorage.removeItem("token");
          break;
          // 其他错误，直接抛出错误提示
        case 101:
          Toast({
            message: "用户不存在",
            duration: 1500,
            forbidClick: true
          });
          break;
        case 9000:
          Toast({
            message: "网络错误，请重试",
            duration: 1500,
            forbidClick: true
          });
          break;
        default:
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          });
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}