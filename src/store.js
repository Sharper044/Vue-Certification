import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAuthenticated: false
  },
  mutations: {
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload
    }
  },
  actions: {
    login: ({commit}) => {
      commit('setIsAuthenticated', true);
    },
    logout: ({commit}) => {
      commit('setIsAuthenticated', false);
    }
  }
});

export default store;
