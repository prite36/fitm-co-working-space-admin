<template>
  <div class="additem">
    <v-switch label="Add Meetingroom"
                        v-model="selectType"
                        color="primary"
                        value="meetingroom"
                        hide-details>
    </v-switch>
    <v-switch label="Add Device"
                        v-model="selectType"
                        color="red"
                        value="device"
                        hide-details>
    </v-switch>
    <div class="" v-if="selectType === 'meetingroom'">
      <br>
      <!-- <h4>Add Meetingroom</h4> -->
      <br><br>
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
    </div>
    <div class="" v-if="selectType === 'device'">
      <label>Add Device</label>
      <br><br>
      <v-text-field
        label="name of type device"
        required
        v-model="detailDevice.typeDevice"
      ></v-text-field>
      <v-text-field
        label="name of device"
        required
        v-model="detailDevice.nameDevice"
      ></v-text-field>
      <br><br>
      <v-btn @click="addDevice(detailDevice)">Add Item</v-btn>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default{
  name: 'additem',
  data () {
    return {
      selectType: 'meetingroom',
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
  computed: {
  },
  methods: {
    ...mapActions(['addRoom', 'setStatus', 'addDevice'])
  },
  created () {
    // this.setStatus('AddItem')
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
