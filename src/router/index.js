import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MeatEditor from '@/components/editor/MeatEditor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meat-editor/:meatbook_name',
      name: 'MeatEditor',
      component: MeatEditor,
      props: true
    }
  ]
})
