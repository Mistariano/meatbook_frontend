import Vue from 'vue'
import Router from 'vue-router'
import MeatPicker from '@/components/MeatPicker'
import MeatEditor from '@/components/editor/MeatEditor'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MeatPicker',
      component: MeatPicker
    },
    {
      path: '/meat-editor/:meatbook_name',
      name: 'MeatEditor',
      component: MeatEditor,
      props: true
    }
  ]
})
