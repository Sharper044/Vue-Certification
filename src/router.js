import Vue from 'vue';
import Router from 'vue-router';

import Favorites from './views/Favorites.vue';
import Landing from './views/Landing.vue';
import NotFound from './views/NotFound.vue';
import Search from './views/Search.vue';

Vue.use(Router);

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Landing 
  },
  { 
    path: '/favorites', 
    name: 'Favorites', 
    component: Favorites 
  },
  { 
    path: '/search', 
    name: 'Search', 
    component: Search 
  },
  { 
    path: '/not-found', 
    name: 'Not Found', 
    component: NotFound 
  },
  {
    path: '*',
    redirect: '/not-found'
  }
];

export default new Router({ routes });
