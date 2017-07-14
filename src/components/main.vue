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

<style>
html,body,p,ul,li,h1,h2,h3,h4,h5,h6{
  margin:0;
  padding:0;
}
html,body{
  height: 100%;
  -webkit-tap-highlight-color: transparent;
}
.black{
  position: fixed;
  top:0;
  left: 0;
  bottom:0;
  right:0;
  background:#141d27;
  opacity: 0.6;
  z-index: 105;
}
.blur{
  filter:blur(3px);
  -webkit-filter:blur(3px);
}
.flex-box{
  display: flex;
  display: -webkit-flex;
}
#main{
  height: 100%;
}
.nav{
	height: 40px;
	display: flex;
	align-items: center;
	position: relative;
}
.nav a{
	flex-grow:1;
	text-align: center;
	color:#333;
	font-size: 14px;
  text-decoration: none;
}
.nav a.router-link-active{
  color: #F12D2C;
}
.nav:after{
	content: '';
	position: absolute;
	bottom:0;
	left: 0;
	right: 0;
	transform: scaleY(0.5);
	transform-origin: 0 0;
	background: #d8d8d8;
	height:1px;
}
.slideleft-enter,.slideleft-leave-active{
  transform: translateX(100%);
}
.slideleft-enter-active,.slideleft-leave-active{
  transition: all 0.5s;
}
</style>
