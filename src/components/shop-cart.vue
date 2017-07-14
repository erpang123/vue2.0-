<template>
	<div class="shop-cart" v-if='cart_boolean'>
    <div class="shop-cart-alert" v-if="cart_bool">
      <h6>是否要清空购物车</h6>
      <p>
        <a @click="cart_bool = false">取消</a>
        <i></i>
        <a @click="clear_info">确定</a>
      </p>
    </div>
		<h5>
			<label>购物车</label>
			<a @click="cart_bool = true">清空</a>
		</h5>
    <div class="no-shop" v-if="goods.length===0">还未点餐</div>
		<ul v-if="goods.length>0">
			<li v-for="good in goods">
				<label>{{good.name}}</label>
				<div>
					<span class="good-money">￥{{good.price}}</span>
          <seller-list :food_name="good.name" :food_price="good.price" :food_math="good.math"></seller-list>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import sellerlist from './SellerList'
import bus from '../bus.js'

export default {
  data () {
    return {
      goods: [],
      cart_boolean: false,
      cart_bool: false
    }
  },
  components: {
    'seller-list': sellerlist
  },
  mounted () {
    bus.$off('shopCart')
    bus.$off('shopInfo')
    bus.$on('shopCart', (a) => {
      if (a === 1) {
        this.cart_boolean = true
      } else {
        this.cart_boolean = false
      }
    })
    bus.$on('shopInfo', (obj) => {
      var goods = this.goods
      for (var i in goods) {
        if (goods[i].name === obj.name) {
          if (obj.math === 0) {
            goods.splice(i, 1)
            return
          }
          goods[i].math = obj.math
          return
        }
      }
      this.goods.push(obj)
    })
  },
  methods: {
    clear_info () {
      this.cart_bool = false
      this.cart_boolean = false
      bus.$emit('offblur')
      bus.$emit('setcart', false)
      bus.$emit('cleartest')
      bus.$emit('clearcart')
      this.goods = []
    }
  }
}
</script>

<style>
.shop-cart-alert{
  position: fixed;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding:20px 0 0;
  min-width: 200px;
  box-sizing: border-box;
  border-radius: 4px;
  overflow:hidden;
  background: #fff;
  z-index: 112;
}
.shop-cart-alert h6{
  font-size: 14px;
  color:#333;
  text-align: center;
  position: relative;
  padding:0 16px 20px; 
}
.shop-cart-alert h6:after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background:#e6e6e6;
  transform: scaleY(0.5);
}
.shop-cart-alert p{
  display: flex;
  align-items: center;
}
.shop-cart-alert p a{
  display: block;
  font-size: 12px;
  color:#333;
  height: 30px;
  line-height: 30px;
  text-align: center;
  width: 0;
  flex-grow: 1;
}
.shop-cart-alert p i{
  width: 1px;
  height: 30px;
  background:#e6e6e6;
  transform: scaleX(0.5);
  flex-flow: 0;
  flex-shrink: 0;
}
.shop-cart{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  background:#fff;
  z-index: 108;
}
.shop-cart h5{
  height: 40px;
  padding-left:18px;
  padding-right:18px;
  background:#F3F5F7;
  line-height: 40px;
  overflow:hidden;
  position: relative;
  font-weight: normal;
  border-bottom:1px solid #DBDEE1;
}
.shop-cart h5 label{
  float: left;
  font-size: 14px;
  color: #07111B;
}
.shop-cart h5 a{
  float: right;
  font-size: 12px;
  color: #00A0DC;
}
.shop-cart ul{
  padding-left: 18px;
  padding-right: 18px;
  padding-bottom: 10px;
}
.shop-cart ul li{
  height: 48px;
  list-style: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 24px;
  position: relative;
}
.shop-cart ul li:after{
  content: '';
  position: absolute;
  bottom:0;
  left: 0;
  right: 0;
  height: 1px;
  background: #E9EAEB;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}
.shop-cart ul li>label{
  font-size: 14px;
  color: #07111B;
  flex-grow:3;
  width: 0;
}
.shop-cart ul li>div{
  flex-grow:2;
  width: 0;
  position: relative;
  display: flex;
}
.shop-cart ul li>div .good-money{
  font-weight: bold;
  font-size: 14px;
  color: #F01414;
  padding-right: 100px;
}
.no-shop{
  text-align: center;
  font-size: 14px;
  color:#d8d8d8;
  line-height: 40px;
}
</style>
