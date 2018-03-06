<template>
	<div class="shop-cart" v-if='showCube'>
    <div v-if="cart_bool" class="mask"></div>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      goods: [],
      cart_bool: false
    }
  },
  components: {
    'seller-list': sellerlist
  },
  computed: {
    showCube () {
      this.goods = this.getShopInfo()
      return this.getShopCat()
    }
  },
  methods: {
    ...mapActions({
      sendInfo: 'setShopInfo',
      setShopCat: 'setShopCat',
      setPrice: 'setPrice',
      setNum: 'setNum'
    }),
    ...mapGetters({
      getShopInfo: 'getShopInfo',
      getShopCat: 'getShopCat'
    }),
    clear_info () {
      this.cart_bool = false
      // 隐藏购物车
      this.setShopCat(false)
      // 清空购物车列表
      this.sendInfo([])
      // 清除总价格
      this.setPrice(0)
      // 清除总产品数
      this.setNum(0)
    }
  }
}
</script>
