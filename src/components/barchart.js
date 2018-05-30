import {Bar, mixins} from 'vue-chartjs'
// import {HorizontalBar} from 'vue-chartjs'
let options = {
  scales: {
    xAxes: [{
      barPercentage: 0.4
    }]
  },
  responsive: true,
  maintainAspectRatio: true,
  displayColors: false
}
export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  mounted () {
    this.renderChart(this.chartData, options)
  }
}
