<template>
  <div class="historybooking">
    <h3>History Booking</h3>
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
      <p>History device booking timeline of {{dateQuery}}</p>
      <timeline :min="0.00" :max="24.00" :data="filteredDevices" :colors="colorsDevices" :height="devicesTLHeight"></timeline>
      <p>History room booking timeline  of {{dateQuery}}</p>
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
  name: 'historybooking',
  data () {
    return {
      dateQuery: momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD'),
      modaldate: false,
      bookingDevices: null,
      bookingRooms: null,
      histories: null,
      dateNow: momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD'),
      filteredDevices: [],
      filteredRooms: [],
      colorsDevices: [],
      colorsRooms: [],
      countDevices: {total: 0},
      countRooms: {total: 0}
    }
  },
  methods: {
    queryTimeline () {
      let defaultColors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
        '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395'
      ]
      let tempHistories = Object.values(this.histories)
      let dataSet = [
        {listItem: this.listItems.device, filtered: this.filteredDevices, colors: this.colorsDevices, count: this.countDevices},
        {listItem: this.listItems.meetingRoom, filtered: this.filteredRooms, colors: this.colorsRooms, count: this.countRooms}
      ]
      dataSet.forEach(values => {
        values.filtered.push(
          [
            'เวลาการจอง 24 ชม.',
            Moment(this.dateQuery).format('YYYY-MM-DD 00:00 Z'),
            Moment(this.dateQuery).format('YYYY-MM-DD 24:00 Z')
          ]
        )
        // ใส่สีขาว
        values.colors.push('#ffffff')
        values.count.total++

        for (var typeItem in values.listItem) {
          for (var nametypeItem in values.listItem[typeItem]) {
            values.count.total++
            let countBeforeCheck = tempHistories.length
            tempHistories.forEach((element, index) => {
              // console.log(element.nameTypeItem)
              if (element.nameTypeItem === nametypeItem) {
                const range1 = moment.range(
                  Moment(this.dateQuery).format('YYYY-MM-DD 00:00 Z'),
                  Moment(this.dateQuery).format('YYYY-MM-DD 24:00 Z')
                )
                const range2 = moment.range(
                  `${element.dateStart} ${element.timeStart}`,
                  `${element.dateStop} ${element.timeStop}`
                )
                if (range1.overlaps(range2, { adjacent: false })) {
                  // ถ้าชาวงเวลาจอง อยู่ภายในวันนี้ เข้าเงื่อนไข
                  let rangeIntersect = range1.intersect(range2)
                  // ใช้ในการหาว่า ช่วงเวลา booking นี้ อยู่ภายในวันนั้นหรือไม่ ใช้ intersect ใช้ในการหาช่วงที่ตัดกัน
                  values.filtered.push([
                    nametypeItem,
                    rangeIntersect.start.format('YYYY-MM-DD HH:mm Z'),
                    rangeIntersect.end.format('YYYY-MM-DD HH:mm Z')
                  ])
                  values.colors.push(defaultColors[Math.floor(Math.random() * defaultColors.length)])
                  tempHistories.splice(index, 1)
                }
              }
            })
            if (countBeforeCheck === tempHistories.length) {
              // ถ้า ไม่มี booking ของ  nametypeItem นี้ ให้กำหนดเวลาอัติโนมัติ
              values.filtered.push(
                [
                  nametypeItem,
                  Moment(this.dateQuery).format('YYYY-MM-DD 00:00 Z'),
                  Moment(this.dateQuery).format('YYYY-MM-DD 24:00 Z')
                ]
              )
              // ใส่สีขาว
              values.colors.push('#ffffff')
            }
          }
        }
      })
    }
  },
  watch: {
    histories () {
      this.filteredDevices = []
      this.filteredRooms = []
      this.oldItem = []
      this.colorsDevices = []
      this.colorsRooms = []
      this.countDevices = {total: 0}
      this.countRooms = {total: 0}
      this.queryTimeline()
    },
    dateQuery () {
      this.filteredDevices = []
      this.filteredRooms = []
      this.colorsDevices = []
      this.colorsRooms = []
      this.countDevices = {total: 0}
      this.countRooms = {total: 0}
      this.queryTimeline()
    }
  },
  mounted () {
    this.$bindAsObject('listItems', firebase.database().ref('items'), null, () => {
      delete this.listItems['.key']
      this.$bindAsObject('histories', firebase.database().ref('history'))
    })
  },
  computed: {
    roomsTLHeight () {
      return `${(this.countRooms.total * 50) + 41}px`
    },
    devicesTLHeight () {
      return `${(this.countDevices.total * 50) + 41}px`
    },
    oldTLHeight () {
      return `${(this.countOld.total * 50) + 41}px`
    }
  }
}
</script>

<style scoped>
  .historybooking {
    padding-left: 5%;
    padding-right: 5%;
  }
  .timeline {
    padding-top: 2%;
  }
</style>
