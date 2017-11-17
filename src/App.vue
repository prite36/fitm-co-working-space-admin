<template>
<div id="app">
  <v-layout width: 20% justify-center align-center v-if="statusLogin == false">
    <div class="">
      <router-view/>
    </div>
  </v-layout>
  <v-app id="inspire" v-if="statusLogin == true">
    <v-navigation-drawer
    fixed
    v-model="drawer"
    app >
      <v-list dense>
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
        <router-link to="AddItem" class="btnlink">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon large color="pink darken-1">library_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <h3>AddItem</h3>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="cyan" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>FITM Co-Workingspace</v-toolbar-title>
    </v-toolbar>
    <v-content>
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
import Login from './components/Login.vue'
import AddItem from './components/AddItem.vue'
import ShowItem from './components/ShowItem.vue'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'app',
  components: {
    Login: Login,
    AddItem: AddItem,
    ShowItem: ShowItem
  },
  data: () => ({
    drawer: true
  }),
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
</style>
