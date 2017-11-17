import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AddItem from '@/components/AddItem'
import ShowItem from '@/components/ShowItem'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '/',
      component: Login
    },
    {
      path: '/AddItem',
      name: 'AddItem',
      component: AddItem,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ShowItem',
      name: 'ShowItem',
      component: ShowItem,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('/')
  else if (!requiresAuth && currentUser) next('AddItem')
  else next()
})
export default router
