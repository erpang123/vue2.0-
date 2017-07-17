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
      <p><label ref="alertinfo" style="margin-left:0;">{{goodinfo.bulletin}}</label></p>
    </div>
  </div>
</template>

<script>
import bus from '../bus.js'

export default {
  data () {
    return {
      first: 1,
      goodinfo: {}
    }
  },
  created () {
    this.$http({
      url: '/api/goods',
      method: 'get'
    }).then((data) => {
      var goodinfo = JSON.parse(data.body).seller
      this.goodinfo = goodinfo
    }, (error) => {
      console.log(error)
    })
  },
  updated () {
    if (this.first) {
      var maxWidth = -(this.$refs.alertinfo.scrollWidth - this.$refs.alertinfo.clientWidth)
      var slideText = () => {
        var marLeft = parseInt(this.$refs.alertinfo.style.marginLeft)
        if (marLeft <= 0 && marLeft > maxWidth) {
          marLeft--
          this.$refs.alertinfo.style.marginLeft = marLeft + 'px'
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
      bus.$emit('blurshop')
    }
  }
}
</script>
