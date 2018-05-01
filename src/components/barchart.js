import {Bar} from 'vue-chartjs'
import {mapGetters} from 'vuex'

export default {
  extends: Bar,
  computed: {
    ...mapGetters(['historyFilter'])
  },
  watch: {
    historyFilter: function () {
      console.log(this.historyFilter)
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
            backgroundColor: '#BBDEFB',
            data: [10, 39, 1, 3, 50, 40, 22]
          },
          {
            label: 'Data two',
            backgroundColor: 'pink',
            data: [20, 49, 5, 4, 60, 45, 20]
          },
          {
            label: 'Data two',
            backgroundColor: '#B2DFDB',
            data: [30, 29, 8, 6, 80, 58, 15]
          }
        ]
      }, {responsive: true, maintainAspectRatio: false}
    )
  }
}
