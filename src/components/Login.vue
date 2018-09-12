<template>
  <form>
    <input title="Password" v-model="password" type="password"/>
    <input type="submit" title="Login" value="Login" @click="onSubmit"/>
  </form>
</template>

<script>
import store from 'store'
export default {
  name: 'Login',
  methods: {
    onSubmit () {
      this.$axios.post('/api/login', {password: this.password, t: 11})
        .then(res => {
          store.set('token', res.data['token'])
          this.$router.push({name: 'MeatPicker'})
        })
        .catch(function () {
          alert('Wrong Password')
        })
    }
  },
  data () {
    return {
      password: ''
    }
  }
}
</script>

<style scoped>

</style>
