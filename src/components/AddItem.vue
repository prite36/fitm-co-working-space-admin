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
                <h4>change type of room</h4>
                <v-radio-group v-model="detailRoom.sizeRoom">
                  <v-radio label="smallroom"
                  name="typeroom"
                  color="red"
                  value="smallRoom"
                  ></v-radio>
                  <v-radio label="mediumroom"
                  name="typeroom"
                  color="orange"
                  value="mediumRoom"
                  ></v-radio>
                  <v-radio label="largeroom"
                  name="typeroom"
                  color="primary"
                  value="largeRoom"
                  ></v-radio>
                  <v-radio label="classroom"
                  name="typeroom"
                  color="green"
                  value="classroom"
                  ></v-radio>
                </v-radio-group>
                <br>
                <v-text-field
                  label="name of room"
                  required
                  v-model="detailRoom.nameRoom"
                ></v-text-field>
                <br><br>
                <center><v-btn @click="addRoom(detailRoom)">Add Room</v-btn></center>
                <br>
            </v-card>
          </v-tabs-content>
          <v-tabs-content id="tab2">
            <v-card flat>
                <label><h4>Add Device</h4></label>
                <br>
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
                <center><v-btn @click="addDevice(detailDevice)">Add Item</v-btn></center>
            </v-card>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </template>
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
.additem {
  background-color: white;
}
</style>
