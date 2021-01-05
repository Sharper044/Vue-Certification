<template>
  <div class="favorited" @click="this.toggleFavorited">
    <img v-if="this.favorited" src="@/assets/favorited.png" alt="Video saved in favorites."/>
    <img v-if="!this.favorited" src="@/assets/not-favorited.png" alt="Save video in favorites."/>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Favorited',
    props: ['videoId'],
    computed: {
      ...mapState(['favoriteVideos']),
      favorited: function () {
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
