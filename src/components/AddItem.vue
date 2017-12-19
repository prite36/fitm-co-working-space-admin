<template>
  <div class="additem">
    <template>
      <v-tabs fixed icons centered>
        <v-tabs-bar light color="">
          <v-tabs-slider color="red"></v-tabs-slider>
          <v-tabs-item href="#tab1">
            <v-icon color="green">account_balance</v-icon>
            <h5>Add Room</h5>
          </v-tabs-item>
          <v-tabs-item href="#tab2">
            <v-icon color="blue">devices_other</v-icon>
            <h5>Add Device</h5>
          </v-tabs-item>
        </v-tabs-bar>
        <br><br>
        <v-tabs-items>
          <v-tabs-content id="tab1">
            <v-card flat>
                <h4>change size of room</h4>
                <v-radio-group v-model="detailRoom.sizeRoom">
                  <v-radio label="smallRoom"
                  name="typeroom"
                  color="red"
                  value="smallRoom"
                  ></v-radio>
                  <v-radio label="mediumRoom"
                  name="typeroom"
                  color="orange"
                  value="mediumRoom"
                  ></v-radio>
                  <v-radio label="largeRoom"
                  name="typeroom"
                  color="primary"
                  value="largeRoom"
                  ></v-radio>
                </v-radio-group>
                <br>
                <v-text-field
                  label="name of room"
                  required
                  v-model="detailRoom.nameRoom"
                ></v-text-field>
                <br><br>
                <v-btn @click="addRoom(detailRoom)">Add Item</v-btn>
            </v-card>
          </v-tabs-content>
          <v-tabs-content id="tab2">
            <v-card flat>
                <label>Add Device</label>
                <br><br>
                <v-flex xs12>
                <v-select
                  v-model="detailDevice.typeDevice"
                  label="Select a favorite activity or create a new one"
                  combobox
                  :items="selectTypeDevice"
                ></v-select>
                </v-flex>
                <v-text-field
                  label="name of device"
                  required
                  v-model="detailDevice.nameDevice"
                ></v-text-field>
                <br><br>
                <v-btn @click="addDevice(detailDevice)">Add Item</v-btn>
            </v-card>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </template>
    <!-- {{select}}
    <template>
  <v-card color="grey lighten-4" flat>
    <v-card-text>
      <v-container fluid>
        <v-layout wrap>
          <v-flex xs12>
            <v-select
              v-model="select"
              label="Select a favorite activity or create a new one"
              multiple
              tags
              :items="items.device"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
  </template> -->
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default{
  name: 'additem',
  data () {
    return {
      selectTypeDevice: [],
      detailRoom: {
        sizeRoom: '',
        nameRoom: ''
      },
      detailDevice: {
        typeDevice: '',
        nameDevice: ''
      }
    }
  },
  created () {
    this.setItemsRef()
  },
  watch: {
    items: function () {
      this.getKeyDevice()
    }
  },
  methods: {
    ...mapActions(['addRoom', 'addDevice', 'setItemsRef']),
    getKeyDevice () {
      this.select = []
      for (var data in this.items.device) {
        this.selectTypeDevice.push(data)
      }
    }
  },
  computed: {
    ...mapGetters(['items'])
  }
}
</script>

<style scoped>
.additem {
  font-size: 16px;
  padding-left: 2%;
  padding-right: 2%;
}
</style>
