<template>
  <ul class="searchAside">
    <li v-for="(videoItem, index) in this.videoItems" :key="videoItem.etag" @click="setSelectedVideoIndex(index)">
      <img
        :src="videoItem.snippet.thumbnails.default.url"
        :alt="videoItem.snippet.title"
        height="90px"
        width="120px"
      >
      <h4>{{ videoItem.snippet.title }}</h4>
      <p>{{ videoItem.snippet.description }}</p>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'SearchResultsAside',
    props: ['setSelectedVideoIndex', 'videoItems']
  }
</script>

<style scoped>
  .searchAside {
    width: 200px;
  }
</style>