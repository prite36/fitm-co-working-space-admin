import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router'
import {firebaseMutations, firebaseAction} from 'vuexfire'
Vue.use(Vuex)

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

// store
const store = new Vuex.Store({
  strict: true,
  state: {
    statusLogin: false,
    items: '',
    booking: '',
    queryBooking: []
  },
  getters: {
    statusLogin: state => state.statusLogin,
    items: state => state.items,
    queryBooking: state => state.queryBooking
  },
  mutations: {
    ...firebaseMutations,
    updateStatus (state, status) {
      state.statusLogin = status
    },
    updateQueryBooking (state, date) {
      var key1 = Object.values(state.booking)
      key1.forEach(value => {
        console.log(value)
      })
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
    // authen แล้วให้เปลี่ยน path
    signin ({commit}, user) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
        (user) => {
          router.replace('MonitorBooking')
          commit('updateStatus', true)
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    },
    // เพิ่มห้อง
    addRoom (payload, detailRoom) {
      Items.child('meetingroom/').child(detailRoom.sizeRoom).child(detailRoom.nameRoom).set({
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
    }
  }
})

export default store
