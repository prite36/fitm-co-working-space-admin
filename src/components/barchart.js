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
      console.log(this.registerFilter)
    }
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(
      {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#2196F3',
            data: [10, 39, 1, 3, 50, 40, 22]
          },
          {
            label: 'Data two',
            backgroundColor: '#E91E63',
            data: [20, 49, 5, 4, 60, 45, 20]
          },
          {
            label: 'Data two',
            backgroundColor: '#00BCD4',
            data: [30, 29, 8, 6, 80, 58, 15]
          }
        ]
      }, {responsive: true, maintainAspectRatio: false, displayColors: false}
    )
  }
}
