import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Tchat from '@/pages/Tchat'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        return firebase.auth().currentUser ? next('/') : next();
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        return firebase.auth().currentUser ? next('/') : next();
      }
    },
    {
      path: '/',
      name: 'tchat',
      component: Tchat,
      beforeEnter: (to, from, next) => {
        return !firebase.auth().currentUser ? next('/login') : next()

      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
