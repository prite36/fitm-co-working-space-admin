import {Bar, mixins} from 'vue-chartjs'
// import {HorizontalBar} from 'vue-chartjs'
let options = {
  legend: {
    display: true,
    labels: {
      boxWidth: 20,
      fontSize: 16
    }
  },
  scales: {
    xAxes: [{
      barPercentage: 0.4
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
