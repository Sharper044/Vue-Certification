<template>
  <ul class="searchAside">
    <li v-for="(result, index) in this.searchResults" :key="result.etag" @click="setSelectedVideoIndex(index)">
      <img
        :src="result.snippet.thumbnails.default.url"
        :alt="result.snippet.title"
        height="90px"
        width="120px"
      >
      <h4>{{ result.snippet.title }}</h4>
      <p>{{ result.snippet.description }}</p>
    </li>
  </ul>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'SearchResultsAside',
    computed: mapState(['searchResults']),
    props: ['setSelectedVideoIndex']
  }
</script>

<style scoped>
  .searchAside {
    width: 200px;
  }
</style>