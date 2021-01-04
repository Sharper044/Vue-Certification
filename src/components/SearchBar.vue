<template>
  <form id="searchBar" @submit="submitSearch">
    <input
      id="search"
      v-model="searchString"
      type="text"
      name="search" 
    />
    <button type="submit" form="searchBar" value="Submit">Search</button>
  </form>
</template>

<script>
  export default {
    name: 'SearchBar',
    data() {
      return {
        searchString: ''  
      }
    },
    methods: {
      submitSearch: function () {
        this.onSubmit(this.searchString);
        this.searchString = '';
      }
    },
    props: ['onSubmit']
  }
</script>

<style scoped>
  
</style>