<template>
  <div>
    <h3>Favorites Page</h3>
    <SearchBar :onSubmit="this.filterFavorites"/>
    <div class="sort-buttons">
      <p>Sort favorites by: </p>
      <button @click="setSort('titleDecending')">Title (A->Z)</button>
      <button @click="setSort('titleAcending')">Title (Z->A)</button>
      <button @click="setSort('dateDecending')">Date Added (Newest First)</button>
      <button @click="setSort('dateAcending')">Date Added (Oldest First)</button>
      <button @click="setSort('none')">Most recently favorited</button>
    </div>
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

  const sortFunctions = {
    titleDecending(vidA, vidB) {
      return vidA.snippet.title < vidB.snippet.title ? 
        -1 : 
        vidA.snippet.title > vidB.snippet.title ?
          1 :
          0;
    },
    titleAcending(vidA, vidB) {
      return vidA.snippet.title > vidB.snippet.title ? 
        -1 : 
        vidA.snippet.title < vidB.snippet.title ?
          1 :
          0;
    },
    dateDecending(vidA, vidB) {
      return new Date(vidB.snippet.publishedAt) - new Date(vidA.snippet.publishedAt);
    },
    dateAcending(vidA, vidB) {
      return new Date(vidA.snippet.publishedAt) - new Date(vidB.snippet.publishedAt);
    },
    none: null
  }

  export default {
    name: 'Favorites',
    components: {
      SearchBar,
      SearchResultsAside,
      VideoPlayer
    },
    computed: mapState({
      filteredFavoritesVideos (state) {
        let videos = [...state.favoriteVideos];

        if (this.filterString.length !== 0) {
          videos = videos.filter(
            video => video.snippet.title.includes(this.filterString) || video.snippet.description.includes(this.filterString)
          )
        }

        if (this.sortFunction) {
          videos.sort(this.sortFunction);
        }

        return videos;
      }
    }),
    data() {
      return {
        selectedVideoIndex: 0,
        filterString: '',
        sortFunction: null
      }
    },
    methods: {
      filterFavorites: function (searchString) {
        this.selectedVideoIndex = 0;
        this.filterString = searchString;
      },
      setSelectedVideoIndex: function (newIndex) {
        this.selectedVideoIndex = newIndex;
      },
      setSort: function (functionName) {
        this.sortFunction = sortFunctions[functionName];
      }

    }
  }
</script>

<style scoped>
  main {
    display: flex;
    padding: 50px;
  }

  .sort-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
