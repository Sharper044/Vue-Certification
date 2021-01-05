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
      submitSearch: function (e) {
        e.preventDefault();
        this.onSubmit(this.searchString);
        if (this.clearSearchOnSubmit) { this.searchString = ''; }
      }
    },
    props: ['onSubmit', 'clearSearchOnSubmit']
  }
</script>

<style scoped>
  
</style>