<template>
<div id="app">
  <v-app id="bglogin" v-if="statusLogin == false">
    <template>
      <v-parallax src="/static/doc-images/vbanner.jpg">
        <v-layout column align-center justify-center background-color="white">
          <v-layout width: 20% justify-center align-center v-if="statusLogin == false"  class="login">
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
  <v-app id="inspire" v-if="statusLogin == true">
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense class="menu">
        <router-link to="MonitorBooking" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="blue darken-2">desktop_windows</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>ตรวจสอบการจอง</h3>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <hr>
        <router-link to="ShowItem" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="green darken-2">description</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>ลบ&แก้ไข ห้องและอุปกรณ์</h3>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <hr>
        <router-link to="AddItem" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="pink darken-1">library_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>เพิ่มห้องและอุปกรณ์</h3>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <v-list-tile @click="logout()">
          <v-list-tile-action>
            <v-icon large color="black">exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <h3>Logout</h3>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="cyan" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>FITM Co-Workingspace</v-toolbar-title>
    </v-toolbar>
    <v-content class="padtop">
      <router-view/>
      </v-container>
    </v-content>
    <v-footer color="cyan" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>
import AddItem from './components/AddItem.vue'
import ShowItem from './components/ShowItem.vue'
// import firebase from 'firebase'
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'app',
  components: {
    AddItem: AddItem,
    ShowItem: ShowItem
  },
  data: () => ({
    drawer: true,
    user: {
      email: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions(['logout', 'signin']),
    ...mapActions(['setStatus'])
  },
  created () {
    this.setStatus()
  },
  computed: {
    ...mapGetters(['statusLogin'])
  }
}
</script>

<style lang="stylus">
  @import './styles/main'
</style>
<style lang="scss">
@import './styles/font.scss';
</style>
<style>
.btnlink {
  text-decoration: none;
}
.padtop {
  padding-top: 5%;
}
.menu {
  padding-top: 8%;
}
#bglogin {
  padding-top: 20%;
}
.login {
  /*background-color: white;*/
}
</style>
