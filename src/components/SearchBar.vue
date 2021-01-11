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
    // #reactive data object. This object is directly connected to the value in the template from v-model.
    data() {
      return {
        searchString: ''  
      }
    },
    methods: {
      // #closure a function in a function, though there are no protected variables in this instance.
      submit: function (e) {
        e.preventDefault();
        // #this keyword - the local instance, defaulting to window, but in vue componets (since they are class based) referes to the componet.
        this.onSubmit(this.searchString);
        if (this.clearSearchOnSubmit) { this.searchString = ''; }
      }
    },
    // #props
    props: {
      onSubmit: Function,
      clearSearchOnSubmit: Boolean
    }
  }
</script>

<style scoped>
  
</style>