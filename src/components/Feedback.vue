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
          <td>ความคิดเห็น<hr></td>
          <td>เวลา<hr></td>
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
      chatbotRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
      serviceRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
      deviceRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
      roomRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
      comment: []
    }
  }),
  computed: {
    ...mapGetters(['feedbacks'])
  },
  methods: {
    ...mapActions(['setFeedbacksRef']),
    calRate () {
      this.clearstar()
      // this.Rating.comment = []
      for (var key1 in this.feedbacks) {
        console.log(this.feedbacks[key1])
        this.Rating.chatbotRating[this.feedbacks[key1].chatbotRating]++
        this.Rating.deviceRating[this.feedbacks[key1].deviceRating]++
        this.Rating.roomRating[this.feedbacks[key1].roomRating]++
        this.Rating.serviceRating[this.feedbacks[key1].serviceRating]++
        if (this.feedbacks[key1].comment) {
          this.Rating.comment.push({
            comment: this.feedbacks[key1].comment,
            timeStamp: this.feedbacks[key1].timeStamp
          })
        }
      }
    },
    clearstar () {
      this.Rating = {
        chatbotRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
        serviceRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
        deviceRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
        roomRating: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
        comment: []
      }
    }
  },
  created () {
    this.setFeedbacksRef()
  },
  watch: {
    feedbacks: function () {
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
