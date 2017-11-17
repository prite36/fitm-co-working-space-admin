<template>
  <div class="showitem">
    <center>
    <div class="" v-for="(item, typeItem) in items">
      <h4>{{typeItem}}</h4>
      <br><br>
      <div class="" v-for="(type, key2) in item">
        {{key2}}
        <div class="" v-for="(status, nameItem) in type">
          {{nameItem}}
          <v-btn @click="setpathremove('meetingroom', key1, key2)">delete</v-btn>
        </div>
      </div>
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
  watch: {
    items: function () {
      delete this.items['.key']
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
