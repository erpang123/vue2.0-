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

<style>
.shop-foot{
  position: fixed;
  height: 50px;
  width: 100%;
  bottom:0;
  z-index: 110;
}
.all-price{
  position: absolute;
  top:-10px;
  left: 40px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  background:#f00;
  z-index: 11;
  font-size: 12px;
  color:#fff;
}
.shop-foot:before{
  content: '';
  background:#141d27;
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:#000;
}
.shop-foot .shop-cart-price{
  position: absolute;
  width: 44px;
  height: 58px;
  left: 18px;
  background:url(../assets/shop1.png) left top no-repeat;
  background-size: 100%;
  bottom:0;
  z-index: 11;
}
.shop-foot.has-goods .shop-cart-price{
  background:url(../assets/shop-active.png) left top no-repeat;
  background-size: 100%;
}

.shop-money{
   margin-top: 14px;
   font-size: 0;
   position: relative;
   z-index: 1;
   padding-left:80px;
   padding-right:105px;
}
.shop-money .money:after{
  position: absolute;
  content: '';
  width: 1px;
  height:20px;
  background:#2C343D;
  transform: scaleX(0.5);
  right: 0px;
}
.shop-money .money{
  font-size: 16px;
  color:rgba(255,255,255,0.4);
  font-weight: 700;
  line-height: 24px;
  padding-right:8px;
  position: relative;
}
.shop-money label{
  margin-left: 8px;
  font-size: 16px;
  color:rgba(255,255,255,0.4);
  line-height: 24px;
}
.pay-money{
  position: absolute;
  top:0;
  right:0;
  width: 105px;
  background:#2B333B;
  font-size: 14px;
  color:rgba(255,255,255,0.4);
  font-weight: 700;
  line-height: 24px;
  box-sizing: border-box;
  padding-top:14px;
  height: 100px;
  padding-left: 8px;
  padding-right:8px;
  text-align: center;
  letter-spacing: 2px;
}
.pay-money.get-pay{
  background:#43d0e0;
  color: #fff;
}
</style>
