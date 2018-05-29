<template lang="html">
  <div class="statistic">
    <v-dialog persistent lazy full-width width="290px">
      <v-text-field slot="activator" label="Change month in dialog" v-model="scopefilter" prepend-icon="event" readonly>
      </v-text-field>
      <v-date-picker
      v-model="scopefilter"
      type="month"
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
    <v-dialog persistent lazy full-width width="290px">
      <v-text-field slot="activator" label="Change year in dialog" v-model="scopefilter" prepend-icon="event" readonly>
      </v-text-field>
      <v-date-picker
      v-model="scopefilter"
      type="year"
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
    <bar-chart ref="barChart"></bar-chart>
    <v-btn flat color="primary" @click="createPDF('download')">Download</v-btn>
    <v-btn flat color="primary" @click="createPDF('print')">Print</v-btn>
  </div>
</template>

<script>
import BarChart from './barchart.js'
import {mapGetters, mapActions} from 'vuex'
import logoHeader from '../assets/FITM_LOGO.png'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
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
      scopefilter: momentTime().tz('Asia/Bangkok').format('YYYY-MM')
    }
  },
  methods: {
    ...mapActions(['setProfileRef', 'regiterGraphQuery']),
    saveImg (ref) {
      let canvas = document.getElementById('bar-chart').toDataURL('image/png')
      return canvas
      // let link = document.createElement('a')
      // link.download = 'image'
      // link.href = canvas
      // link.click()
    },
    createPDF (action) {
      let barChart = this.saveImg('barChart')
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
    }
  },
  computed: {
    ...mapGetters(['registerFilter'])
  },
  created () {
    this.setProfileRef()
  },
  watch: {
    scopefilter: function () {
      this.regiterGraphQuery(this.scopefilter)
    }
  }
}
</script>

<style>
.sendinfo {
  align-items: center;
}
</style>
