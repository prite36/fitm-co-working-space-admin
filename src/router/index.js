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
import historybooking from '@/components/historyBooking'
import editbooking from '@/components/editBooking'
import addAdmin from '@/components/addAdmin'
import Chartkick from 'chartkick'
import configure from '@/components/configure'
import VueChartkick from 'vue-chartkick'

Vue.use(Router)
Vue.use(VueChartkick, { Chartkick })

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/additem',
      name: 'additem',
      component: AddItem
    },
    {
      path: '/configure',
      name: 'configure',
      component: configure
    },
    {
      path: '/addAdmin',
      name: 'addAdmin',
      component: addAdmin
    },
    {
      path: '/editbooking',
      name: 'editbooking',
      component: editbooking
    },
    {
      path: '/historybooking',
      name: 'historybooking',
      component: historybooking
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
