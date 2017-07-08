<template>
	<div class="shop-cart" v-if='cart_boolean'>
		<h5>
			<label>购物车</label>
			<a>清空</a>
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
      cart_boolean: false
    }
  },
  components: {
    'seller-list': sellerlist
  },
  mounted () {
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
  }
}
</script>

<style>
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
