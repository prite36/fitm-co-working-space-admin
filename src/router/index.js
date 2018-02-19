import Vue from 'vue'
import Router from 'vue-router'
import AddItem from '@/components/AddItem'
import Editdelete from '@/components/Editdelete'
import MonitorBooking from '@/components/MonitorBooking'
import sendInfo from '@/components/sendInfo'

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
      path: '/Editdelete',
      name: 'Editdelete',
      component: Editdelete
    },
    {
      path: '/sendInfo',
      name: 'sendInfo',
      component: sendInfo
    }
  ]
})

export default router
