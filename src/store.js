import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto';
import axios from 'axios';

Vue.use(Vuex);

// #block scoped const
// #Actions, Reducers and the Store
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
        // #spread operator
        state.favoriteVideos = [state.searchResults.find(video => video.id.videoId === payload.videoId), ...state.favoriteVideos];
      } else {
        // #filter
        state.favoriteVideos = state.favoriteVideos.filter(video => video.id.videoId !== payload.videoId);
      }
    },
  },
  actions: {
    // #destructuring
    login: ({commit}) => {
      commit('setIsAuthenticated', true);
    },
    logout: ({commit}) => {
      commit('setIsAuthenticated', false);
    },
    getSearchResults: async ({commit}, searchString) => {
      try {
        // #promises using async/await
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
