<template>
  <div class="login">
    <v-app id="bglogin" v-if="!statusLogin">
        <template>
          <v-parallax src="/static/doc-images/vbanner.jpg">
            <v-layout column align-center justify-center background-color="white" v-if="statusLogin == false"  class="login">
              <v-layout width: 20% justify-center align-center >
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
              </v-layout>
            </v-layout>
          </v-parallax>
        </template>
      </v-app>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  name: 'login',
  data: () => ({
    user: {
      email: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions(['signin'])
  },
  computed: {
    ...mapGetters(['statusLogin'])
  }
}
</script>

<style lang="scss">
@import '../styles/font.scss';
</style>
<style scoped>
</style>
