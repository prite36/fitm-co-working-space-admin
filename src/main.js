import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './VUEX/store'
import Vuetify from 'vuetify'

Vue.use(Vuex)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
