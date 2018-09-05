<template>
  <div>
    <textarea v-model="meatText" title="text" @keydown.shift.enter="onShiftEnter()" v-if="meatIsEditing" @input="onInput()"></textarea>
    <div v-if="!meatIsEditing" @dblclick="onDoubleClick()" v-html="markedText"></div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'MeatBlock',
  props: ['meat'],
  data () {
    return {
      meatBlock: this.meat
    }
  },
  computed: {

    markedText: function () {
      return marked(this.meatText)
    }
  },
  methods: {
    onShiftEnter: function () {
      this.meat['is_editing'] = false
    },
    onDoubleClick: function () {
      this.meat['is_editing'] = true
    },
    onInput: function () {
      this.autoSave()
    },
    autoSave () {
    },
    meatText: function () {
      return this.meatBlock['text']
    },
    meatIsEditing: function () {
      return this.meatBlock['is_editing']
    }
  }
}
</script>

<style scoped>

</style>
