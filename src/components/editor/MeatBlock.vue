<template>
  <div>
    <div class="meat-block-textarea-wrapper">
      <textarea class="meat-block-textarea" ref="meatTextarea" v-model="meatText" title="text"
              @keydown.shift.enter="onShiftEnter()"
              v-show="meatIsEditing"
              @input="onInput()"  style="width: 100%"></textarea>
    </div>
    <div class="meat-block-rendered" ref="meatRendered" v-show="!meatIsEditing" @dblclick="onDoubleClick()"
         v-html="markedText" tabindex="0"></div>
  </div>
</template>
<script>
import marked from 'marked'

export default {
  name: 'MeatBlock',
  props: ['meat'],
  data () {
    return {
      textareaRows: 1
    }
  },
  computed: {
    meatText: {
      get () {
        return this.meat['text']
      },
      set (v) {
        if (this.meatIsEditing) {
          this.meat['text'] = v
        }
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
      this.renderMathJax()
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
      this.$refs.meatRendered.htmlContent = this.markedText
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
            styles: {'.MathJax_Display': {margin: 0}},
            linebreaks: {automatic: true}
          }
        })
        window.MathJax.Hub.Queue([
          'Typeset',
          window.MathJax.Hub,
          this.$refs.meatRendered
        ])
      }
    }
  },
  watch: {
    meatText () {
      this.$refs.meatTextarea.style.height = this.$refs.meatTextarea.scrollHeight + 'px'
    }
  }
}
</script>
<style scoped>
  .meat-block-textarea-wrapper {
    background: #f3f3f3;
    border: gray 1px solid;
    border-bottom: none;
  }
  .meat-block-textarea {
    background: transparent;
    overflow: hidden;
    resize: none;
    padding: 0;
    border: none;
    margin: 10px;
  }

  .meat-block-rendered:focus {
    border: blue 1px solid;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
  }
</style>
