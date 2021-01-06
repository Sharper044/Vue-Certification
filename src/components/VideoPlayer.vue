<template>
  <div class="video-player">
    <youtube 
      :video-id="this.video.id.videoId" 
      ref="youtube"
    />
    <h1>{{ this.video.snippet.title }}</h1>
    <Favorited :videoId="video.id.videoId" class="show-on-hover"/>
    <p>{{ this.video.snippet.description }}</p>
  </div>
</template>

<script>
  import Favorited from './Favorited';
  export default {
    name: 'VideoPlayer',
    components: { Favorited },
    props: {
      video: Object 
    },
  }
</script>

<style scoped>
  .video-player .show-on-hover {
    display: none;
  }

  .video-player:hover .show-on-hover {
    display: inline-block;
  }
</style>