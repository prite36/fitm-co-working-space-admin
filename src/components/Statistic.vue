<template lang="html">
  <div class="statistic">
    <bar-chart></bar-chart>
  </div>
</template>

<script>
import BarChart from './barchart.js'

export default {
  components: {
    BarChart
  },
  name: 'statistic',
  data () {
    return {
    }
  }
}
</script>

<style>
.sendinfo {
  align-items: center;
}
</style>
