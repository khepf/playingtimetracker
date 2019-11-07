import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store';

import HomePage from './views/HomePage.vue';

import TopStories from './views/TopStories.vue';
import CodeExamples from './views/CodeExamples.vue';
import MyFavorites from './views/MyFavorites.vue';

import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Dashboard from './views/Dashboard.vue';

Vue.use(Router);

class RouteMeta {
  title: string;

  constructor({title}: { title: string }) {
    this.title = title;
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: new RouteMeta({ title: 'Playing Time Tracker' })
    },
    {
      path: '/top-stories',
      name: 'top-stories',
      component: TopStories,
      meta: new RouteMeta({ title: 'Playing Time Tracker' })
    },
    {
      path: '/code-examples',
      name: 'code-examples',
      component: CodeExamples,
      meta: new RouteMeta({ title: 'Code Examples' })
    },
    {
      path: '/my-favorites',
      name: 'my-favorites',
      component: MyFavorites,
      meta: new RouteMeta({ title: 'Favorites' })
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: new RouteMeta({ title: 'Playing Time Tracker' })
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: new RouteMeta({ title: 'Playing Time Tracker' })
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: new RouteMeta({ title: 'Playing Time Tracker' })
    }
  ]
});

// This callback runs before every route change, including on initial load
router.beforeEach((to, from, next) => {

  const routeMeta = to.meta as RouteMeta;
  store.dispatch('topToolbar/changeTitle', routeMeta.title);
  next();
});

export default router;
