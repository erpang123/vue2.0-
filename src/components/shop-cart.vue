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
