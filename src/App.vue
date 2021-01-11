<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
  import Header from './components/Header.vue'

  // there were no #lifecycle hooks needed for this app, since all effects are trigered by clicks. but if they were needed they would be created in the export default below.
  export default {
    name: 'App',
    components: {
      Header
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
