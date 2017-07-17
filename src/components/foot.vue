<template>
	<div class="shop-foot" :class="{'has-goods': all_num>0}">
    <a class="shop-cart-price" @click="shop_cart"></a>
    <a class="all-price" v-if="all_num>0">{{all_num}}</a>
    <div class="shop-money">
      <b class="money">￥{{price}}</b>
      <label>另需配送费￥{{shipping_fee}}元</label>
    </div>
    <div class="pay-money" :class="{'get-pay':price>=send_price}">
      <label>￥{{send_price}}起送</label>
    </div>
  </div>
</template>

<script>
import bus from '../bus.js'

export default {
  data () {
    return {
      price: 0,
      shipping_fee: 4,
      send_price: 20,
      all_num: 0
    }
  },
  mounted () {
    bus.$off('test')
    bus.$off('cleartest')
    bus.$on('test', (a) => {
      if (a.tag) {
        this.all_num++
        if (this.all_num === 1) {
          this.price += 4
        }
        this.price += parseFloat(a.price)
      } else {
        this.all_num--
        if (this.all_num === 0) {
          this.price -= 4
        }
        this.price -= parseFloat(a.price)
      }
    })
    bus.$on('cleartest', () => {
      this.price = 0
      this.all_num = 0
    })
  },
  methods: {
    shop_cart () {
      if (this.all_num > 0) {
        bus.$emit('shopCart', 1)
        bus.$emit('blur')
        bus.$emit('setcart', true)
      }
    }
  }
}
</script>
