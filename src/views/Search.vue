<template>
  <div>
    <h3>Search Page</h3>
    <SearchBar :onSubmit="this.getSearchResults"/>
    <main>
      <SearchResultsAside :videoItems="this.searchResults" :setSelectedVideoIndex="this.setSelectedVideoIndex"/>
      <VideoPlayer :video="this.searchResults[this.selectedVideoIndex]" v-if="this.searchResults.length"/>
    </main>
  </div>
</template>

<script>
  import SearchBar from '../components/SearchBar';
  import SearchResultsAside from '../components/SearchResultsAside';
  import VideoPlayer from '../components/VideoPlayer';
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Search',
    components: {
      SearchBar,
      SearchResultsAside,
      VideoPlayer
    },
    data () {
      return {
        selectedVideoIndex: 0
      }
    },
    computed: mapState(['searchResults']),
    methods: {
      ...mapActions([ 'getSearchResults' ]),
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
