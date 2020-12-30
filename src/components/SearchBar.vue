<template>
  <form id="searchBar" @submit="submitSearch">
    <input
      id="search"
      v-model="searchString"
      type="text"
      name="search" 
    />
    <input type="submit" style="display: none" />
    <button type="submit" form="searchBar" value="Submit">Search</button>
  </form>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'SearchBar',
    data() {
      return {
        searchString: ''  
      }
    },
    methods: {
      ...mapActions([ 'getSearchResults' ]),
      submitSearch: function () {
        this.getSearchResults(this.searchString);
        this.searchString = '';
      }
    }
  }
</script>

<style scoped>
  
</style>