<template>
  <div class="showitem">
    <div class="" v-for="(item, typeItem) in items">
      <h4>{{typeItem}}</h4>
      <br><br>
      <div class="" v-for="(type, key2) in item">
        {{key2}}
        <div class="" v-for="(status, nameItem) in type">
          {{nameItem}}
          <v-btn @click="setpath(typeItem, key2, nameItem)">delete</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'ShowItem',
  computed: {
    ...mapGetters(['items'])
  },
  methods: {
    ...mapActions(['setItemsRef', 'removeItem']),
    setpath (type, child1, child2) {
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
  font-size: 16px;
  padding-left: 5%;
  padding-right: 2%;
}
</style>
