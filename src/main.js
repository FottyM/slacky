// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import store from './store'


const config = {
  apiKey: "AIzaSyBfLtg5ZdC5MjKeM_EE1qucDvSAvIM1194",
  authDomain: "slacky-22801.firebaseapp.com",
  databaseURL: "https://slacky-22801.firebaseio.com",
  projectId: "slacky-22801",
  storageBucket: "slacky-22801.appspot.com",
  messagingSenderId: "982557315950"
};

firebase.initializeApp(config);
window.firebase = firebase;


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
