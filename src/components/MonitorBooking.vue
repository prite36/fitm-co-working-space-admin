<template>
  <div class="monitorbooking">
    <h3>Monitoring Booking</h3>
    <v-dialog persistent v-model="modaldate" lazy full-width width="290px">
      <v-text-field slot="activator" label="Change date in dialog" v-model="dateQuery" prepend-icon="event" readonly>
      </v-text-field>
      <v-date-picker v-model="dateQuery" scrollable actions>
        <template slot-scope="{ save, cancel }">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
            <v-btn flat color="primary" @click="save">OK</v-btn>
          </v-card-actions>
        </template>
      </v-date-picker>
    </v-dialog>
    <div class="timeline">
      <p>Device Booking Timeline of {{dateNow}}</p>
      <timeline :min="0.00" :max="24.00" :data="filteredDevices" :colors="colorsDevices" :height="devicesTLHeight"></timeline>
      <p>Room Booking Timeline  of {{dateNow}}</p>
      <timeline :min="0.00" :max="24.00" :data="filteredRooms" :colors="colorsRooms" :height="roomsTLHeight" ></timeline>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Moment from 'moment'
import momenTime from 'moment-timezone'
import { extendMoment } from 'moment-range'
// import { timeline } from 'chartkick'
const moment = extendMoment(Moment) // eslint-disable-line
// import diff from 'lodash/difference'

export default {
  name: 'monitorbooking',
  data () {
    return {
      dateQuery: null,
      modaldate: false,
      bookingDevices: null,
      bookingRooms: null,
      dateNow: momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD'),
      filteredDevices: [],
      filteredRooms: [],
      colorsDevices: [],
      colorsRooms: []
    }
  },
  methods: {
    queryTimeline (bookingData, list, filtered, colors) {
      let defaultColors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395']
      filtered.push(
        [
          'เวลาการจอง 24 ชม.',
          momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD 00:00 Z'),
          momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD 00:01 Z')
        ],
        [
          'เวลาการจอง 24 ชม.',
          momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD 23:59 Z'),
          momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD 24:00 Z')
        ]
      )
      // ใส่สีขาว
      colors.push('#ffffff')
      for (var typeItem in list) {
        for (var nametypeItem in list[typeItem]) {
          if (bookingData[typeItem] && bookingData[typeItem][nametypeItem]) {
            // console.log(`pass ${nametypeItem}`)
            // ถ้า bookong ของ nametypeItem มีค่า
            Object.values(bookingData[typeItem][nametypeItem]).forEach(values => {
              let range1 = null
              if (!this.dateQuery) {
                range1 = moment.range(
                  momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD 00:00 Z'),
                  momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD 24:00 Z')
                )
              } else {
                range1 = moment.range(
                  Moment(this.dateQuery).format('YYYY-MM-DD 00:00 Z'),
                  Moment(this.dateQuery).format('YYYY-MM-DD 24:00 Z')
                )
              }
              const range2 = moment.range(
                `${values.dateStart} ${values.timeStart}`,
                `${values.dateStop} ${values.timeStop}`
              )
              if (range1.overlaps(range2, { adjacent: false })) {
                // ถ้าชาวงเวลาจอง อยู่ภายในวันนี้ เข้าเงื่อนไข
                let rangeIntersect = range1.intersect(range2)
                // ใช้ในการหาว่า ช่วงเวลา booking นี้ อยู่ภายในวันนั้นหรือไม่ ใช้ intersect ใช้ในการหาช่วงที่ตัดกัน
                filtered.push([
                  nametypeItem,
                  rangeIntersect.start.format('YYYY-MM-DD HH:mm Z'),
                  rangeIntersect.end.format('YYYY-MM-DD HH:mm Z')
                ])
                colors.push(defaultColors[Math.floor(Math.random() * defaultColors.length)])
              }
            })
          } else {
            // console.log(`fail ${nametypeItem}`)
            // ถ้า ไม่มี booking ของ  nametypeItem นี้ ให้กำหนดเวลาอัติโนมัติ
            filtered.push(
              [
                nametypeItem,
                momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD 00:00 Z'),
                momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD 00:01 Z')
              ],
              [
                nametypeItem,
                momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD 23:59 Z'),
                momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD 24:00 Z')
              ]
            )
            // ใส่สีขาว
            colors.push('#ffffff')
          }
        }
      }
    }
  },
  watch: {
    bookingDevices () {
      delete this.bookingDevices['.key']
      this.filteredDevices = []
      this.colorsDevices = []
      this.queryTimeline(this.bookingDevices, this.listDevices, this.filteredDevices, this.colorsDevices)
    },
    bookingRooms () {
      delete this.bookingRooms['.key']
      this.filteredRooms = []
      this.colorsRooms = []
      this.queryTimeline(this.bookingRooms, this.listRooms, this.filteredRooms, this.colorsRooms)
    },
    dateQuery () {
      delete this.bookingRooms['.key']
      this.filteredRooms = []
      this.colorsRooms = []
      this.queryTimeline(this.bookingRooms, this.listRooms, this.filteredRooms, this.colorsRooms)
      delete this.bookingDevices['.key']
      this.filteredDevices = []
      this.colorsDevices = []
      this.queryTimeline(this.bookingDevices, this.listDevices, this.filteredDevices, this.colorsDevices)
    }
  },
  mounted () {
    this.$bindAsObject('listDevices', firebase.database().ref('items/device'), null, () => {
      delete this.listDevices['.key']
      this.$bindAsObject('bookingDevices', firebase.database().ref('booking/device'))
    })
    this.$bindAsObject('listRooms', firebase.database().ref('items/meetingRoom'), null, () => {
      delete this.listRooms['.key']
      this.$bindAsObject('bookingRooms', firebase.database().ref('booking/meetingRoom'))
    })
  },
  computed: {
    roomsTLHeight () {
      // console.log(`${(this.colorsRooms.length * 50) + 41}px`)
      return `${(this.colorsRooms.length * 50) + 41}px`
    },
    devicesTLHeight () {
      return `${(this.colorsDevices.length * 50) + 41}px`
    }
  }
}
</script>

<style scoped>
  .monitorbooking {
    padding-left: 5%;
    padding-right: 5%;
  }
  .timeline {
    padding-top: 2%;
  }
</style>
