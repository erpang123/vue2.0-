<template>
	<div id="main"> 
    <div ref="blur" style="height:100%;">
  		<div class="bannel">
        <div class="flex-box">
          <img src="../assets/shop_img.png">
          <div class="bannel-info">
            <h5>粥品香坊（大运村）</h5>
            <p>蜂鸟专送 / 38分钟送达</p>
            <p class="p-text1">在线支付满28减5，满50减10</p>
            <div class="bannel-next">
              <label>5个</label>
            </div>
          </div>
        </div>
        <div class="gg-info">
          <label>粥品香坊其烹饪粥料的秘方源于中国千年古法，再融和现代制作工艺</label>
        </div>
  		</div>
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
    'shop-cart': shopcart
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
}
-webkit-appearance: none;
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
.bannel{
  height: 134px;
  background: url(../assets/banner.png) center no-repeat;
  background-size:100% 100%;
  overflow:hidden;
  font-size: 0;
}
.bannel img{
  margin:24px 16px 18px 24px;
	width: 64px;
  height: 64px;
}
.bannel-info{
  height: 68px;
  margin-top:26px;
  position: relative;
  flex-grow:1;
  overflow:hidden;
}
.bannel-next{
  position: absolute;
  height:12px;
  right:12px;
  bottom:2px;
  padding:7px 10px;
  font-size: 10px;
  color:#fff;
  line-height: 12px;
}
.bannel-next label{
  position: relative;
  display: block;
  z-index: 1;
  padding-right:12px;
  height: 12px;
  line-height: 14px;
  background: url(../assets/next.png) right center no-repeat;
  background-size: 6px;
}
.bannel-next:after{
  position: absolute;
  content: '';
  background:#000;
  opacity: 0.3;
  left:0;
  top:0;
  right:0;
  bottom:0;
  border-radius: 24px;
}
.bannel-info h5{
  font-size: 16px;
  color:#fff;
  font-weight: bold;
  line-height: 18px;
  height: 18px;
  margin-bottom:8px;
  padding-left:46px;
  background: url(../assets/brand.png) left center no-repeat;
  background-size: contain;
}
.bannel-info p{
  font-size: 12px;
  color:#fff;
  font-weight: 200;
  line-height: 12px;
  height:12px;
}
.bannel-info p.p-text1{
  font-size: 10px;
  color:#fff;
  font-weight: 200;
  line-height: 16px;
  height: 14px;
  padding-left:20px;
  padding-right:80px;
  white-space: nowrap;
  overflow:hidden;
  text-overflow: ellipsis;
  margin-top:8px;
  background:url(../assets/decrease_2.png) left center no-repeat;
  background-size: contain;
}
.gg-info{
  overflow:hidden;
  height:28px;
  line-height: 28px;
  position: relative;
  padding:0 12px;
}
.gg-info label{
  display: block;
  font-size:12px;
  color:#fff;
  padding-left:40px;
  padding-right:10px;
  background:url(../assets/bulletin.png) left center no-repeat,url(../assets/next.png) right center no-repeat;
  background-size: 30px 15px, 6px;
  white-space: nowrap;  
  overflow:hidden;
  text-overflow: ellipsis;
  position: relative;
  z-index: 1;
}
.gg-info:after{
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background:#000;
  opacity: 0.3;
  content: '';
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
