import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Main = () => import('@/components/main' /* webpackChunkName: 'main' */)
const Seller = () => import('@/components/Seller' /* webpackChunkName: 'seller' */)
const Message = () => import('@/components/message' /* webpackChunkName: 'message' */)
const Goods = () => import('@/components/goods' /* webpackChunkName: 'goods' */)

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
          component: Message
        },
        {
          path: 'goods',
          component: Goods
        }
      ]
    }
  ]
})
