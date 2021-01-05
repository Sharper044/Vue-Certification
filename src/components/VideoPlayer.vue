<template>
  <div>
    <youtube 
      :video-id="this.video.id.videoId" 
      ref="youtube"
    />
    <h1>{{ this.video.snippet.title }}</h1>
    <Favorited :videoId="video.id.videoId" />
    <p>{{ this.video.snippet.description }}</p>
  </div>
</template>

<script>
  import Favorited from './Favorited';
  export default {
    name: 'VideoPlayer',
    components: { Favorited },
    props: ['video'],
  }
</script>

<style scoped>
  
</style>