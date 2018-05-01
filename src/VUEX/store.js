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
  apiKey: 'AIzaSyAE2rQQye4hlRpDqAWirvyaaCExiaWA8DY',
  authDomain: 'fitm-coworkingspace.firebaseapp.com',
  databaseURL: 'https://fitm-coworkingspace.firebaseio.com',
  projectId: 'fitm-coworkingspace',
  storageBucket: 'fitm-coworkingspace.appspot.com',
  messagingSenderId: '181239315787'
}
firebase.initializeApp(config)
let db = firebase.database()

// ผูกค่าตัวแปรกับค่าใน database
let Items = db.ref('items')
let Booking = db.ref('booking')
let Profile = db.ref('profile')
let Feedbacks = db.ref('feedbacks')
let Historys = db.ref('history')

// store
const store = new Vuex.Store({
  strict: true,
  state: {
    statusLogin: true,
    items: '',
    booking: {},
    profiles: {},
    queryBooking: [],
    feedbacks: [],
    historys: [],
    historyFilter: []
  },
  getters: {
    statusLogin: state => state.statusLogin,
    items: state => state.items,
    booking: state => state.booking,
    queryBooking: state => state.queryBooking,
    profiles: state => state.profiles,
    feedbacks: state => state.feedbacks,
    historyFilter: state => state.historyFilter
  },
  mutations: {
    ...firebaseMutations,
    updateStatus (state, status) {
      state.statusLogin = status
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
    // query โดยการเอาค่าวันที่มาวนเปรียบเทียบกับ booking ทุกตัวหากเงื่อไขตรงจะโยนไปเก็บใน queryBooking
    updateQueryBooking (state, date) {
      state.queryBooking = []
      delete state.booking['.key']
      delete state.profiles['.key']
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
    queryForGraph (state, duration) {
      state.historyFilter = state.historys.filter(
        history => moment(history.timeStamp).isSame(duration, 'month')
      )
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

    setStatus ({commit}) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          commit('updateStatus', true)
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
    Bookingquery ({commit}, date) {
      commit('updateQueryBooking', date)
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
    graphQuery ({commit}, duration) {
      commit('queryForGraph', duration)
    }
  }
})

export default store
