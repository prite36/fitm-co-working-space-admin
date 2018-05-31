<template>
  <div class="addadmin">
    <v-app id="inspire">
      <v-content>
        <v-container>
          <v-layout align-center justify-center>
            <v-flex xs12 sm12>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>admin co-working space</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  Format password <br>
                  8 characters length  |
                  2 letters in Upper Case  |
                  1 Special Character (!@#$&*)  |
                  2 numerals (0-9)  |
                  3 letters in Lower Case
                  <v-form>
                    <v-text-field prepend-icon="person" name="login" label="Enter your email" v-model="user.email" type="text"></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" label="Enter your password" v-model="user.password" id="password" type="password"></v-text-field>
                    <v-text-field prepend-icon="lock" name="repassword" label="Enter your password again" v-model="user.repassword" id="repassword" type="password"></v-text-field>
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
  name: 'addAdmin',
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
