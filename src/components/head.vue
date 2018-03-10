<template>
	<div class="bannel">
    <div class="flex-box">
      <img src="../assets/shop_img.png">
      <div class="bannel-info">
        <h5 @click='get_shop'>{{goodinfo.name}}</h5>
        <p>{{goodinfo.description}} / {{goodinfo.deliveryTime}}分钟送达</p>
        <p class="p-text1" v-if="index === 0" v-for="(good,index) in goodinfo.supports">{{good.description}}</p>
        <div class="bannel-next">
          <label @click='get_shop'>5个</label>
        </div>
      </div>
    </div>
    <div class="gg-info" @click='get_shop'>
      <p><label ref="alertinfo">{{goodinfo.bulletin}}</label></p>
    </div>
  </div>
</template>

<script>
import { GetGoods } from '@/request/api'

export default {
  data () {
    return {
      first: 1,
      goodinfo: {},
      translateX: 0
    }
  },
  created () {
    this.setGoods()
  },
  updated () {
    if (this.first) {
      let maxWidth = -this.$refs.alertinfo.offsetWidth
      let slideText = () => {
        let translateX = parseInt(this.translateX)
        if (translateX <= maxWidth) {
          translateX = 0
          this.translateX = translateX
        }
        if (translateX <= 0 && translateX > maxWidth) {
          translateX--
          this.translateX = translateX
          this.$refs.alertinfo.style.transform = 'translateX(' + translateX + 'px)'
          this.$refs.alertinfo.style.webkitTransform = 'translateX(' + translateX + 'px)'
          setTimeout(() => {
            slideText()
          }, 50)
        }
      }
      slideText()
      this.first = 0
    }
  },
  methods: {
    get_shop () {
      this.$parent.shop_bool = true
    },
    // 获取产品列表
    async setGoods () {
      let res = await GetGoods()
      let goodslist = res.seller
      this.goodinfo = goodslist
    }
  }
}
</script>
