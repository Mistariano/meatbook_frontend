<template>
  <div class="meat-block-wrapper">
    <textarea class="meat-block-textarea" v-show="meatIsEditing" ref="meatTextarea" v-model="meatText" title="text"
              @keydown.shift.enter="onShiftEnter()"
              @keydown.enter="onEnter()"
    >
    </textarea>
    <div class="meat-block-rendered" ref="meatRendered" :style="{width:renderedWidth}" @dblclick="onDoubleClick()"
         v-html="markedText" tabindex="0">
    </div>
  </div>
</template>
<script>
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

export default {
  name: 'MeatBlock',
  props: ['meat'],
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
    renderedWidth () {
      if (this.meatIsEditing) {
        return '45%'
      } else {
        return '100%'
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
      this.save()
    },
    onEnter () {
    },
    onDoubleClick: function () {
      this.meatIsEditing = true
      this.save()
    },
    onCtrlZ () {
      this.meatText = this.textHistory.pop()
    },
    onKey (e) {
      if (e.key.length === 1 && /[0-9a-z]/i.test(e.key)) {
        return
      }
      this.textHistory.push(this.meatText)
    },
    save () {
      this.$emit('save', this.meat.name)
    },
    renderMathJax () {
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
    },
    resizeTextarea: function () {
      this.$refs.meatTextarea.style.height = '0px'
      this.$refs.meatTextarea.style.height = this.$refs.meatTextarea.scrollHeight - 20 + 'px'
    }
  },
  watch: {
    meatText () {
      this.save()
      this.renderMathJax()
    }
  },
  mounted () {
    this.renderMathJax()
  },
  updated () {
    this.resizeTextarea()
  },
  data () {
    return {
      textHistory: []
    }
  }
}
</script>
<style scoped>
  .meat-block-textarea {
    display: inline-block;
    vertical-align: top;
    word-wrap: break-word;
    border: gray 1px solid;
    background: #f3f3f3;
    overflow: hidden;
    resize: none;
    padding: 10px;
    margin: 0;
    width: 50%;
  }

  .meat-block-rendered {
    vertical-align: top;
    display: inline-block;
    padding: 10px;
    margin: 0;
    word-wrap: break-word;
  }

  .meat-block-rendered:focus {
    border: blue 1px solid;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
  }
</style>
