<template>
  <div class="monitorbooking">
    <h3>ตรวจสอบการจอง</h3>
    <v-dialog persistent v-model="modaldate" lazy full-width width="290px">
      <v-text-field
        slot="activator" label="Picker in dialog" v-model="dateQuery" prepend-icon="event" readonly>
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
    <div class="leftshow">
      เวลาจอง<br>
      <div class="" v-for="time in queryBooking">
        <br><br>
        {{time.bookingTime.nameitem}}
        <v-btn @click="">{{time.bookingTime.timestart}}-{{time.bookingTime.timestop}}</v-btn>
      </div>
    </div>
    <div class="rightshow">
      เวลาว่าง
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'MonitorBooking',
  data () {
    return {
      modaldate: false,
      dateQuery: null
    }
  },
  computed: {
    ...mapGetters(['queryBooking', 'booking'])
  },
  methods: {
    ...mapActions(['setBookingRef', 'Bookingquery'])
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
