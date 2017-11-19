<template>
  <div class="additem">
    <v-switch label="Add Meetingroom"
                        v-model="selectType"
                        color="red"
                        value="meetingroom"
                        hide-details>
    </v-switch>
    <v-switch label="Add Device"
                        v-model="selectType"
                        color="success"
                        value="device"
                        hide-details>
    </v-switch>
    <div class="" v-if="selectType === 'meetingroom'">
      <label>Add Meetingroom</label>
      <br><br>
      <input type="radio" name="typeroom" value="mediumRoom" v-model="detailRoom.sizeRoom">
      <label>Medium Room</label>
      <input type="radio" name="typeroom" value="largeRoom" v-model="detailRoom.sizeRoom">
      <label>Large Room</label>
      <input type="radio" name="typeroom" value="smallRoom" v-model="detailRoom.sizeRoom">
      <label>Small Room</label>
      <br><br>
      <label>Name Room</label>
      <input type="text" name="" value="" v-model="detailRoom.nameRoom" placeholder="name of room">
      <br><br>
      <input type="button" value="Add Item" name="" @click="addRoom(detailRoom)">
    </div>
    <div class="" v-if="selectType === 'device'">
      <label>Add Device</label>
      <br><br>
      <input type="text" name="" value="" v-model="detailDevice.typeDevice" placeholder="name of type device">
      <label>Name Room</label>
      <input type="text" name="" value="" v-model="detailDevice.nameDevice" placeholder="name of device">
      <br><br>
      <input type="button" value="Add Item" name="" @click="addDevice(detailDevice)">
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
    ...mapActions(['addRoom']),
    ...mapActions(['addDevice'])
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
