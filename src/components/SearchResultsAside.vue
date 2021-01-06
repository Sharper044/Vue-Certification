<template>
  <ul class="search-aside">
    <li v-for="(videoItem, index) in this.videoItems" :key="videoItem.etag" @click="setSelectedVideoIndex(index)">
      <img
        :src="videoItem.snippet.thumbnails.default.url"
        :alt="videoItem.snippet.title"
        height="90px"
        width="120px"
      >
      <Favorited class="show-on-hover" :videoId="videoItem.id.videoId" />
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
    props: {
      setSelectedVideoIndex: Function,
      videoItems: Array
    }
  }
</script>

<style scoped>
  .search-aside {
    width: 200px;
  }
  
  li .show-on-hover {
    display: none;
  }

  li:hover .show-on-hover {
    display: inline-block;
  }
</style>