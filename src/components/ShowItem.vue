<template>
  <div class="showitem">
    <center>
    <h4>Meetingroom</h4><br><br>
    <div class="" v-for="(item, key1) in items.meetingroom">
      <h4>{{key1}}</h4>
      <br><br>
      <div class="" v-for="(type, key2) in item">
        {{key2}}
        <v-btn @click="setpathremove('meetingroom', key1, key2)">delete</v-btn>
      </div>
    </div>
    <h4>Device</h4> <br><br>
    <div class="" v-for="(item, key1) in items.device">
      <h4>{{key1}}</h4>
      <br><br>
      <div class="" v-for="(type, key2) in item">
        {{key2}}
        <v-btn @click="setpathremove('meetingroom', key1, key2)">delete</v-btn>
        <br><br>
      </div>
      <br><br>
    </div>
  </center>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'ShowItem',
  computed: {
    ...mapGetters(['items'])
  },
  methods: {
    ...mapActions(['removeItem', 'setItemsRef']),
    setpathremove (type, child1, child2) {
      let path = type + '/' + child1 + '/' + child2
      this.removeItem(path)
    }
  },
  created () {
    this.setItemsRef()
  }
}
</script>
<style lang="scss">
@import '../styles/font.scss';
</style>
<style scoped>
.showitem {
  font-size: 16px;
}
</style>
