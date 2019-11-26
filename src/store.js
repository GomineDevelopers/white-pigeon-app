import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "32432423"
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", JSON.stringify(token));
    }
  },
  actions: {}
});
