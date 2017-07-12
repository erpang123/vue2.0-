<template>
	<div id="main"> 
    <div ref="blur" style="height:100%;">
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
    <div ref="black" v-if="black_show" class="black" @click="hide_cart"></div>
	</div>	
</template>

<script>
import foot from './foot'
import vuehead from './head'
import shopcart from './shop-cart'
import bus from '../bus.js'

export default {
  data () {
    return {
      black_show: false
    }
  },
  components: {
    'foot': foot,
    'shop-cart': shopcart,
    'vue-head': vuehead
  },
  mounted () {
    bus.$on('blur', () => {
      this.$refs.blur.className = 'blur'
      this.black_show = true
    })
  },
  methods: {
    hide_cart () {
      this.black_show = false
      this.$refs.blur.className = ''
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
</style>
