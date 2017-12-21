<template>
  <div class="showitem">
  <h3>ลบ แก้ไข ห้องและอุปกรณ์</h3><br><br>
    <div class="" v-for="(item, typeItem) in items">
      <h4>{{typeItem}}</h4>
      <br>
      <div class="" v-for="(type, key2) in item">
        <center>{{key2}}</center>
        <div class="typeitem" v-for="(status, nameItem) in type">
          <template>
            <v-layout row justify-center>
              {{nameItem}}
              <v-btn color="primary" dark @click.native.stop="dialog = true">ลบ</v-btn>
              <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-title class="headline">คุณต้องการทำการลบ <b>{{nameItem}}</b> ออกจากระบบหรือไม่</v-card-title>
                  <v-card-text> กดยืนยันเพื่อลบ กดยกเลิกเพื่อกลับสู่หน้าเดิม</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="setpath(typeItem, key2, nameItem), dialog = false">ลบ</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">ยกเลิก</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>
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
  data: () => ({
    dialog: false
  }),
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
  width: 48%;
}
</style>
