<template>
	<div class="shop-foot" :class="{'has-goods': all_num > 0}">
    <a class="shop-cart-price" @click="shop_cart"></a>
    <a class="all-price" v-if="all_num > 0">{{all_num}}</a>
    <div class="shop-money">
      <b class="money">￥{{price}}</b>
      <label>另需配送费￥{{shipping_fee}}元</label>
    </div>
    <div class="pay-money" :class="{'get-pay': price >= send_price}">
      <label>￥{{send_price}}起送</label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      price: 0,
      shipping_fee: 4,
      send_price: 20
    }
  },
  computed: {
    all_num () {
      this.price = this.getPrice() + this.shipping_fee
      return this.getSumNum()
    }
  },
  methods: {
    ...mapGetters({
      getSumNum: 'getSumNum',
      getPrice: 'getPrice'
    }),
    ...mapActions({
      setShopCat: 'setShopCat'
    }),
    shop_cart () {
      this.setShopCat(true)
    }
  }
}
</script>
