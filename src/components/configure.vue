<template>
  <div class="configure">
    <h3>limit not checkin</h3>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-select
            v-model="countOfBlock"
            label="Select a favorite activity or create a new one"
            :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
          </v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <h3>max booking</h3>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-select
            v-model="maxOfbooking"
            label="Select a favorite activity or create a new one"
            :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
          </v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <hr color="blue"> <br>
    <h3  align="center">limit range time of devices booking </h3>
    <h3>min of devices booking </h3>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
          <v-select
            v-model="hrsMinDevices"
            label="hours"
            :items="hours">
          </v-select>
        </v-flex>
        <v-flex xs6>
          <v-select
            v-model="minuteMinDevices"
            label="minute"
            :items="minute">
          </v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <h3>max of devices booking </h3>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
          <v-select
            v-model="hrsMaxDevices"
            label="hours"
            :items="hours">
          </v-select>
        </v-flex>
        <v-flex xs6>
          <v-select
            v-model="minuteMaxDevices"
            label="minute"
            :items="minute">
          </v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <hr color="blue"> <br>
    <h3 align="center">limit range time of room booking </h3>
    <br>
    <h3>min time of room booking </h3>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
          <v-select
            v-model="hrsMinRooms"
            label="hours"
            :items="hours">
          </v-select>
        </v-flex>
        <v-flex xs6>
          <v-select
            v-model="minuteMinRooms"
            label="minute"
            :items="minute">
          </v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <h3>max time of room booking </h3>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
          <v-select
            v-model="hrsMaxRooms"
            label="hours"
            :items="hours">
          </v-select>
        </v-flex>
        <v-flex xs6>
          <v-select
            v-model="minuteMaxRooms"
            label="minute"
            :items="minute">
          </v-select>
        </v-flex>
      </v-layout>
      <v-flex xs12>
        <v-btn class="primary" @click="packData()">save config</v-btn>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'configure',
  data: () => ({
    maxOfbooking: 1,
    countOfBlock: 1,
    hrsMinDevices: 0,
    hrsMaxDevices: 0,
    minuteMinDevices: 0,
    minuteMaxDevices: 0,
    hrsMinRooms: 0,
    hrsMaxRooms: 0,
    minuteMinRooms: 0,
    minuteMaxRooms: 0,
    minute: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  }),
  computed: {
    ...mapGetters(['configs'])
  },
  methods: {
    ...mapActions(['saveConfig', 'setConfigsRef']),
    packData () {
      let deviceMin = (this.hrsMinDevices * 60) + (this.minuteMinDevices)
      let deviceMax = (this.hrsMaxDevices * 60) + (this.minuteMaxDevices)
      let roomMin = (this.hrsMinRooms * 60) + (this.minuteMinRooms)
      let roomMax = (this.hrsMaxRooms * 60) + (this.minuteMaxRooms)
      let config = {
        'maxBooking': this.maxOfbooking,
        'countOfBlock': this.countOfBlock,
        'deviceMin': deviceMin,
        'deviceMax': deviceMax,
        'roomMin': roomMin,
        'roomMax': roomMax
      }
      this.saveConfig(config)
    },
    setData () {
      this.maxOfbooking = this.configs.countOfMaxBooking
      this.countOfBlock = this.configs.countOfBlock.value
      if (this.configs.device.min < 60) {
        this.minuteMinDevices = this.configs.device.min
      } else {
        this.hrsMinDevices = Math.floor(this.configs.device.min / 60)
        this.minuteMinDevices = this.configs.device.min % 60
      }
      if (this.configs.device.max >= 60) {
        this.hrsMaxDevices = Math.floor(this.configs.device.max / 60)
        this.minuteMaxDevices = this.configs.device.max % 60
      } else {
        this.minuteMaxDevices = this.configs.device.max
      }
      if (this.configs.meetingRoom.min < 60) {
        this.minuteMinRooms = this.configs.meetingRoom.min
      } else {
        this.hrsMinRooms = Math.floor(this.configs.meetingRoom.min / 60)
        this.minuteMinRooms = this.configs.meetingRoom.min % 60
      }
      if (this.configs.meetingRoom.max >= 60) {
        console.log('max')
        this.hrsMaxRooms = Math.floor(this.configs.meetingRoom.max / 60)
        this.minuteMaxRooms = this.configs.meetingRoom.max % 60
      } else {
        this.minuteMaxRooms = this.configs.meetingRoom.max
      }
    }
  },
  created () {
    this.setConfigsRef()
  },
  watch: {
    configs: function () {
      this.setData()
    }
  }
}
</script>

<style lang="scss">
@import '../styles/font.scss';
</style>

<style media="screen">
.configure {
  padding-top: 0%;
  padding-left: 10%;
  padding-right: 10%;
}
</style>
