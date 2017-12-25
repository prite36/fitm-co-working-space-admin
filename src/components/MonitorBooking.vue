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

  <div class="" v-for="detail in queryBooking">
    <template>
      <v-layout row justify-center>
        {{detail.bookingTime.nameitem}}
        <v-btn @click="showDetail(detail)">{{detail.bookingTime.timestart}}-{{detail.bookingTime.timestop}}</v-btn>
      </v-layout>
    </template>
  </div>
  <v-dialog v-if="details !== null" v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">รายละเอียดการจอง {{details.bookingTime.nameitem}}</v-card-title>
      <v-card-text>
        ระยะเวลาการจองของวันที่ {{dateQuery}}
        {{details.bookingTime.timestart}}-{{details.bookingTime.timestop}}
        <br>
        date time start = {{details.data.dateStart}} {{details.data.timeStart}}
        <br>
        date time stop = {{details.data.dateStop}} {{details.data.timeStop}}
        <br>
        Time stamp = {{details.data.timeStamp}}
        <br>
        people = {{details.data.countPeople}}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">กลับหน้าเดิม</v-btn>
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
      dateQuery: null
    }
  },
  computed: {
    ...mapGetters(['queryBooking', 'booking'])
  },
  methods: {
    ...mapActions(['setBookingRef', 'Bookingquery']),
    async showDetail (detail) {
      this.details = await detail
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
