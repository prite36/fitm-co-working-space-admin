import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './VUEX/store'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(VeeValidate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
