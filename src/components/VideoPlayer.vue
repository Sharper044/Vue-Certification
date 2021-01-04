<template>
  <div>
    <youtube 
      :video-id="this.video.id.videoId" 
      ref="youtube"
    />
    <h1>{{ this.video.snippet.title }}</h1>
    <p>{{ this.video.snippet.description }}</p>
  </div>
</template>

<script>
  export default {
    name: 'VideoPlayer',
    props: ['video'],
  }
</script>

<style scoped>
  
</style>