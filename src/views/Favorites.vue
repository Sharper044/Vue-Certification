// This is a #component even though it is a larger view
<template>
  <div>
    <h3>Favorites Page</h3>
    <!-- #this keyword - the local instance, defaulting to window, but in vue componets (since they are class based) referes to the componet. -->
    <SearchBar :onSubmit="this.filterFavorites"/>
    <div class="sort-buttons">
      <p>Sort favorites by: </p>
      <button class="sort-button" @click="setSort('titleDescending')">Title (A->Z)</button>
      <button class="sort-button" @click="setSort('titleAscending')">Title (Z->A)</button>
      <button class="sort-button" @click="setSort('dateDescending')">Date Added (Newest First)</button>
      <button class="sort-button" @click="setSort('dateAscending')">Date Added (Oldest First)</button>
      <button class="sort-button" @click="setSort('lengthDescending')">Length (Shortest First)</button>
      <button class="sort-button" @click="setSort('lengthAscending')">Length (Longest First)</button>
      <button class="sort-button" @click="setSort('none')">Most recently favorited</button>
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

  // #block scoped const
  export const sortFunctions = {
    titleDescending(vidA, vidB) {
      return vidA.snippet.title < vidB.snippet.title ? 
        -1 : 
        vidA.snippet.title > vidB.snippet.title ?
          1 :
          0;
    },
    titleAscending(vidA, vidB) {
      return vidA.snippet.title > vidB.snippet.title ? 
        -1 : 
        vidA.snippet.title < vidB.snippet.title ?
          1 :
          0;
    },
    lengthDescending(vidA, vidB) {
      return vidA.duration - vidB.duration;
    },
    lengthAscending(vidA, vidB) {
      return vidB.duration - vidA.duration;
    },
    dateDescending(vidA, vidB) {
      return new Date(vidB.snippet.publishedAt) - new Date(vidA.snippet.publishedAt);
    },
    dateAscending(vidA, vidB) {
      return new Date(vidA.snippet.publishedAt) - new Date(vidB.snippet.publishedAt);
    },
    none: null
  }

  export const filterAndSortVideos = (state, filterString, sortFunction) => {
    // #block scoped let
    let videos = [...state.favoriteVideos];

        if (filterString.length !== 0) {
          // #filter
          videos = videos.filter(
            video => video.snippet.title.toLowerCase().includes(filterString.toLowerCase()) || video.snippet.description.toLowerCase().includes(filterString.toLowerCase())
          )
        }

        if (sortFunction) {
          videos.sort(sortFunction);
        }

        return videos;
  };

  export default {
    name: 'Favorites',
    components: {
      SearchBar,
      SearchResultsAside,
      VideoPlayer
    },
    computed: mapState({
      filteredFavoritesVideos: function (state) {
        return filterAndSortVideos(state, this.filterString, this.sortFunction)
      }
    }),
    // #reactive data object. This object is directly connected to the value in the template from v-bind or :.
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
