<template>
  <div class="blockuser">
    <h2 align="center">Block user</h2>
    <v-tabs fixed icons centered>
      <v-tabs-bar light color="">
        <v-tabs-slider color="red"></v-tabs-slider>
        <v-tabs-item href="#tab1">
          <v-icon color="green" medium>account_circle</v-icon>
          <h5 align="center">guest</h5>
        </v-tabs-item>
        <v-tabs-item href="#tab2">
          <v-icon color="blue" medium>school</v-icon>
          <h5 align="center">student</h5>
        </v-tabs-item>
        <v-tabs-item href="#tab3">
          <v-icon color="purple darken-1" medium>person_pin</v-icon>
          <h5 align="center">staff</h5>
        </v-tabs-item>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content id="tab1">
          <v-layout row>
            <v-flex xs12>
              <v-card>
                <hr>
                <v-list two-line subheader v-if="profiles.guest">
                  <v-list-tile avatar v-for="(guest, index) in profiles.guest" :key="index" @click="" v-if="!guest.statusBlock">
                    <v-list-tile-content>
                      {{guest.firstName}}
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple  @click="commitblock({type: 'guest', id: index})">
                        <v-icon large color="red">block</v-icon>
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
            <v-flex xs12>
              <v-card>
                <hr>
                <v-list two-line subheader v-if="profiles.student">
                  <v-list-tile avatar v-for="(student, index) in profiles.student" :key="index" @click="" v-if="!student.statusBlock">
                    <v-list-tile-content>
                      {{student.email}}
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple  @click="commitblock({type: 'student', id: index})">
                        <v-icon large color="red">block</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <hr>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-tabs-content>
        <v-tabs-content id="tab3">
          <v-layout row>
            <v-flex xs12>
              <v-card>
                <hr>
                <v-list two-line subheader v-if="profiles.staff">
                  <v-list-tile avatar v-for="(staff, index) in profiles.staff" :key="index" @click="" v-if="!staff.statusBlock">
                    <v-list-tile-content>
                      {{staff.engname}}
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple  @click="commitblock({type: 'staff', id: index})">
                        <v-icon large color="red">block</v-icon>
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
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline">You want to block  <b>" {{user}} "</b> ?</v-card-title>
        <v-card-text> Push on block button for block or<br>
        Push on cancle button for back to original page</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click.native="block(data), dialog = false">block</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">cancle</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'blockuser',
  data: () => ({
    dialog: false,
    data: {},
    user: ''
  }),
  computed: {
    ...mapGetters(['profiles'])
  },
  methods: {
    ...mapActions(['setProfileRef', 'setBookingRef', 'setHistorysRef', 'block']),
    commitblock (data) {
      this.dialog = true
      if (data.type === 'guest') {
        this.user = this.profiles[data.type][data.id].firstName
      } else if (data.type === 'student') {
        this.user = this.profiles[data.type][data.id].email
      } else if (data.type === 'staff') {
        this.user = this.profiles[data.type][data.id].thname
      }
      this.data = data
    }
  },
  watch: {
  },
  created () {
    this.setProfileRef()
    this.setBookingRef()
    this.setHistorysRef()
  }
}
</script>
<style lang="scss">
@import '../styles/font.scss';
</style>
<style scoped>
</style>
