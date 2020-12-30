import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    searchResults: []
  },
  mutations: {
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload;
    },
    setSearchResults: (state, payload) => {
      state.searchResults = payload;
    },
  },
  actions: {
    login: ({commit}) => {
      commit('setIsAuthenticated', true);
    },
    logout: ({commit}) => {
      commit('setIsAuthenticated', false);
    },
    getSearchResults: async ({commit}, searchString) => {
      try {
        let result = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURI(searchString)}&key=AIzaSyCrmoOmzDXuHcGS9qCzvO3JHiXYGKe0AKs`);
        commit('setSearchResults', result?.data?.items);
      } catch (e) {
        console.error(e);
      }
    }
  }
});

export default store;
