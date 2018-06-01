import {Bar, mixins} from 'vue-chartjs'
// import {HorizontalBar} from 'vue-chartjs'
let options = {
  scales: {
    xAxes: [{
      barPercentage: 0.1
    }]
  },
  responsive: true,
  maintainAspectRatio: false,
  displayColors: false
}
export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  mounted () {
    // setTimeout(function () { this.renderChart(this.chartData, options) }, 5000)
    this.renderChart(this.chartData, options)
  }
}
