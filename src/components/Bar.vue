<template>
  <div class="bar">
    <v-app>
    <v-navigation-drawer fixed v-model="drawer" light app>
      <v-list dense class="menu">
        <router-link to="/" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="blue darken-4">desktop_windows</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>monitoring booking</h3>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/historybooking" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="black">history</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>history booking</h3>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/editbooking" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="cyan darken-1">border_color</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>edit booking</h3>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="editdelete" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="pink darken-1">indeterminate_check_box</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>delete room & device</h3>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <router-link to="additem" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="green darken-2">note_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>add room & device</h3>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <router-link to="sendinfo" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="blue">send</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>send info to users</h3>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <router-link to="feedback" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="orange">feedback</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>feedback</h3>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <router-link to="statistic" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="purple darken-1">timeline</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>statistic</h3>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <router-link to="blockuser" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="red">block</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>block user</h3>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <router-link to="unblock" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="green">verified_user</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>unblock</h3>
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
    <v-toolbar color="blue darken-2" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>FITM Co-Workingspace</v-toolbar-title>
    </v-toolbar>
    <v-content class="padtop">
      <router-view/>
      <!-- </v-container> -->
    </v-content>
    <v-footer color="blue darken-2" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'
export default {
  name: 'bar',
  data: () => ({
    drawer: true
  }),
  methods: {
    ...mapActions(['logout'])
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
