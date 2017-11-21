<template>
  <div class="login">

  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default{
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(['signin'])
  }
}
</script>

<style scoped>

</style>
