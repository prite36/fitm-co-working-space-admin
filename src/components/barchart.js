import {Bar, mixins} from 'vue-chartjs'
// import {HorizontalBar} from 'vue-chartjs'
let options = {
  scales: {
    xAxes: [{
      barPercentage: 0.4,
      stacked: false
    }],
    yAxes: [{
      stacked: false
    }]
  },
  responsive: true,
  maintainAspectRatio: false,
  displayColors: false
}

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  methods: {
    chartRender () {
      this.renderChart(this.chartData, options)
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
