<template>
<div class="additem">
  <v-tabs fixed icons centered>
    <v-tabs-bar light color="">
      <v-tabs-slider color="red"></v-tabs-slider>
      <v-tabs-item href="#tab1">
        <v-icon color="green" medium>account_balance</v-icon>
        <h5>Add Room</h5>
      </v-tabs-item>
      <v-tabs-item href="#tab2">
        <v-icon color="blue" medium>devices_other</v-icon>
        <h5>Add Device</h5>
      </v-tabs-item>
    </v-tabs-bar>
    <br><br>
    <v-tabs-items>
      <form @submit.prevent="validateBeforeSubmit('form-2')" data-vv-scope="form-2">
        <v-tabs-content id="tab1">
          <v-card flat>
            <h4>change type of room</h4>
            <v-radio-group
            v-model="detailRoom.sizeRoom"
            required
            data-vv-name="type_room"
            :error-messages="errors.collect('type_room')">
              <v-radio label="smallroom" name="typeroom" color="red" value="smallRoom"></v-radio>
              <v-radio label="mediumroom" name="typeroom" color="orange" value="mediumRoom"></v-radio>
              <v-radio label="largeroom" name="typeroom" color="primary" value="largeRoom"></v-radio>
              <v-radio label="classroom" name="typeroom" color="green" value="classroom"></v-radio>
            </v-radio-group>
            <br>
            <v-text-field
              label="name of room"
              required
              v-model="detailRoom.nameRoom"
              data-vv-name="name_room"
              :error-messages="errors.collect('name_room')"
              v-validate="'required|uniqueroom'">
            </v-text-field>
            <br><br>
            <center>
              <v-btn @click="validateBeforeSubmit('form-1', 'addroom')">Add Room</v-btn>
            </center>
            <br>
          </v-card>
        </v-tabs-content>
      </form>
      <form @submit.prevent="validateBeforeSubmit('form-2')" data-vv-scope="form-2">
        <v-tabs-content id="tab2">
          <v-card flat>
            <label><h4>Add Device</h4></label>
            <br>
            <v-flex xs12>
              <v-select
                data-vv-name="type_device"
                :error-messages="errors.collect('type_device')"
                v-validate="'required'"
                v-model="detailDevice.typeDevice"
                label="Select a favorite activity or create a new one"
                combobox :items="selectTypeDevice">
              </v-select>
            </v-flex>
            <v-text-field
              data-vv-name="name_device"
              :error-messages="errors.collect('name_device')"
              v-validate="'required|uniquedevice'"
              label="name of device"
              required v-model="detailDevice.nameDevice">
            </v-text-field>
            <br><br>
            <center>
              <v-btn @click="validateBeforeSubmit('form-2', 'adddevice')">Add Item</v-btn>
            </center>
          </v-card>
        </v-tabs-content>
      </form>
    </v-tabs-items>
  </v-tabs>
</div>
</template>

<script>
import { Validator } from 'vee-validate'
import {mapGetters, mapActions} from 'vuex'
export default{
  name: 'additem',
  data () {
    return {
      selectTypeDevice: [],
      checkNameDevice: [],
      checkNameRoom: [],
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
    const isUniqueDevice = value => new Promise((resolve) => {
      setTimeout(() => {
        if (this.checkNameDevice.indexOf(value) === -1) {
          return resolve({
            valid: true
          })
        }
        return resolve({
          valid: false,
          data: {
            message: `${value} is already taken.`
          }
        })
      }, 200)
    })
    Validator.extend('uniquedevice', {
      validate: isUniqueDevice,
      getMessage: (field, params, data) => data.message
    })
    const isUniqueRoom = value => new Promise((resolve) => {
      setTimeout(() => {
        if (this.checkNameRoom.indexOf(value) === -1) {
          return resolve({
            valid: true
          })
        }
        return resolve({
          valid: false,
          data: {
            message: `${value} is already taken.`
          }
        })
      }, 200)
    })
    Validator.extend('uniqueroom', {
      validate: isUniqueRoom,
      getMessage: (field, params, data) => data.message
    })
  },
  watch: {
    items: function () {
      this.getNameItem()
    }
  },
  methods: {
    ...mapActions(['addRoom', 'addDevice', 'setItemsRef']),
    getNameItem () {
      this.select = []
      this.checkNameDevice = []
      this.checkNameRoom = []
      for (var dataDevice in this.items.device) {
        this.selectTypeDevice.push(dataDevice)
        for (var nameDevice in this.items.device[dataDevice]) {
          this.checkNameDevice.push(nameDevice)
        }
      }
      for (var dataRoom in this.items.meetingroom) {
        for (var nameRoom in this.items.meetingroom[dataRoom]) {
          this.checkNameRoom.push(nameRoom)
        }
      }
    },
    validateBeforeSubmit (scope, typeitem) {
      this.$validator.validateAll(scope).then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.$nextTick().then(() => {
            this.$validator.reset()
          })
          if (typeitem === 'addroom') {
            this.addRoom(this.detailRoom)
            console.log('addroom')
          } else if (typeitem === 'adddevice') {
            this.addDevice(this.detailDevice)
            console.log('adddevice')
          }
        }
      })
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
