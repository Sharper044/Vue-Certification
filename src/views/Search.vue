<template>
  <div>
    <h3>Search Page</h3>
    <SearchBar/>
    <main>
      <SearchResultsAside :setSelectedVideoIndex="this.setSelectedVideoIndex"/>
      <VideoPlayer :selectedVideoIndex="this.selectedVideoIndex"/>
    </main>
  </div>
</template>

<script>
  import SearchBar from '../components/SearchBar';
  import SearchResultsAside from '../components/SearchResultsAside';
  import VideoPlayer from '../components/VideoPlayer';

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
    methods: {
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
