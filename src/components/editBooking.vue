<template>
<div class="monitorbooking">
  <div v-if="!newBooking">
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

    <v-layout row v-if="dateQuery !== null">
      <v-flex xs12>
        <v-card>
          <v-list two-line subheader v-for="(detail, index) in queryBooking" :key="detail.data.childPart">
              <p align="center">{{detail.bookingTime.nameitem}}</p>
            <v-list-tile avatar>
              <v-list-tile-content>
                Booking time {{detail.bookingTime.timestart}}-{{detail.bookingTime.timestop}}
              </v-list-tile-content>

                <v-btn icon ripple  @click="removeBooking(detail.data.childPart)">
                  <v-icon medium color="red">delete_forever</v-icon>
                </v-btn>
                <v-btn icon ripple  @click="setUpdateBooking(detail.data)">
                  <v-icon medium color="blue">border_color</v-icon>
                </v-btn>
                <v-btn icon ripple  @click="showDetail(detail)">
                  <v-icon medium color="green">description</v-icon>
                </v-btn>
            </v-list-tile>
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">กลับหน้าเดิม</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div v-else>
    <v-dialog persistent v-model="dialog1" lazy full-width width="290px">
      <v-text-field slot="activator"  v-model="data.dateStart" label="Date Start" prepend-icon="event" color="success" readonly></v-text-field>
      <v-date-picker v-model="data.dateStart" crollable actions>
        <template slot-scope="{ save, cancel }">
         <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
           <v-btn flat color="primary" @click="save">OK</v-btn>
         </v-card-actions>
       </template>
      </v-date-picker>
    </v-dialog>
    <v-dialog persistent v-model="dialog2" lazy full-width width="290px">
      <v-text-field slot="activator"  v-model="data.timeStart" label="Time Stop" prepend-icon="event" color="success" readonly></v-text-field>
        <v-time-picker format="24hr" v-model="data.timeStart" >
          <template slot-scope="{ save, cancel }">
            <v-card-actions>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">Save</v-btn>
            </v-card-actions>
          </template>
        </v-time-picker>
      </v-dialog>
      <v-dialog persistent v-model="dialog3" lazy full-width width="290px">
        <v-text-field slot="activator"  v-model="data.dateStop" label="Date Stop" prepend-icon="event" color="success" readonly></v-text-field>
        <v-date-picker v-model="data.dateStop" crollable actions>
          <template slot-scope="{ save, cancel }">
           <v-card-actions>
             <v-spacer></v-spacer>
             <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
             <v-btn flat color="primary" @click="save">OK</v-btn>
           </v-card-actions>
         </template>
        </v-date-picker>
      </v-dialog>
      <v-dialog persistent v-model="dialog4" lazy full-width width="290px">
        <v-text-field slot="activator"  v-model="data.timeStop" label="Time Stop" prepend-icon="event" color="success" readonly></v-text-field>
          <v-time-picker format="24hr" v-model="data.timeStop" >
            <template slot-scope="{ save, cancel }">
              <v-card-actions>
                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" @click="save">Save</v-btn>
              </v-card-actions>
            </template>
          </v-time-picker>
        </v-dialog>
        <v-btn @click="updateBook()">update</v-btn>
        <v-btn @click="newBooking = !newBooking">cancle</v-btn>
  </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import momenTime from 'moment-timezone'

export default {
  name: 'MonitorBooking',
  data () {
    return {
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      details: null,
      modaldate: false,
      newBooking: false,
      dateQuery: momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD'),
      data: {
        dateStart: null,
        dateStop: null,
        timeStart: null,
        timeStop: null,
        child: null
      }
    }
  },
  computed: {
    ...mapGetters(['queryBooking', 'booking'])
  },
  methods: {
    ...mapActions(['setBookingRef', 'Bookingquery', 'removeBooking', 'updateBooking']),
    async showDetail (detail) {
      this.details = await detail
      this.dialog = true
    },
    setUpdateBooking (details) {
      this.newBooking = !this.newBooking
      this.data.child = details.childPart
      this.data.dateStart = details.dateStart
      this.data.dateStop = details.dateStop
      this.data.timeStart = details.timeStart
      this.data.timeStop = details.timeStop
    },
    updateBook () {
      this.updateBooking(this.data)
      this.newBooking = !this.newBooking
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
    }
  },
  created () {
    this.setBookingRef()
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
