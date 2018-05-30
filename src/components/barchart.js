import {Bar, mixins} from 'vue-chartjs'
// import {HorizontalBar} from 'vue-chartjs'
let options = {
  scales: {
    xAxes: [{
      stack: false,
      barPercentage: 0.4
    }],
    yAxes: [{
      stack: false,
      barPercentage: 0.4
    }]
  },
  responsive: true,
  maintainAspectRatio: true,
  displayColors: true
}
export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  mounted () {
    this.renderChart(this.chartData, options)
  }
}
