<template>
  <div>
    <textarea v-model="meatText" title="text" @keydown.shift.enter="onShiftEnter()" v-show="meatIsEditing"
              @input="onInput()"></textarea>
    <div ref="mjElement" v-show="!meatIsEditing" @dblclick="onDoubleClick()" v-html="markedText"></div>
  </div>
</template>
<script>
import marked from 'marked'
export default {
  name: 'MeatBlock',
  props: ['meat'],
  data () {
    return {}
  },
  computed: {
    meatText: {
      get () {
        return this.meat['text']
      },
      set (v) {
        this.meat['text'] = v
      }
    },
    meatIsEditing: {
      get () {
        return this.meat['is_editing']
      },
      set (v) {
        this.meat['is_editing'] = v
      }
    },
    markedText: function () {
      return marked(this.meatText)
    }
  },
  methods: {
    onShiftEnter: function () {
      window.MathJax.Hub.Queue([
        'Typeset',
        window.MathJax.Hub
      ])
      this.meatIsEditing = false
    },
    onDoubleClick: function () {
      this.meatIsEditing = true
    },
    onInput: function () {
      this.autoSave()
    },
    autoSave () {
    },
    // referenced from the source code of vue-mathjax
    // https://github.com/justforuse/vue-mathjax.git
    renderContent () {
      this.$refs.mjElement.htmlContent = this.markedText
    },
    renderMathJax () {
      this.renderContent()
      if (window.MathJax) {
        window.MathJax.Hub.Config({
          tex2jax: {
            inlineMath: [['$', '$']],
            displayMath: [['$$', '$$']],
            processEscapes: true,
            processEnvironments: true
          },
          // Center justify equations in code and markdown cells. Elsewhere
          // we use CSS to left justify single line equations in code cells.
          displayAlign: 'center',
          'HTML-CSS': {
            styles: { '.MathJax_Display': { margin: 0 } },
            linebreaks: { automatic: true }
          }
        })
        window.MathJax.Hub.Queue([
          'Typeset',
          window.MathJax.Hub,
          this.$refs.mjElement
        ])
      }
    }
  },
  watch: {
    meatText () {
      this.renderMathJax()
    }
  }
}
</script>
<style scoped>

</style>
