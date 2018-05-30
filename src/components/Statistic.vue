<template lang="html">
  <div class="statistic">
    <v-container grid-list-xs text-xs-center>
     <v-layout row wrap>
       <v-flex xs12>
         <v-radio-group v-model="types" column>
           <v-radio
              label="year"
              color="primary"
              value="year">
           </v-radio>
           <v-radio
              label="month & year"
              color="primary"
              value="month">
           </v-radio>
         </v-radio-group>
       </v-flex>
       <v-flex xs12>
         <v-dialog persistent lazy full-width width="290px">
           <v-text-field slot="activator" :label="`Change type ${type}`" v-model="scopefilter" prepend-icon="event" readonly>
           </v-text-field>
           <v-date-picker
           v-model="scopefilter"
           :type="types"
           scrollable
           >
           <template slot-scope="{ save, cancel }">
               <v-card-actions>
                 <v-spacer></v-spacer>
                 <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                 <v-btn flat color="primary" @click="save">OK</v-btn>
               </v-card-actions>
             </template>
           </v-date-picker>
         </v-dialog>
       </v-flex>
      <v-flex xs12 >
        <br>
        <h2>สถิติการจองห้องแต่ละประเภท {{scopefilter}}</h2>
        <br>
        <bar-chart :height="150" :chart-data="barMeetRooms" ref="barChart"></bar-chart>
      </v-flex>
       <v-flex xs12 >
         <br>
         <h2>สถิติการจองอุปกรณ์แต่ละประเภท {{scopefilter}}</h2>
         <br>
         <bar-chart :height="150" :chart-data="barDevices" ref="barChart"></bar-chart>
       </v-flex>
       <v-flex xs12>
         <br>
         <h2>สถิติการจองสมาชิกแต่ละประเภท {{scopefilter}}</h2>
         <br>
         <bar-chart :height="150" :chart-data="barUsers" ref="barChart"></bar-chart>
       </v-flex>
       <v-flex xs12>
         <v-btn flat color="primary" @click="createPDF('download')">Download</v-btn>
         <v-btn flat color="primary" @click="createPDF('print')">Print</v-btn>
       </v-flex>
     </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase'
import BarChart from './barchart.js'
import logoHeader from '../assets/FITM_LOGO.png'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import moment from 'moment'
import momentTime from 'moment-timezone'
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  }
}
export default {
  components: {
    BarChart
  },
  name: 'statistic',
  data () {
    return {
      allProfile: null,
      allHistory: null,
      allItem: null,
      barDevices: null,
      barMeetRooms: null,
      barUsers: null,
      scopefilter: momentTime().tz('Asia/Bangkok').format('YYYY-MM'),
      types: 'month'
    }
  },
  methods: {
    saveImg (ref) {
      let canvas = document.getElementById(ref).toDataURL('image/png')
      return canvas
    },
    createPDF (action) {
      let barChart = this.saveImg('bar-chart')
      var docDefinition = {
        pageMargins: [40, 120, 40, 40],
        header: () => {
          return [{
            style: 'headerPage',
            table: {
              widths: ['auto', 200, 230],
              body: [
                [
                  {
                    image: logoHeader,
                    width: 60,
                    border: [false, false, false, false]
                  },
                  {text: 'FITM Co-working space System', bold: true, border: [false, false, false, false]},
                  {
                    stack: [
                      {text: 'Report Statistics ', bold: true, alignment: 'right'},
                      {text: 'รายงานสถิติ ', bold: true, alignment: 'right'}
                    ],
                    border: [false, false, false, false]
                  }
                ]
              ]
            }
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 40,
                y1: 20,
                x2: 595 - 40,
                y2: 20,
                lineWidth: 1
              }
            ]
          }]
        },
        footer: (currentPage, pageCount) => {
          return [{
            style: 'footerPage',
            text: `${momentTime().tz('Asia/Bangkok').format('วันที่  DD-MM-YYYY  เวลา  HH:mm')}\t\t\t\t\t\t\t\t Page ${currentPage.toString()}  of  ${pageCount}`
          }]
        },
        content: [
          {
            image: barChart,
            alignment: 'center',
            width: 450,
            margin: [0, 20, 0, 0]
          },
          {
            style: 'tableExample',
            table: {
              heights: 30,
              widths: [100, '*', '*', '*'],
              headerRows: 1,
              body: [
                [{text: 'ประเภทห้อง\nTypeRoom', style: 'tableHeader'}, {text: 'เข้าใช้งาน\ncheck-in', style: 'tableHeader'}, {text: 'ไม่เข้าใช้งาน\nNot check-in', style: 'tableHeader'}, {text: 'ยกเลิกการจอง\nCancle Booking', style: 'tableHeader'}],
                [ 'สวัสดดี', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ]
              ]
            }
          }
        ],
        defaultStyle: {
          font: 'THSarabunNew'
        },
        styles: {
          headerPage: {
            margin: [40, 20, 40, 0],
            fontSize: 16
          },
          footerPage: {
            margin: [40, 10, 40, 0],
            alignment: 'left',
            fontSize: 14
          },
          tableExample: {
            margin: [20, 30, 20, 0],
            alignment: 'center',
            fontSize: 14
          },
          tableHeader: {
            bold: true,
            fontSize: 16,
            color: 'black'
          }
        }
      }
      if (action === 'print') {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition)
        pdfDocGenerator.getBase64((buffer) => {
          var iframe = "<iframe width='100%' height='100%' src='data:application/pdf;base64," + buffer + "'></iframe>" // eslint-disable-line
          var x = window.open()
          x.document.open()
          x.document.write(iframe)
          x.document.close()
        })
      } else if (action === 'download') {
        pdfMake.createPdf(docDefinition).download(`Report Statistics [${momentTime().tz('Asia/Bangkok').format('DD-MM-YYYY HH.mm')}].pdf`)
      }
    },
    getDB () {
      let getAllProfile = new Promise(resolve => {
        this.$bindAsObject('allProfile', firebase.database().ref('profile'), null, () => {
          delete this.allProfile['.key']
          resolve()
        })
      })
      let getAllHistory = new Promise(resolve => {
        this.$bindAsObject('allHistory', firebase.database().ref('history'), null, () => {
          delete this.allHistory['.key']
          resolve()
        })
      })
      let getAllItem = new Promise(resolve => {
        this.$bindAsObject('allItem', firebase.database().ref('items'), null, () => {
          delete this.allItem['.key']
          resolve()
        })
      })
      Promise.all([getAllProfile, getAllHistory, getAllItem]).then(values => {
        this.queryBarChart()
      })
    },
    dataStructure () {
      this.barDevices = {datasets: [], labels: []}
      this.barMeetRooms = {datasets: [], labels: []}

      void [{label: 'check-in', color: '#2196F3'},
      {label: 'Not check-in', color: '#E91E63'},
      {label: 'Cancle Booking', color: '#00BCD4'}].forEach(values2 => {
        this.barMeetRooms.datasets.push({
          label: values2.label,
          backgroundColor: values2.color,
          data: [0, 0, 0]
        })
      })

      void [{label: 'Booked', color: '#2196F3'},
      {label: 'Cancle Booking', color: '#00BCD4'}].forEach(values2 => {
        this.barDevices.datasets.push({
          label: values2.label,
          backgroundColor: values2.color,
          data: [0, 0]
        })
      })

      this.barUsers = { labels: ['Student', 'Staff', 'Guest'],
        datasets: [
          {
            label: 'total',
            backgroundColor: '#2196F3',
            data: [0, 0, 0]}
        ]
      }
    },
    queryBarChart () {
      this.dataStructure()
      let format = 'YYYY-MM'
      let dataQuery = Object.values(this.allHistory).filter(element => {
        let checkdbStart = moment(element.dateStart, format)
        let checkdbStop = moment(element.dateStop, format)
        return moment(this.scopefilter, format).isBetween(checkdbStart, checkdbStop, this.types, '[]')
      })

      void [{item: this.allItem.meetingRoom, varName: this.barMeetRooms, type: 'MeetRooms'},
      {item: this.allItem.device, varName: this.barDevices, type: 'Devices'}].forEach(data => {
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
      dataQuery.forEach(value1 => { //  Query เฉพาะ barUsers
        if (value1.status === 'endBooking') { // สถานะ checkin-in
          var type = null   // เก็บประเภทของ userคนนั้น
          for (type in this.allProfile) { // หา ประเภทของ Userคนนี้
            if (this.allProfile[type][value1.senderID]) break  // ถ้าเจอที่ ประเภทไหน ก็หยุด ไม่วนต่อ
          }
          let indexArray = this.barUsers.labels.findIndex(x => x.toLowerCase() === type)
          if (indexArray !== -1) this.barUsers.datasets[0].data[indexArray]++
        }
      })
    }
  },
  computed: {
  },
  watch: {
    allProfile () {
      delete this.allProfile['.key']
    },
    allHistory () {
      delete this.allHistory['.key']
    },
    allItem () {
      delete this.allItem['.key']
    },
    types () {
      this.scopefilter = null
    },
    scopefilter () {
      if (this.scopefilter) {
        this.queryBarChart()
      }
    }
  },
  created () {
  },
  mounted () {
    this.getDB()
  }
}
</script>

<style>
.sendinfo {
  align-items: center;
}
.pickers {
  width: 50%;
}
</style>
