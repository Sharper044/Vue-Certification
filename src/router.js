import Vue from 'vue';
import Router from 'vue-router';

import store from './store';
import Favorites from './views/Favorites.vue';
import Landing from './views/Landing.vue';
import NotFound from './views/NotFound.vue';
import Search from './views/Search.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { 
      path: '/', 
      name: 'Home', 
      component: Landing 
    },
    { 
      path: '/favorites', 
      name: 'Favorites', 
      component: Favorites,
      beforeEnter: (to, from, next) => {
        if (store.state.isAuthenticated) {
          next();
        } else {
          next({ name:'Home' });
        }
      }
    },
    { 
      path: '/search', 
      name: 'Search', 
      component: Search,
      beforeEnter: (to, from, next) => {
        if (store.state.isAuthenticated) {
          next();
        } else {
          next({ name:'Home' });
        }
      }
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
  ]
});
