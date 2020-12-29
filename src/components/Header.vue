<template>
  <div>
    <h1>{{ msg }}</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link v-if="this.$store.state.isAuthenticated" to="/favorites">Favorites</router-link>
      <router-link v-if="this.$store.state.isAuthenticated" to="/search">Search</router-link>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      msg: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
