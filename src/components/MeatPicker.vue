<template>
  <div class="meat-picker">
    <div v-for="meatbook in meatbookFiles" :key="meatbook">
      <router-link :to="{name: 'MeatEditor',params:{meatbook_name:meatbook}}">{{meatbook}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeatPicker',
  data () {
    return {
      meatbookFiles: ['test']
    }
  },
  mounted () {
    this.$axios.get('/api/meatbook/list/')
      .then(res => {
        this.meatbookFiles = res.data['list']
      })
      .catch((res) => {
        if (res.response.status === 400) {
          this.$router.push({name: 'Login'})
        }
      })
  }
}
</script>

<style scoped>
.meat-picker{
}
</style>
