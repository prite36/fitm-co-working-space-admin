import Vue from 'vue'
import Router from 'vue-router'
import AddItem from '@/components/AddItem'
import ShowItem from '@/components/ShowItem'
import MonitorBooking from '@/components/MonitorBooking'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/AddItem',
      name: 'AddItem',
      component: AddItem
    },
    {
      path: '/MonitorBooking',
      name: 'MonitorBooking',
      component: MonitorBooking
    },
    {
      path: '/ShowItem',
      name: 'ShowItem',
      component: ShowItem
    }
  ]
})

export default router
