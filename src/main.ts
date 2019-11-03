import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/store';
import * as firebase from 'firebase';

Vue.config.productionTip = false;

const configOptions = {
  apiKey: 'AIzaSyBKxBBOGS9FIIdWPPKRBAG8hJYmSOIN7Pg',
  authDomain: 'playing-time-tracker-73665.firebaseapp.com',
  databaseURL: 'https://playing-time-tracker-73665.firebaseio.com',
  projectId: 'playing-time-tracker-73665',
  storageBucket: 'playing-time-tracker-73665.appspot.com',
  messagingSenderId: '825843284810',
  appId: '1:825843284810:web:4ac6f4ed4a88bffb3d9fb3',
  measurementId: 'G-3BNQ2SD295'
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch('fetchUser', user);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
