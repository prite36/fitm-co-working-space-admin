<template>
<div class="monitorbooking">
  <h3>Monitoring Booking</h3>
  <v-dialog persistent v-model="modaldate" lazy full-width width="290px">
    <v-text-field slot="activator" label="Change date in dialog" v-model="dateQuery" prepend-icon="event" readonly>
    </v-text-field>
    <v-date-picker v-model="dateQuery" scrollable actions>
      <template slot-scope="{ save, cancel }">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
          <v-btn flat color="primary" @click="save">OK</v-btn>
        </v-card-actions>
      </template>
    </v-date-picker>
  </v-dialog>

  <br>
  <v-layout row v-if="dateQuery !== null">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line subheader v-for="(detail, index) in queryBooking" :key="index">
            <p align="center">{{detail.bookingTime.nameitem}}</p>
          <v-list-tile avatar @click="showDetail(detail)">
            <v-list-tile-content>
              Booking time {{detail.bookingTime.timestart}}-{{detail.bookingTime.timestop}}
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple  @click="showDetail(detail)">
                <v-icon large color="green">description</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <hr>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>

  <v-dialog v-if="details !== null" v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">Details Booking of {{details.bookingTime.nameitem}}</v-card-title>
      <v-card-text>
        <li>Date of booking {{dateQuery}}</li>
        <li>Sum time booking {{details.bookingTime.timestart}}-{{details.bookingTime.timestop}}</li>
        <li>Date time start  {{details.data.dateStart}} {{details.data.timeStart}}</li>
        <li>Date time stop  {{details.data.dateStop}} {{details.data.timeStop}}</li>
        <li>Time stamp  {{details.data.timeStamp}}</li>
        <li v-if="details.data.countPeople">people of use {{details.data.countPeople}}</li>
        <li>contact {{userProfile.email}}</li>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Back to original page</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'MonitorBooking',
  data () {
    return {
      dialog: false,
      details: null,
      modaldate: false,
      dateQuery: null,
      userProfile: null
    }
  },
  computed: {
    ...mapGetters(['queryBooking', 'booking', 'profiles'])
  },
  methods: {
    ...mapActions(['setBookingRef', 'setProfileRef', 'Bookingquery']),
    async showDetail (detail) {
      this.details = await detail
      for (var type in this.profiles) {
        for (var id in this.profiles[type]) {
          if (id === this.details.data.senderID) {
            this.userProfile = this.profiles[type][id]
          }
        }
      }
      this.dialog = true
    }
  },
  watch: {
    booking: function () {
      delete this.booking['.key']
      if (this.dateQuery !== null && this.modaldate === false) {
        this.Bookingquery(this.dateQuery)
      }
    },
    modaldate: function () {
      if (this.dateQuery !== null && this.modaldate === false) {
        this.Bookingquery(this.dateQuery)
      }
    },
    profiles: function () {
      delete this.profiles['.key']
    }
  },
  created () {
    this.setBookingRef()
    this.setProfileRef()
  }
}
</script>
<style lang="scss">
@import '../styles/font.scss';
</style>
<style scoped>
.monitorbooking {
  font-size: 16px;
  padding-left: 2%;
  padding-right: 2%;
}
.leftshow {
  float:left;
  width: 50%;
}
.rightshow {
  float:left;
  width: 50%;
}
</style>
