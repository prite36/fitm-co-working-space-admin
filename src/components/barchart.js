import {Bar} from 'vue-chartjs'
// import {HorizontalBar} from 'vue-chartjs'
import {mapGetters} from 'vuex'

export default {
  extends: Bar,
  // extends: HorizontalBar,
  computed: {
    ...mapGetters(['registerFilter'])
  },
  watch: {
    historyFilter: function () {
    }
  },
  props: ['chartData'],
  mounted () {
    console.log(JSON.stringify(this.chartData))
    console.log(this.chartData)
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false, displayColors: false})
  }
}
// {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'Data One',
//       backgroundColor: '#2196F3',
//       // data: [10, 39, 1, 3, 50, 40, 22, 0, 0]
//       data: [0, 0, 1, 0, 0, 0, 0, 0, 0]
//     },
//     {
//       label: 'Data two',
//       backgroundColor: '#E91E63',
//       data: [20, 49, 5, 4, 60, 45, 20]
//     },
//     {
//       label: 'Data two',
//       backgroundColor: '#00BCD4',
//       data: [30, 29, 8, 6, 80, 58, 15]
//     }
//   ]
// }

// {
//   labels: [ 'classRoom', 'largeRoom', 'mediumRoom' ],
//   datasets: [
//     {
//       label: 'check-in',
//       backgroundColor: '#2196F3',
//       data: [ 0, 2, 0 ]
//     },
//     {
//       label: 'Not check-in',
//       backgroundColor: '#E91E63',
//       data: [ 0, 0, 0 ]
//     },
//     {
//       label: 'Cancle Booking',
//       backgroundColor: '#00BCD4',
//       data: [ 3, 3, 0 ] }
//   ]
// }
