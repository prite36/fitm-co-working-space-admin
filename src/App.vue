<template>
<div id="app">
  <v-app v-if="!statusLogin">
    <login></login>
  </v-app>
  <v-app id="inspire" v-else>
    <bar></bar>
  </v-app>
</div>
</template>

<script>
import AddItem from './components/AddItem.vue'
import Editdelete from './components/Editdelete.vue'
import MonitorBooking from './components/MonitorBooking.vue'
import Bar from './components/Bar.vue'
import Login from './components/Login.vue'
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'app',
  components: {
    AddItem: AddItem,
    Editdelete: Editdelete,
    MonitorBooking: MonitorBooking,
    Bar: Bar,
    Login: Login
  },
  methods: {
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

</style>
