<template>
  <div>
    <div v-if="this.searchResults.length">
      <youtube 
        :video-id="this.searchResults[this.selectedVideoIndex].id.videoId" 
        ref="youtube"
      />
      <h1>{{ this.searchResults[this.selectedVideoIndex].snippet.title }}</h1>
      <p>{{ this.searchResults[this.selectedVideoIndex].snippet.description }}</p>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'VideoPlayer',
    props: ['selectedVideoIndex'],
    computed: mapState(['searchResults'])
  }
</script>

<style scoped>
  
</style>