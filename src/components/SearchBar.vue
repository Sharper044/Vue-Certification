<template>
  <div class="search-bar">
    <input
      id="search"
      v-model="searchString"
      type="text"
      name="search" 
    />
    <button @click="submit">Search</button>
  </div>
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
      submit: function (e) {
        e.preventDefault();
        this.onSubmit(this.searchString);
        if (this.clearSearchOnSubmit) { this.searchString = ''; }
      }
    },
    props: {
      onSubmit: Function,
      clearSearchOnSubmit: Boolean
    }
  }
</script>

<style scoped>
  
</style>