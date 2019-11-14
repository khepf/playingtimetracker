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

import firebase from 'firebase';

Vue.use(Router);

class RouteMeta {
  title: string;
  requiresAuth: boolean;

  constructor({title}: { title: string }, {requiresAuth}: {requiresAuth: boolean}) {
    this.title = title;
    this.requiresAuth = requiresAuth;
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: new RouteMeta({ title: 'Playing Time Tracker'}, {requiresAuth: false })
    },
    {
      path: '/top-stories',
      name: 'top-stories',
      component: TopStories,
      meta: new RouteMeta({ title: 'Playing Time Tracker' }, { requiresAuth: false })
    },
    {
      path: '/code-examples',
      name: 'code-examples',
      component: CodeExamples,
      meta: new RouteMeta({ title: 'Code Examples' }, { requiresAuth: false })
    },
    {
      path: '/my-favorites',
      name: 'my-favorites',
      component: MyFavorites,
      meta: new RouteMeta({ title: 'Favorites' }, { requiresAuth: false })
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: new RouteMeta({ title: 'Playing Time Tracker' }, { requiresAuth: false })
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: new RouteMeta({ title: 'Playing Time Tracker' }, { requiresAuth: false })
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: new RouteMeta({ title: 'Playing Time Tracker' }, { requiresAuth: true })
    }
  ]
});

// This callback runs before every route change, including on initial load
router.beforeEach((to, from, next) => {

  const routeMeta = to.meta as RouteMeta;
  store.dispatch('topToolbar/changeTitle', routeMeta.title);
  next();

  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('home');
  else if (!requiresAuth && currentUser) next('Dashboard');
  else next();
});

export default router;
