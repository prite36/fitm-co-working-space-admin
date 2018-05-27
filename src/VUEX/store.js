import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import {firebaseMutations, firebaseAction} from 'vuexfire'

Vue.use(Vuex)
const moment = extendMoment(Moment)
// link database
let config = {
  apiKey: 'AIzaSyCe9ziSu83NGVd08_FnljSQj7dNCdtYS7w',
  authDomain: 'fitm-coworking-space.firebaseapp.com',
  databaseURL: 'https://fitm-coworking-space.firebaseio.com',
  projectId: 'fitm-coworking-space',
  storageBucket: '',
  messagingSenderId: '817891071163'
}
firebase.initializeApp(config)
let db = firebase.database()

// ผูกค่าตัวแปรกับค่าใน database
let Items = db.ref('items')
let Booking = db.ref('booking')
let Profile = db.ref('profile')
let Feedbacks = db.ref('feedbacks')
let Historys = db.ref('history')
let Configs = db.ref('configSystem')
// store
const store = new Vuex.Store({
  strict: true,
  state: {
    statusLogin: true,
    items: '',
    booking: {},
    profiles: {},
    feedbacks: [],
    historys: [],
    registerFilter: [],
    queryBooking: [],
    configs: {}
    // สร้างตัวแปร
  },
  getters: {
    statusLogin: state => state.statusLogin,
    items: state => state.items,
    booking: state => state.booking,
    profiles: state => state.profiles,
    feedbacks: state => state.feedbacks,
    registerFilter: state => state.registerFilter,
    queryBooking: state => state.queryBooking,
    configs: state => state.configs
    // ส่งตัวแปรไปหน้า component
  },
  mutations: {
    ...firebaseMutations,
    updateStatus (state, status) {
      state.statusLogin = status
    },
    // query โดยการเอาค่าวันที่มาวนเปรียบเทียบกับ booking ทุกตัวหากเงื่อไขตรงจะโยนไปเก็บใน queryBooking
    updateQueryBooking (state, date) {
      state.queryBooking = []
      delete state.booking['.key']
      for (var key1 in state.booking) {
        // console.log(state.booking[key1])
        for (var key2 in state.booking[key1]) {
          // console.log(state.booking[key1][key2])
          for (var key3 in state.booking[key1][key2]) {
            // console.log(state.booking[key1][key2][key3])
            for (var key4 in state.booking[key1][key2][key3]) {
              let data = state.booking[key1][key2][key3][key4]
              // console.log(data)
              if (date === data.dateStart && date === data.dateStop) {
                let bookingTime = {
                  timestart: data.timeStart,
                  timestop: data.timeStop,
                  typeitem: key2,
                  nameitem: key3
                }
                let packdata = {
                  data: data,
                  bookingTime: bookingTime
                }
                state.queryBooking.push(packdata)
              } else if (date === data.dateStart) {
                let bookingTime = {
                  timestart: data.timeStart,
                  timestop: '24:00',
                  typeitem: key2,
                  nameitem: key3
                }
                let packdata = {
                  data: data,
                  bookingTime: bookingTime
                }
                state.queryBooking.push(packdata)
              } else if (moment(date).isBetween(data.dateStart, data.dateStop)) {
                let bookingTime = {
                  timestart: '00:00',
                  timestop: '24:00',
                  typeitem: key2,
                  nameitem: key3
                }
                let packdata = {
                  data: data,
                  bookingTime: bookingTime
                }
                state.queryBooking.push(packdata)
              } else if (date === data.dateStop) {
                let bookingTime = {
                  timestart: '00:00',
                  timestop: data.timeStop,
                  typeitem: key2,
                  nameitem: key3
                }
                let packdata = {
                  data: data,
                  bookingTime: bookingTime
                }
                state.queryBooking.push(packdata)
              }
            }
          }
        }
      }
    },
    moveBookingToHistory (state, id) {
      delete state.booking['.key']
      // console.log(state.booking)
      for (var key1 in state.booking) {
        // console.log(state.booking[key1])
        for (var key2 in state.booking[key1]) {
          // console.log(state.booking[key1][key2])
          for (var key3 in state.booking[key1][key2]) {
            // console.log(state.booking[key1][key2][key3])
            for (var key4 in state.booking[key1][key2][key3]) {
              let data = state.booking[key1][key2][key3][key4]
              if (data.senderID === id) {
                let tmp = {}
                Booking.child(key1).child(key2).child(key3).child(key4).update({status: 'adminCancleBooking'})
                Booking.child(key1).child(key2).child(key3).child(key4).once('value', snapshot => {
                  tmp = snapshot.val()
                })
                Historys.child(tmp.id).update(tmp)
                Booking.child(key1).child(key2).child(key3).child(key4).remove()
              }
            }
          }
        }
      }
    },
    queryForregisterGraph (state, duration) {
      state.registerFilter = []
      if (state.profiles.guest) {
        let mapguest = Object.values(state.profiles.guest)
        let guest = mapguest.filter(
          guest => moment(guest.timestamp).isSame(duration, 'month')
        )
        state.registerFilter.push(guest)
      }
      if (state.profiles.student) {
        let mapstudent = Object.values(state.profiles.student)
        let student = mapstudent.filter(
          student => moment(student.timestamp).isSame(duration, 'month')
        )
        state.registerFilter.push(student)
      }
      if (state.profiles.staff) {
        let mapstaff = Object.values(state.profiles.staff)
        let staff = mapstaff.filter(
          staff => moment(staff.timestamp).isSame(duration, 'month')
        )
        state.registerFilter.push(staff)
      }
    }
  },
  actions: {
    // bind ค่า ใน db ให้ผูกกับ ตัวแปร ใน state
    setItemsRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('items', Items)
    }),
    setBookingRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('booking', Booking)
    }),
    setProfileRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('profiles', Profile)
    }),
    setFeedbacksRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('feedbacks', Feedbacks)
    }),
    setHistorysRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('historys', Historys)
    }),
    setConfigsRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('configs', Configs)
    }),

    setStatus ({commit}) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          commit('updateStatus', true)
          // router.push('/')
        } else {
          commit('updateStatus', false)
          router.push('/')
        }
      })
    },
    // authen แล้วให้เปลี่ยน path
    signin ({commit}, user) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
        (user) => {
          commit('updateStatus', true)
          router.push('MonitorBooking')
        },
        (err) => {
          alert(err.message)
        }
      )
    },
    // Logout
    logout ({commit}) {
      firebase.auth().signOut().then(function () {
        commit('updateStatus', false)
        router.push('/')
      }).catch(function (error) {
        console.log(error)
      })
    },
    // เพิ่มห้อง
    addRoom (payload, detailRoom) {
      Items.child('meetingRoom/').child(detailRoom.sizeRoom).child(detailRoom.nameRoom).set({
        status: 'open'
      })
    },
    // เพิ่มอุปกรณ์
    addDevice (payload, detailDevice) {
      Items.child('device/').child(detailDevice.typeDevice).child(detailDevice.nameDevice).set({
        status: 'open'
      })
    },
    // ลบห้องอุปกรณ์
    removeItem (payload, child) {
      Items.child(child).remove()
    },
    block ({commit}, data) {
      console.log(data)
      Profile.child(data.type).child(data.id).update(
        {
          statusBlock: true
        }
      )
      commit('moveBookingToHistory', data.id)
    },
    unblock (payload, path) {
      Profile.child(path).update(
        {
          statusBlock: false,
          countOfNotCheckIn: 0
        }
      )
    },
    regiterGraphQuery ({commit}, duration) {
      commit('queryForregisterGraph', duration)
    },
    Bookingquery ({commit}, date) {
      commit('updateQueryBooking', date)
    },
    removeBooking (payload, child) {
      Booking.child(child).remove()
    },
    updateBooking (payload, data) {
      if (moment(data.dateStart, data.timeStart).isSameOrBefore(data.dateStop, data.timeStop)) {
        Booking.child(data.child).update({
          'timeStart': data.timeStart,
          'timeStop': data.timeStop,
          'dateStart': data.dateStart,
          'dateStop': data.dateStop
        })
      } else {
        alert('plese recheck and try again')
      }
    },
    addAdmin (payload, user) {
      if (user.repassword === user.password) {
        console.log('pass')
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch()
      } else {
        alert('please try again')
      }
    },
    saveConfig (payload, config) {
      if (config.deviceMax >= config.deviceMin && config.roomMax >= config.roomMin) {
        Configs.update({
          'countOfBlock': {'value': config.countOfBlock},
          'countOfMaxBooking': config.maxBooking,
          'device': {'max': config.deviceMax, 'min': config.deviceMin},
          'meetingRoom': {'max': config.roomMax, 'min': config.roomMin}
        })
      } else {
        alert('please check again')
      }
    }
  }
})

export default store
