<template>
  <div>
    <div class="meat-edit-area">
      <div v-for="(meat,key) in meatbook" v-if="meat.type==='block'" :key="meat.order">
        <MeatBlock :meat="meat" :meat-ind="key" @save="onSave" @newBlock="onNewBlock"></MeatBlock>
      </div>
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
    return {
      meatbook: [{type: 'block', order: '0', raw: 'test\\n\\n$$\\int$$', is_editing: true}]
    }
  },
  mounted () {
    this.$axios.get('/api/meatbook/' + this.meatbook_name + '/')
      .then(res => {
        this.meatbook = res.data
        this.renderMathJax()
      })
  },
  methods: {
    onSave (meatInd) {
      this.$axios.post('/api/meatbook/' + this.meatbook_name + '/', {'ind': meatInd, 'data': this.meatbook[meatInd]})
    },
    onNewBlock (meatInd) {
      alert(meatInd)
    }
  }
}
</script>

<style scoped>
  .meat-edit-area {

  }
</style>
