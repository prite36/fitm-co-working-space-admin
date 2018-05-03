<template>
  <div class="feedback">
    <h4 class="text-xs-center">Rating fitm-coworkingspace {{scopefilter}}</h4>
    <v-dialog persistent lazy full-width width="290px">
      <v-text-field slot="activator" label="Change date in dialog" v-model="scopefilter" prepend-icon="event" readonly>
      </v-text-field>

      <v-date-picker v-model="scopefilter" type="month" scrollable actions>
        <template slot-scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="scopefilter = ''">rateall</v-btn>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
      </v-date-picker>
    </v-dialog>

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
          <v-card>
          <h4> roomRating </h4>
          averageStar = {{star.roomRating.averageStar}} ดาว
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap v-for="(n, index) in 5" :key="index">
                <v-flex xs3>
                    {{n}}ดาว
                </v-flex>
                <v-flex xs6>
                  <v-progress-linear :value="star.roomRating.perrate[n-1]" height="5" color="blue"></v-progress-linear>
                </v-flex>
                <v-flex xs3>
                    {{ratings.roomRating[n]}}คน
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card>
          <h4> device rating </h4>
          average stars = {{star.deviceRating.averageStar}} ดาว
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap v-for="(n, index) in 5" :key="index">
                <v-flex xs3>
                    {{n}}ดาว
                </v-flex>
                <v-flex xs6>
                  <v-progress-linear :value="star.deviceRating.perrate[n-1]" height="5" color="blue"></v-progress-linear>
                </v-flex>
                <v-flex xs3>
                    {{ratings.deviceRating[n]}}คน
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card>
          <h4> chatbot rating </h4>
          average stars = {{star.chatbotRating.averageStar}} ดาว
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap v-for="(n, index) in 5" :key="index">
                <v-flex xs3>
                    {{n}}ดาว
                </v-flex>
                <v-flex xs6>
                  <v-progress-linear :value="star.chatbotRating.perrate[n-1]" height="5" color="blue"></v-progress-linear>
                </v-flex>
                <v-flex xs3>
                    {{ratings.chatbotRating[n]}}คน
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card>
          <h4> service rating </h4>
          average stars = {{star.serviceRating.averageStar}} ดาว
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap v-for="(n, index) in 5" :key="index">
                <v-flex xs3>
                    {{n}}ดาว
                </v-flex>
                <v-flex xs6>
                  <v-progress-linear :value="star.serviceRating.perrate[n-1]" height="5" color="blue"></v-progress-linear>
                </v-flex>
                <v-flex xs3>
                    {{ratings.serviceRating[n]}}คน
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div>
      <v-data-table
        :headers="headers"
        :items="comments"
        :search="search"
        :pagination.sync="pagination"
        class="elevation-1"
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <span slot="activator">
              {{ props.header.text }}
            </span>
            <span>
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
            <td>{{ props.item.comment }}</td>
            <td class="text-xs-right">{{ props.item.timeStamp }}</td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import moment from 'moment'
import horizontalBar from './chartstar.js'

export default {
  components: {
    horizontalBar
  },
  name: 'feedback',
  data: () => ({
    scopefilter: '',
    landscape: false,
    ratings: {
      chatbotRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
      serviceRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
      deviceRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
      roomRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    },
    comments: [],
    search: '',
    pagination: {},
    star: {
      chatbotRating: {
        allstar: 0,
        perrate: [0, 0, 0, 0, 0],
        averageStar: 0
      },
      serviceRating: {
        allstar: 0,
        perrate: [0, 0, 0, 0, 0],
        averageStar: 0
      },
      deviceRating: {
        allstar: 0,
        perrate: [0, 0, 0, 0, 0],
        averageStar: 0
      },
      roomRating: {
        allstar: 0,
        perrate: [0, 0, 0, 0, 0],
        averageStar: 0
      }
    },
    headers: [
      {
        text: 'Comments',
        align: 'left',
        sortable: false,
        value: 'comment'
      },
      { text: 'Date', value: 'timeStamp' }
    ]
  }),
  computed: {
    ...mapGetters(['feedbacks']),
    pages () {
      if (this.pagination.rowsPerPage === null || this.pagination.totalItems === null) {
        return 0
      } else {
        return (this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }
  },
  methods: {
    ...mapActions(['setFeedbacksRef']),
    calaverageStar () {
      for (var key1 in this.ratings) {
        var tempCalculate = 0
        for (var key = 1; key <= 5; key++) {
          tempCalculate += this.ratings[key1][key] * key
        }
        this.star[key1].averageStar = (tempCalculate / this.star[key1].allstar).toFixed(2)
      }
    },
    calallstar () {
      for (var key1 in this.ratings) {
        for (var key2 in this.ratings[key1]) {
          if (key2 !== '0') {
            this.star[key1].allstar += this.ratings[key1][key2]
          }
        }
      }
      this.perstar()
    },
    calRate () {
      for (var key1 in this.feedbacks) {
        if (this.scopefilter === '') {
          this.ratings.chatbotRating[this.feedbacks[key1].chatbotRating]++
          this.ratings.deviceRating[this.feedbacks[key1].deviceRating]++
          this.ratings.roomRating[this.feedbacks[key1].roomRating]++
          this.ratings.serviceRating[this.feedbacks[key1].serviceRating]++
          if (this.feedbacks[key1].comment) {
            this.comments.push({
              comment: this.feedbacks[key1].comment,
              timeStamp: this.feedbacks[key1].timeStamp
            })
          }
        } else if (this.scopefilter !== '') {
          if (moment(this.feedbacks[key1].timeStamp).isSame(this.scopefilter, 'month')) {
            this.ratings.chatbotRating[this.feedbacks[key1].chatbotRating]++
            this.ratings.deviceRating[this.feedbacks[key1].deviceRating]++
            this.ratings.roomRating[this.feedbacks[key1].roomRating]++
            this.ratings.serviceRating[this.feedbacks[key1].serviceRating]++
            if (this.feedbacks[key1].comment) {
              this.comments.push({
                comment: this.feedbacks[key1].comment,
                timeStamp: this.feedbacks[key1].timeStamp
              })
            }
          }
        }
      }
    },
    clearrate () {
      this.ratings = {
        chatbotRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
        serviceRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
        deviceRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
        roomRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
      }
      this.comments = []
    },
    clearstar () {
      this.star = {
        chatbotRating: {
          allstar: 0,
          perrate: [0, 0, 0, 0, 0],
          averageStar: 0
        },
        serviceRating: {
          allstar: 0,
          perrate: [0, 0, 0, 0, 0],
          averageStar: 0
        },
        deviceRating: {
          allstar: 0,
          perrate: [0, 0, 0, 0, 0],
          averageStar: 0
        },
        roomRating: {
          allstar: 0,
          perrate: [0, 0, 0, 0, 0],
          averageStar: 0
        }
      }
    },
    perstar () {
      for (var n in this.ratings) {
        for (var i = 0; i < 5; i++) {
          let fakekey = i + 1 // ใช้เพราะ rating.typeofreate เริ่มที่ 1 แต่ perrateเริ่มที่ 0
          this.star[n].perrate[i] = (this.ratings[n][fakekey] * 100) / this.star[n].allstar
        }
      }
    }
  },
  created () {
    this.setFeedbacksRef()
  },
  watch: {
    feedbacks: function () {
      this.clearrate()
      this.calRate()
    },
    scopefilter: function () {
      this.clearrate()
      this.calRate()
      this.calallstar()
    },
    ratings: function () {
      this.clearstar()
      this.calallstar()
      this.calaverageStar()
    }
  }
}
</script>
<style lang="scss">
@import '../styles/font.scss';
</style>
<style scoped>
.rate {
  width: 25%;
  float: left;
  text-align: center;
  font-size: 20px;
  margin-buttom: 5%;
}
.comment {
  text-align: center;
  font-size: 20px;
}
</style>
