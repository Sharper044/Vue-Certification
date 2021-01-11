<template>
  <div>
    <h1>STG YouTuber</h1>
    <nav>
      <!-- #routeing -->
      <router-link to="/">Home</router-link>
      <router-link v-if="this.$store.state.isAuthenticated" to="/favorites">Favorites</router-link>
      <router-link v-if="this.$store.state.isAuthenticated" to="/search">Search</router-link>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<!-- #styles Add "scoped" attribute to limit CSS to this component only -->
<!-- #styles Other ways include importing a css file, or a css preprocessor but was not done in this project -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  nav a {
    padding: 20px;
  }
</style>
