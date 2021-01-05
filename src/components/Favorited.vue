<template>
  <div class="favorited">
    <p>Favorited</p>
    <input type="checkbox" :checked="this.favorited" @change="this.toggleFavorited" />
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
