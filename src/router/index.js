import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import Main from '@/components/Main'

Vue.use(Router)

const Main = resolve => require(['@/components/main'], resolve)
const Seller = resolve => require(['@/components/Seller'], resolve)
const message = resolve => require(['@/components/message'], resolve)
const goods = resolve => require(['@/components/goods'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main/Seller'
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: 'Seller',
          component: Seller
        },
        {
          path: 'message',
          component: message
        },
        {
          path: 'goods',
          component: goods
        }
      ]
      // name: 'Hello',
      // component: Hello
    }
  ]
})
