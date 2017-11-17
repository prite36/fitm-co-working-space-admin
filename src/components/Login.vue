<template>
  <div class="login">
    <center>

      <v-text-field
        label="E-mail"
        required
        v-model="user.email"
      ></v-text-field>
      <v-text-field
        type="password"
        label="Password"
        required
        v-model="user.password"
      ></v-text-field>
      <v-btn @click="signin(user)">Signin</v-btn>

    </center>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default{
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(['signin'])
  }
}
</script>

<style scoped>

</style>
