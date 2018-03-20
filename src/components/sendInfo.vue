<template lang="html">
  <div class="sendinfo">
    <center>
      <v-flex xs8 fixed centered>
        <v-text-field
        name="input-7-1"
        label="message"
        multi-line
        v-model="message"
        ></v-text-field>
      </v-flex>
      <v-btn color="primary" @click="sendMessage(message)">sendMessage</v-btn>
    </center>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'sendinfo',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    sendMessage (message) {
      let token = 'EAACa7MZCazhABAFiNd0UivgHJoAaWWy967Xg1xz1ZBxoxZBqia1zy29CZAlJUqMog6nFZCcYfY4TS1Iu5wFoObNVxpFhCgAnDM9CM0GmSppZCQyAPzLKLIAfGh5lQ9EFujpIovehxvn5RW7wU42BBEOONyAwnASTu1t4Nvj5vOWGltCPHtVYOL'
      axios.post('https://graph.facebook.com/v2.11/me/message_creatives?access_token=' + token, {
        'messages': [
          {
            'dynamic_text': {
              'text': message,
              'fallback_text': 'Hello friend!'
            }
          }
        ]
      })
      .then(function (response) {
        console.log(response.data.message_creative_id)
        axios.post('https://graph.facebook.com/v2.11/me/broadcast_messages?access_token=' + token, {
          'message_creative_id': response.data.message_creative_id,
          'custom_label_id': '1902294086478661'
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style>
.sendinfo {
  align-items: center;
}
</style>
