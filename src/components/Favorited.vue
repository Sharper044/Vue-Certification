// this is a #component imported by other components.
<template>
  <!-- #event handling -->
  <div class="favorited" @click="this.toggleFavorited">
    <!-- #vue directives -->
    <img v-if="this.favorited" src="@/assets/favorited.png" alt="Video saved in favorites."/>
    <img v-if="!this.favorited" src="@/assets/not-favorited.png" alt="Save video in favorites."/>
  </div>
</template>

<script>
  // #destructuring 
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Favorited',
    // #props
    props: {
      videoId: String
    },
    computed: {
      // #spread operator
      ...mapState(['favoriteVideos']),
      favorited: function () {
        // #map
        return this.favoriteVideos.map(video => video.id.videoId).includes(this.videoId);
      }
    },
    methods: {
      ...mapActions([ 'addFavorite', 'removeFavorite' ]),
      toggleFavorited: function() {
        this.favorited ? this.removeFavorite(this.videoId) : this.addFavorite(this.videoId);
      }
    }
  }
</script>

<style scoped>
  .favorited {
    display: flex;
    align-items: center;
  }
</style>
