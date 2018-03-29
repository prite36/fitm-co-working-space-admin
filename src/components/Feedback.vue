<template>
  <div class="feedback">
    <P class="text-md-center">Rating fitm-coworkingspace {{scopefilter}}</P>
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
    <v-btn color="primary" @click="scopefilter = ''">rate all</v-btn>

    <div class="rate">
      <h3> chatbot </h3>
      <p v-for="n in 5">  มีผู้ให้คะแนน {{n}} ดาว {{ratings.chatbotRating[n]}} คน </p>
    </div>
    <div class="rate">
      <h3> การบริการ </h3>
      <p v-for="n in 5">  มีผู้ให้คะแนน {{n}} ดาว {{ratings.serviceRating[n]}} คน </p>
    </div>
    <div class="rate">
      <h3> อุปกรณ์ </h3>
      <p v-for="n in 5">  มีผู้ให้คะแนน {{n}} ดาว {{ratings.deviceRating[n]}} คน </p>
    </div>
    <div class="rate">
      <h3> ห้อง </h3>
      <p v-for="n in 5">  มีผู้ให้คะแนน {{n}} ดาว {{ratings.roomRating[n]}} คน </p>
    </div>

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

export default {
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
    clearstar () {
      this.ratings = {
        chatbotRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
        serviceRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
        deviceRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
        roomRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
      }
      this.comments = []
    }
  },
  created () {
    this.setFeedbacksRef()
  },
  watch: {
    feedbacks: function () {
      this.clearstar()
      this.calRate()
    },
    scopefilter: function () {
      this.clearstar()
      this.calRate()
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
