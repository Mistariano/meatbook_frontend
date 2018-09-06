<template>
  <div>
    <div v-for="meatbook in meatbookFiles" :key="meatbook">
      <router-link :to="{name: 'MeatEditor',params:{meatbook_name:meatbook}}">{{meatbook}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    this.$axios.get('/api/meatbook/list/')
      .then(res => {
        this.meatbookFiles = res.data['list']
      })
    return {
      meatbookFiles: ['test']
    }
  }
}
</script>

<style scoped>

</style>
