<template>
  <div class="bar">
    <v-app>
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
              <h3>ลบ แก้ไข ห้องและอุปกรณ์</h3>
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
            <h3>ออกจากระบบ</h3>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue darken-4" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>FITM Co-Workingspace</v-toolbar-title>
    </v-toolbar>
    <v-content class="padtop">
      <router-view/>
      </v-container>
    </v-content>
    <v-footer color="blue darken-4" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  name: 'bar',
  data: () => ({
    drawer: true
  }),
  methods: {
    ...mapActions(['logout'])
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
.btnlink {
  text-decoration: none;
}
.padtop {
  padding-top: 5%;
}
.menu {
  padding-top: 8%;
}
</style>
