<template>
  <div class="login">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>admin co-working space</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="person" name="login" label="Enter your email" v-model="user.email" type="text"></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" label="Enter your password" v-model="user.password" id="password" type="password"></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" label="Enter your password again" v-model="user.repassword" id="password" type="password"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="addAdmin(user)">add admin</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
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
      password: '',
      repassword: ''
    }
  }),
  methods: {
    ...mapActions(['addAdmin'])
  }
}
</script>

<style lang="scss">
@import '../styles/font.scss';
</style>

<style media="screen">
</style>
