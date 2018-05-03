import Vue from 'vue'
import Router from 'vue-router'
import AddItem from '@/components/AddItem'
import Editdelete from '@/components/Editdelete'
import MonitorBooking from '@/components/MonitorBooking'
import sendInfo from '@/components/sendInfo'
import Feedback from '@/components/Feedback'
import Statistic from '@/components/Statistic'
import BlockUser from '@/components/BlockUser'
import Unblock from '@/components/Unblock'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/additem',
      name: 'additem',
      component: AddItem
    },
    {
      path: '/',
      name: 'monitorbooking',
      component: MonitorBooking
    },
    {
      path: '/editdelete',
      name: 'editdelete',
      component: Editdelete
    },
    {
      path: '/sendinfo',
      name: 'sendInfo',
      component: sendInfo
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: Statistic
    },
    {
      path: '/blockuser',
      name: 'blockuser',
      component: BlockUser
    },
    {
      path: '/unblock',
      name: 'unblock',
      component: Unblock
    }
  ]
})

export default router
