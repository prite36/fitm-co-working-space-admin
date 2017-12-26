<template>
  <div class="editdelete">
    <v-tabs fixed icons centered>
      <v-tabs-bar light color="">
        <v-tabs-slider color="red"></v-tabs-slider>
        <v-tabs-item href="#tab1">
          <v-icon color="green" medium>account_balance</v-icon>
          <h5 align="center">Delete Room</h5>
        </v-tabs-item>
        <v-tabs-item href="#tab2">
          <v-icon color="blue" medium>devices_other</v-icon>
          <h5 align="center">Delete Device</h5>
        </v-tabs-item>
      </v-tabs-bar>
      <br>
      <v-tabs-items>
        <v-tabs-content id="tab1">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <hr>
                <v-list two-line subheader v-for="(typeroom, nametype) in items.meetingroom">
                  <!-- <v-subheader inset> -->
                    <p align="center">{{nametype}}</p>
                  <!-- </v-subheader> -->
                  <v-list-tile avatar v-for="(room, nameroom) in typeroom" @click="">
                    <v-list-tile-content>
                      {{nameroom}}
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple  @click="commitdelete('meetingroom', nametype, nameroom)">
                        <v-icon large color="red">delete_forever</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <hr>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-tabs-content>
        <v-tabs-content id="tab2">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <hr>
                <v-list two-line subheader v-for="(typedevice, nametype) in items.device">
                  <!-- <v-subheader inset> -->
                    <p align="center">{{nametype}}</p>
                  <!-- </v-subheader> -->
                  <v-list-tile avatar v-for="(device, namedevice) in typedevice" @click="">
                    <v-list-tile-content>
                      {{namedevice}}
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple  @click="commitdelete('device', nametype, namedevice)">
                        <v-icon large color="red">delete_forever</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <hr>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">You want to delete <b>{{nameCommit}}</b> ?</v-card-title>
        <v-card-text> Push on delete button for delete or<br>
        Push on cancle button for back to original page</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click.native="removeItem(pathDelete), dialog = false">delete</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">cancle</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'editdelete',
  data: () => ({
    dialog: false,
    pathDelete: '',
    nameCommit: ''
  }),
  computed: {
    ...mapGetters(['items'])
  },
  methods: {
    ...mapActions(['setItemsRef', 'removeItem']),
    async commitdelete (type, child1, child2) {
      let path = await type + '/' + child1 + '/' + child2
      this.nameCommit = child2
      this.pathDelete = path
      this.dialog = true
      console.log(path + '/' + this.nameCommit + '/' + this.pathDelete + '/' + this.dialog)
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
.editdelete {
  font-size: 16px;
  padding-left: 2%;
  padding-right: 2%;
}
.typeitem {
  float:left;
  width: 48%;
}
</style>
