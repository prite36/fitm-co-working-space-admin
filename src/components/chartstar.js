import {HorizontalBar} from 'vue-chartjs'
import {mapGetters} from 'vuex'

export default {
  extends: HorizontalBar,
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
        labels: ['5ดาว', '4ดาว', '3ดาว', '2ดาว', '1ดาว'],
        datasets: [
          {
            label: 'roomRating',
            backgroundColor: '#00BFA5',
            data: [10, 39, 1, 3, 50]
          }
        ]
      }, {responsive: true, maintainAspectRatio: false}
    )
  }
}
