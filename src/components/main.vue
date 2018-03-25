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
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
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
  computed: {
    black_show () {
      return this.getShopCat()
    }
  },
  methods: {
    ...mapActions({
      setShopCat: 'setShopCat'
    }),
    ...mapGetters({
      getShopCat: 'getShopCat'
    }),
    hide_cart () {
      this.setShopCat(false)
      this.blur_bool = false
    }
  }
}
</script>

<style>
.map-view{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index: 200;
}
.map-cube{
  height: 300px;
  width: 100%;
  border: 1px solid #e6e6e6;
}
</style>

