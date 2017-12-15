<template>
  <div class="showitem">
  <h3>ลบ แก้ไข ห้องและอุปกรณ์</h3><br><br>
    <div class="typeitem" v-for="(item, typeItem) in items">
      <h4>{{typeItem}}</h4>
      <br>
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
// import firebase from 'firebase'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'ShowItem',
  computed: {
    ...mapGetters(['items'])
  },
  methods: {
    ...mapActions(['setItemsRef', 'removeItem', 'setStatus']),
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
    // this.setStatus('ShowItem')
  }
  // mounted () {
  //   let data = firebase.database().ref('/booking')
  //   let lecture = []
  //   data.on('value', (snapshot) => {
  //     console.log('>>>>>', snapshot.child('device/Lacercut').val())
  //     lecture.push(snapshot.child('device/').val())
  //   })
  //   console.log(lecture)
  // }
}
</script>
<style lang="scss">
@import '../styles/font.scss';
</style>
<style scoped>
.showitem {
  font-size: 16px;
  padding-left: 2%;
  padding-right: 2%;
}
.typeitem {
  float:left;
  width: 50%;
}
</style>
