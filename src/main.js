// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import store from './store'
import {config} from './config'

firebase.initializeApp(config);
window.firebase = firebase;


Vue.config.productionTip = false;


const unsubscribe = firebase.auth().onAuthStateChanged( user => {

  store.dispatch('setUser', user)

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })

  unsubscribe();


})

