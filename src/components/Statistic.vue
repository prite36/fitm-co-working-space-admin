<template lang="html">
  <div class="statistic">
    <v-dialog persistent lazy full-width width="290px">
      <v-text-field slot="activator" label="Change date in dialog" v-model="scopefilter" prepend-icon="event" readonly>
      </v-text-field>
      <v-date-picker v-model="scopefilter" type="month" scrollable actions>
        <template slot-scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
      </v-date-picker>
    </v-dialog>
    <bar-chart ref="barChart"></bar-chart>
    <v-btn flat color="primary" @click="saveImg('barChart')">ok</v-btn>
  </div>
</template>

<script>
import BarChart from './barchart.js'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    BarChart
  },
  name: 'statistic',
  data () {
    return {
      scopefilter: ''
    }
  },
  methods: {
    ...mapActions(['setProfileRef', 'regiterGraphQuery']),
    saveImg (ref) {
      let canvas = document.getElementById('bar-chart').toDataURL('image/png')
      let link = document.createElement('a')
      link.download = 'image'
      link.href = canvas
      link.click()
    }
  },
  computed: {
    ...mapGetters(['registerFilter'])
  },
  created () {
    this.setProfileRef()
  },
  watch: {
    scopefilter: function () {
      this.regiterGraphQuery(this.scopefilter)
    }
  }
}
</script>

<style>
.sendinfo {
  align-items: center;
}
</style>
