<template>
  <div class="login">
    <v-app id="inspire">
      <template>
        <h2 align="center">Admin Co-Workingspace</h2>
        <br>
        <v-parallax src="/static/doc-images/vbanner.jpg">
          <v-card color="grey lighten-4" flat>
            <v-card-text>
              <v-container fluid>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="input-10-1"
                      label="Enter your Email"
                      v-model="user.email"
                      min="8"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="input-10-1"
                      label="Enter your Password"
                      v-model="user.password"
                      min="8"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                      counter
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <center><v-btn @click="signin(user)">login</v-btn></center>
            <br>
          </v-card>
        </v-parallax>
      </template>
    </v-app>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'
export default {
  name: 'login',
  data: () => ({
    e1: true,
    user: {
      email: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions(['signin'])
  }
}
</script>

<style lang="scss">
@import '../styles/font.scss';
</style>

<style media="screen">
  #inspire{
    padding-top: 13%;
  }
</style>
