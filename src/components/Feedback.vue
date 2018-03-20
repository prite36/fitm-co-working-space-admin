<template>
  <div class="feedback">
    <div class="rate">
      <h3> chatbot </h3>
      <p v-for="n in 5">  มีผู้ให้คะแนน {{n}} ดาว {{Rating.chatbotRating[n]}} คน </p>
    </div>
    <div class="rate">
      <h3> การบริการ </h3>
      <p v-for="n in 5">  มีผู้ให้คะแนน {{n}} ดาว {{Rating.serviceRating[n]}} คน </p>
    </div>
    <div class="rate">
      <h3> อุปกรณ์ </h3>
      <p v-for="n in 5">  มีผู้ให้คะแนน {{n}} ดาว {{Rating.deviceRating[n]}} คน </p>
    </div>
    <div class="rate">
      <h3> ห้อง </h3>
      <p v-for="n in 5">  มีผู้ให้คะแนน {{n}} ดาว {{Rating.roomRating[n]}} คน </p>
    </div>

    <div class="comment">
      <h3>comment</h3>
      <center><table>
        <tr>
          <td>comment</td>
          <td>เวลา</td>
        </tr>
        <tr v-for="n in Rating.comment">
          <td width="80%"><p>{{n.comment}}</p><hr></td>
          <td width="20%"><p>{{n.timeStamp}}</p><hr></td>
        </tr>
      </table></center>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'feedback',
  data: () => ({
    Rating: {
      chatbotRating: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      },
      serviceRating: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      },
      deviceRating: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      },
      roomRating: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      },
      comment: []
    }
  }),
  computed: {
    ...mapGetters(['feedbacks'])
  },
  methods: {
    ...mapActions(['setFeedbacksRef']),
    calRate () {
      let packdata = {
        comment: '',
        timeStamp: ''
      }
      for (var key1 in this.feedbacks) {
        for (var key2 in this.feedbacks[key1]) {
          console.log(key2)
          if (key2 !== '.key' && key2 !== 'comment' && key2 !== 'timeStamp') {
            this.Rating[key2][this.feedbacks[key1][key2]]++
          } else if (key2 === 'comment' && key2 !== '.key') {
            packdata.comment = this.feedbacks[key1][key2]
          } else if (key2 === 'timeStamp' && key2 !== '.key') {
            packdata.timeStamp = this.feedbacks[key1][key2]
            console.log(packdata)
            this.Rating.comment.push(packdata)
          }
        }
      }
    }
  },
  watch: {
  },
  created () {
    this.setFeedbacksRef()
  },
  beforeMount () {
    this.calRate()
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
