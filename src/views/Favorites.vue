<template>
  <div>
    <h3>Favorites Page</h3>
    <SearchBar :onSubmit="this.filterFavorites"/>
    <main v-if="this.filteredFavoritesVideos.length">
      <SearchResultsAside :videoItems="this.filteredFavoritesVideos" :setSelectedVideoIndex="this.setSelectedVideoIndex"/>
      <VideoPlayer :video="this.filteredFavoritesVideos[this.selectedVideoIndex]"/>
    </main>
    <p v-if="!this.filteredFavoritesVideos.length">Ether you have not favorited any videos, or your search doesn not match any of your favorited videos.</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import SearchBar from '../components/SearchBar';
  import SearchResultsAside from '../components/SearchResultsAside';
  import VideoPlayer from '../components/VideoPlayer';

  export default {
    name: 'Favorites',
    components: {
      SearchBar,
      SearchResultsAside,
      VideoPlayer
    },
    computed: mapState({
      filteredFavoritesVideos (state) {
        if (this.filterString.length === 0) {
          return state.favoriteVideos;
        } else {
          return state.favoriteVideos.filter(
            video => video.snippet.title.includes(this.filterString) || video.snippet.description.includes(this.filterString)
          )
        }
      }
    }),
    data() {
      return {
        selectedVideoIndex: 0,
        filterString: ''
      }
    },
    methods: {
      filterFavorites: function (searchString) {
        this.selectedVideoIndex = 0;
        this.filterString = searchString;
      },
      setSelectedVideoIndex: function(newIndex) {
        this.selectedVideoIndex = newIndex;
      }
    }
  }
</script>

<style scoped>
  main {
    display: flex;
    padding: 50px;
  }
</style>
