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
  }
}
</script>

<style scoped>
.meat-picker{
}
</style>
