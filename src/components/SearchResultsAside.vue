<template>
  <ul class="searchAside">
    <li v-for="(videoItem, index) in this.videoItems" :key="videoItem.etag" @click="setSelectedVideoIndex(index)">
      <img
        :src="videoItem.snippet.thumbnails.default.url"
        :alt="videoItem.snippet.title"
        height="90px"
        width="120px"
      >
      <Favorited :videoId="videoItem.id.videoId" />
      <h4>{{ videoItem.snippet.title }}</h4>
      <p>{{ videoItem.snippet.description }}</p>
    </li>
  </ul>
</template>

<script>
  import Favorited from './Favorited';

  export default {
    name: 'SearchResultsAside',
    components: { Favorited },
    props: ['setSelectedVideoIndex', 'videoItems']
  }
</script>

<style scoped>
  .searchAside {
    width: 200px;
  }
</style>