import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userInfo: []
  },
  mutations: {
    //设置token
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    // 用户刷新 token 成功，使用新的 token 替换掉本地的token
    refreshToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
      // axios.defaults.headers.common['Authorization'] = state.token
    }
  },
  actions: {
    // 将刷新的 token 保存至本地
    refreshToken({ commit }, token) {
      return new Promise(function(resolve, reject) {
        commit("refreshToken", token);
      });
    }
  }
});
