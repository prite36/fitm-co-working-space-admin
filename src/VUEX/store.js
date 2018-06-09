import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import {firebaseMutations, firebaseAction} from 'vuexfire'
import axios from 'axios'

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
let userState = db.ref('state')
// store
const store = new Vuex.Store({
  strict: true,
  state: {
    listMsg: [],
    statusLogin: true,
    items: '',
    booking: {},
    profiles: {},
    feedbacks: [],
    historys: [],
    registerFilter: [],
    queryBooking: [],
    configs: {},
    barUsers: { labels: ['Student', 'Staff', 'Guest'], datasets: [] },
    barDevices: {
      datasets: [],
      labels: []
    },
    barMeetRooms: {
      datasets: [],
      labels: []
    }
    // สร้างตัวแปร
  },
  getters: {
    statusLogin: state => state.statusLogin,
    items: state => state.items,
    booking: state => state.booking,
    profiles: state => state.profiles,
    feedbacks: state => state.feedbacks,
    queryBooking: state => state.queryBooking,
    configs: state => state.configs,
    historys: state => state.historys,
    barUsers: state => state.barUsers,
    barMeetRooms: state => state.barMeetRooms,
    barDevices: state => state.barDevices,
    listMsg: state => state.listMsg
    // ส่งตัวแปรไปหน้า component
  },
  mutations: {
    ...firebaseMutations,
    setLangAlert (state, typeAndLang) {
      if (typeAndLang.typeAlert === 'block') {
        if (typeAndLang.lang === 'th') {
          state.listMsg = [
            'คุณถูกบล็อคเนื่องจากส่งเสียงรบกวนผู้อื่น หากต้องการใช้งาน กรุณาติดต่อเจ้าหน้าที่',
            'คุณถูกบล็อคเนื่องจากใช้งานห้องเกินเวลาที่กำหนด หากต้องการใช้งาน กรุณาติดต่อเจ้าหน้าที่',
            'คุณถูกบล็อคเนื่องจากใช้งานอุปกรณ์เกินเวลาที่กำหนด หากต้องการใช้งาน กรุณาติดต่อเจ้าหน้าที่'
          ]
        } else if (typeAndLang.lang === 'eng') {
          state.listMsg = [
            'You are blocked because of noise. if you need to use please contact me.',
            'You are blocked because of using the room over time. if you need to use please contact me.',
            'You are blocked because of using the device over time. if you need to use please contact me.'
          ]
        }
      } else if (typeAndLang.typeAlert === 'unblock') {
        if (typeAndLang.lang === 'th') {
          state.listMsg = 'ขณะนี้คุณได้รับการปลดบล็อคแล้ว สามารถใช้งานระบบได้ตามปกติ'
        } else if (typeAndLang.lang === 'eng') {
          state.listMsg = 'Now unbloked. You can use the system.'
        }
      } else if (typeAndLang.typeAlert === 'updatebooking') {
        if (typeAndLang.lang === 'th') {
          state.listMsg = 'ผู้ดูแลได้ทำการอัพเดตข้อมูลการจอง ' + typeAndLang.item + ' ของคุณเรียบร้อยแล้ว'
        } else if (typeAndLang.lang === 'eng') {
          state.listMsg = 'Update ' + typeAndLang.item + ' booking completed.'
        }
      } else if (typeAndLang.typeAlert === 'removebooking') {
        if (typeAndLang.lang === 'th') {
          state.listMsg = [
            'ผู้ดูแลได้ยกเลิกการจอง ' + typeAndLang.item + ' ของคุณเรียบร้อยแล้ว',
            'ผู้ดูแลได้ยกเลิกการจอง ' + typeAndLang.item + ' ของคุณเรียบร้อยแล้วเนื่องจากเกิดการชำรุด'
          ]
        } else if (typeAndLang.lang === 'eng') {
          state.listMsg = [
            'Cancle ' + typeAndLang.item + ' booking by admin completed. Because of Defective',
            'Cancle ' + typeAndLang.item + ' booking by admin completed. Because of Defective'
          ]
        }
      }
    },
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
    langAlertMessage ({commit}, typeAndID) {
      let lang = null
      userState.child(typeAndID.id).once('value', snapshot => {
        lang = snapshot.val().language
        if (typeAndID.item) {
          commit('setLangAlert', {lang: lang, typeAlert: typeAndID.typeAlert, item: typeAndID.item})
        } else {
          commit('setLangAlert', {lang: lang, typeAlert: typeAndID.typeAlert})
        }
      })
    },
    block ({commit}, data) {
      let alertMassage = ''
      if (data.message === '') {
        alertMassage = 'ขณะนี้คุณถูกบล็อค หากต้องการใช้งาน กรุณาติดต่อเจ้าหน้าที่ผู้ดูแลห้อง'
      } else {
        alertMassage = data.message
      }
      let token = 'EAACa7MZCazhABAFiNd0UivgHJoAaWWy967Xg1xz1ZBxoxZBqia1zy29CZAlJUqMog6nFZCcYfY4TS1Iu5wFoObNVxpFhCgAnDM9CM0GmSppZCQyAPzLKLIAfGh5lQ9EFujpIovehxvn5RW7wU42BBEOONyAwnASTu1t4Nvj5vOWGltCPHtVYOL'
      Profile.child(data.data.type).child(data.data.id).update({
        statusBlock: true
      }).then(value => {
        axios.post('https://graph.facebook.com/v2.6/me/messages?access_token=' + token, {
          'recipient': {
            'id': data.data.id
          },
          'message': {
            'text': alertMassage
          }
        })
      })
      commit('moveBookingToHistory', data.id)
    },
    unblock (payload, data) {
      let token = 'EAACa7MZCazhABAFiNd0UivgHJoAaWWy967Xg1xz1ZBxoxZBqia1zy29CZAlJUqMog6nFZCcYfY4TS1Iu5wFoObNVxpFhCgAnDM9CM0GmSppZCQyAPzLKLIAfGh5lQ9EFujpIovehxvn5RW7wU42BBEOONyAwnASTu1t4Nvj5vOWGltCPHtVYOL'
      Profile.child(data.pathBlock).update({
        statusBlock: false,
        countOfNotCheckIn: 0
      }).then(value => {
        axios.post('https://graph.facebook.com/v2.6/me/messages?access_token=' + token, {
          'recipient': {
            'id': data.id
          },
          'message': {
            'text': data.messageAlert
          }
        })
      })
    },
    Bookingquery ({commit}, date) {
      commit('updateQueryBooking', date)
    },
    removeBooking (payload, data) {
      let alertMassage = ''
      if (data.alertMassage === '') {
        alertMassage = 'ผู้ดูแลได้ยกเลิกการจองของคุณเรียบร้อยแล้ว'
      } else {
        alertMassage = data.message
      }
      let token = 'EAACa7MZCazhABAFiNd0UivgHJoAaWWy967Xg1xz1ZBxoxZBqia1zy29CZAlJUqMog6nFZCcYfY4TS1Iu5wFoObNVxpFhCgAnDM9CM0GmSppZCQyAPzLKLIAfGh5lQ9EFujpIovehxvn5RW7wU42BBEOONyAwnASTu1t4Nvj5vOWGltCPHtVYOL'
      Booking.child(data.pathDelete).remove().then(value => {
        axios.post('https://graph.facebook.com/v2.6/me/messages?access_token=' + token, {
          'recipient': {
            'id': data.senderID
          },
          'message': {
            'text': alertMassage
          }
        })
      })
    },
    updateBooking (payload, data) {
      let token = 'EAACa7MZCazhABAFiNd0UivgHJoAaWWy967Xg1xz1ZBxoxZBqia1zy29CZAlJUqMog6nFZCcYfY4TS1Iu5wFoObNVxpFhCgAnDM9CM0GmSppZCQyAPzLKLIAfGh5lQ9EFujpIovehxvn5RW7wU42BBEOONyAwnASTu1t4Nvj5vOWGltCPHtVYOL'
      // if (Moment(data.data.dateStart, data.data.timeStart).isSameOrBefore(data.data.dateStop, data.data.timeStop)) {
      Booking.child(data.data.child).update({
        'timeStart': data.data.timeStart,
        'timeStop': data.data.timeStop,
        'dateStart': data.data.dateStart,
        'dateStop': data.data.dateStop
      }).then(value => {
        axios.post('https://graph.facebook.com/v2.6/me/messages?access_token=' + token, {
          'recipient': {
            'id': data.data.senderID
          },
          'message': {
            'text': data.alertMassage
          }
        })
      })
      // } else {
      //   alert('plese recheck and try again')
      // }
    },
    addAdmin (payload, user) {
      let pattmail = /\S+@\S+\.\S+/
      let pattpass = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/
      if (pattmail.test(user.email)) {
        if (pattpass.test(user.password) && pattpass.test(user.password) && user.password === user.repassword) {
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(value => {
            alert('add success')
          }).catch()
        } else {
          alert('please check your password and try again')
        }
      } else {
        alert('please check your data and try again')
      }
    },
    saveConfig (payload, config) {
      if (config.deviceMax >= config.deviceMin && config.roomMax >= config.roomMin) {
        Configs.update({
          'countOfBlock': {'value': config.countOfBlock},
          'countOfMaxBooking': config.maxBooking,
          'device': {'max': config.deviceMax, 'min': config.deviceMin},
          'meetingRoom': {'max': config.roomMax, 'min': config.roomMin},
          'meetingRoomDescription': {
            'classRoom': config.classRoom,
            'largeRoom': config.largeRoom,
            'mediumRoom': config.mediumRoom
          }
        })
      } else {
        alert('please check again')
      }
    },
    queryStat ({commit}, data) {
      commit('QUERYSTAT', data)
    }
  }
})

export default store
