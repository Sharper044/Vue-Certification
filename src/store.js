import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    searchResults: [],
    favoriteVideos: [],
  },
  mutations: {
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload;
    },
    setSearchResults: (state, payload) => {
      state.searchResults = payload;
    },
    setFavoriteVideos: (state, payload) => {
      if (payload.addFavorite) {
        state.favoriteVideos = [state.searchResults.find(video => video.id.videoId === payload.videoId), ...state.favoriteVideos];
      } else {
        state.favoriteVideos = state.favoriteVideos.filter(video => video.id.videoId !== payload.videoId);
      }
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
    },
    addFavorite: ({commit}, videoId) => {
      commit('setFavoriteVideos', {addFavorite: true, videoId});
    },
    removeFavorite: ({commit}, videoId) => {
      commit('setFavoriteVideos', {addFavorite: false, videoId});
    },
  }
});

export default store;
