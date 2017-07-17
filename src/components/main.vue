<template>
	<div id="main"> 
    <div :class="{'blur': blur_bool}" style="height:100%;">
  		<vue-head></vue-head>
  		<div class="nav">
  			<router-link to="/main/Seller">商品</router-link>
  			<router-link to="/main/message">评价</router-link>
  			<router-link to="/main/goods">商家</router-link>
  		</div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <foot></foot>
    <shop-cart></shop-cart>
    <div v-if="black_show" class="black" @click="hide_cart"></div>
    <transition name="slideleft">
      <shop-info v-if="shop_bool"></shop-info>
    </transition>
	</div>	
</template>

<script>
import foot from './foot'
import vuehead from './head'
import shopcart from './shop-cart'
import shopinfo from './shop-info'
import bus from '../bus.js'

export default {
  data () {
    return {
      black_show: false,
      blur_bool: false,
      shop_bool: false
    }
  },
  components: {
    'foot': foot,
    'shop-cart': shopcart,
    'vue-head': vuehead,
    'shop-info': shopinfo
  },
  mounted () {
    bus.$on('blur', () => {
      this.blur_bool = true
      this.black_show = true
    })
    bus.$on('offblur', () => {
      this.blur_bool = false
      this.black_show = false
    })
    bus.$on('blurshop', () => {
      this.blur_bool = true
      this.shop_bool = true
    })
  },
  methods: {
    hide_cart () {
      this.black_show = false
      this.blur_bool = false
      bus.$emit('shopCart', 0)
      bus.$emit('setcart', false)
    }
  }
}
</script>
