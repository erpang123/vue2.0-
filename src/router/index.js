import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Main = resolve => require(['@/components/main'], resolve)
const SellerCube = resolve => require(['@/components/Seller-cube'], resolve)
const MessageCube = resolve => require(['@/components/message-cube'], resolve)
const GoodsCube = resolve => require(['@/components/goods-cube'], resolve)

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
          component: SellerCube
        },
        {
          path: 'message',
          component: MessageCube
        },
        {
          path: 'goods',
          component: GoodsCube
        }
      ]
    }
  ]
})
