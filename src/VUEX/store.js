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
    langBlock (state, lang) {
      console.log(lang)
      if (lang === 'th') {
        state.listMsg = [
          'คุณถูกบล็อคเนื่องจากส่งเสียงรบกวนผู้อื่น หากต้องการใช้งาน กรุณาติดต่อเจ้าหน้าที่',
          'คุณถูกบล็อคเนื่องจากใช้งานห้องเกินเวลาที่กำหนด หากต้องการใช้งาน กรุณาติดต่อเจ้าหน้าที่',
          'คุณถูกบล็อคเนื่องจากใช้งานอุปกรณ์เกินเวลาที่กำหนด หากต้องการใช้งาน กรุณาติดต่อเจ้าหน้าที่'
        ]
      } else if (lang === 'eng') {
        state.listMsg = [
          'You are blocked because of noise. if you need to use please contact me.',
          'You are blocked because of using the room over time. if you need to use please contact me.',
          'You are blocked because of using the device over time. if you need to use please contact me.'
        ]
      }
    },
    QUERYSTAT (state) {
      state.barUsers = {
        datasets: [],
        labels: []
      }
      state.barDevices = {
        datasets: [],
        labels: []
      }
      state.barMeetRooms = {
        datasets: [],
        labels: []
      }
      void [{label: 'check-in', color: '#2196F3'},
      {label: 'Not check-in', color: '#E91E63'},
      {label: 'Cancle Booking', color: '#00BCD4'}].forEach(values2 => {
        state.barMeetRooms.datasets.push({
          label: values2.label,
          backgroundColor: values2.color,
          data: [0, 0, 0]
        })
      })
      void [{label: 'Booked', color: '#2196F3'},
      {label: 'Cancle Booking', color: '#00BCD4'}].forEach(values2 => {
        state.barDevices.datasets.push({
          label: values2.label,
          backgroundColor: values2.color,
          data: [0, 0]
        })
      })
      state.barUsers = { labels: ['Student', 'Staff', 'Guest'],
        datasets: [
          {
            label: 'total',
            backgroundColor: '#2196F3',
            data: [0, 0, 0]}
        ] }
      // void [{label: 'Student', color: '#2196F3'},
      // {label: 'Staff', color: '#E91E63'},
      // {label: 'Guest', color: '#00BCD4'}].forEach(values2 => {
      //   state.barUsers.datasets.push({
      //     label: values2.label,
      //     backgroundColor: values2.color,
      //     data: [0]
      //   })
      // })
      let format = 'YYYY-MM'
      let dataQuery = state.historys.filter(element => {
        let checkdbStart = Moment(element.dateStart, format)
        let checkdbStop = Moment(element.dateStop, format)
        return Moment(data.scopefilter, format).isBetween(checkdbStart, checkdbStop, data.types, '[]')
      })

      void [{item: state.items.meetingRoom, varName: state.barMeetRooms, type: 'MeetRooms'},
      {item: state.items.device, varName: state.barDevices, type: 'Devices'}].forEach(data => {
        Object.keys(data.item).forEach((typeItem, index) => { // index เอาไปใช้กับ labels และระบุตำแหน่งให้ datasets
          data.varName.labels[index] = typeItem // เก็บชื่อ ลงใน label แต่ละประเภท
          let allNameType = Object.keys(data.item[typeItem]) // nameTypeItem ทั้งหมดใน Item ประเภทืนั้น
          dataQuery.forEach(value1 => {
            if (allNameType.includes(value1.nameTypeItem)) {  // หาว่าการจองครั้งนี้ มี nameTypeItem อยู่ใน  allNameType ไหม
              if (data.type === 'MeetRooms') {
                if (value1.status === 'endBooking') { // สถานะ checkin-in
                  data.varName.datasets[0].data[index] ++
                } else if (value1.status === 'notCheckIn') {  // สถานะ Not ckeck-in
                  data.varName.datasets[1].data[index] ++
                } else if (value1.status === 'userCancleBooking') {
                  data.varName.datasets[2].data[index] ++
                }
              } else if (data.type === 'Devices') {
                if (value1.status === 'endBooking') { // สถานะ checkin-in
                  data.varName.datasets[0].data[index] ++
                } else if (value1.status === 'userCancleBooking') {
                  data.varName.datasets[1].data[index] ++
                }
              }
            }
          })
        })
      })
      Profile.once('value').then(function (snapshot) {
        dataQuery.forEach(value1 => {
          let type = null   // เก็บประเภทของ userคนนั้น
          for (let key in snapshot.val()) {
            if (snapshot.val()[key][value1.senderID]) {
              type = key
              break
            }
          }
          let indexArray = state.barUsers.labels.findIndex(x => x.toLowerCase() === type)
          if (!indexArray) state.barUsers.datasets[0].data[indexArray]++
        })
      })
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
    langBlockMessage ({commit}, id) {
      console.log('langBlockMessage')
      let lang = null
      userState.child(id).once('value', snapshot => {
        lang = snapshot.val().language
        commit('langBlock', lang)
      })
    },
    block ({commit}, data) {
      console.log(data)
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
            'text': 'ขณะนี้คุณได้รับการปลดบล็อคแล้ว สามารถใช้งานระบบได้ตามปกติ'
          }
        })
      })
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
    },
    queryStat ({commit}, data) {
      commit('QUERYSTAT', data)
    }
  }
})

export default store
