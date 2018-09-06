<template>
  <div>
    <div v-for="meat in meatbook" :key="meat.id">
      <MeatBlock :meat="meat"></MeatBlock>
    </div>
  </div>
</template>

<script>
import MeatBlock from '@/components/editor/MeatBlock'
export default {
  name: 'MeatEditor',
  components: {MeatBlock},
  props: ['meatbook_name'],
  data () {
    this.$axios.get('/api/meatbook/' + this.meatbook_name + '/')
      .then(res => {
        this.meatbook = res.data['meatbook']
      })
    return {
      meatbook: [{text: '# test\n\n$\\iint$', is_editing: true}, {text: '# test 2\n$$ \\oint $$', is_editing: false}]
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
