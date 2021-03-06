import store from './store';
import Favorites from './views/Favorites.vue';
import Landing from './views/Landing.vue';
import NotFound from './views/NotFound.vue';
import Search from './views/Search.vue';

// #routing
export default [
  { 
    path: '/', 
    name: 'Home', 
    component: Landing 
  },
  { 
    path: '/favorites', 
    name: 'Favorites', 
    component: Favorites,
    // #arrow function
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
];
