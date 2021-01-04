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
    favoriteVideoIds: []
  },
  mutations: {
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload;
    },
    setSearchResults: (state, payload) => {
      state.searchResults = payload;
    },
    setFavoriteVideos: (state, payload) => {
      state.favoriteVideos = payload;
    },
    setFavoriteVideoIds: (state, payload) => {
      if (payload.addFavorite) {
        state.favoriteVideoIds = [payload.videoId, ...state.favoriteVideoIds];
      } else {
        state.favoriteVideoIds = state.favoriteVideoIds.filter(id => id !== payload.videoId);
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
      commit('setFavoriteVideoIds', {addFavorite: true, videoId});
    },
    removeFavorite: ({commit}, videoId) => {
      commit('setFavoriteVideoIds', {addFavorite: false, videoId});
    },
    getFavoriteVideos: async ({commit, state}) => {
      try {
        let result = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&id=${
            encodeURI(
              state.favoriteVideoIds.reduce((idString, id) => idString.length ? idString + ',' + id : id, '')
            )
          }&key=AIzaSyCrmoOmzDXuHcGS9qCzvO3JHiXYGKe0AKs`
        );
        commit('setFavoriteVideos', result?.data?.items);
      } catch (e) {
        console.error(e);
      }
    }
  }
});

export default store;
