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

<style>
.bannel{
  height: 134px;
  background: url(../assets/banner.png) center no-repeat;
  background-size:100% 100%;
  overflow:hidden;
  font-size: 0;
}
.bannel img{
  margin:24px 16px 18px 24px;
  width: 64px;
  height: 64px;
}
.bannel-info{
  height: 68px;
  margin-top:26px;
  position: relative;
  flex-grow:1;
  overflow:hidden;
}
.bannel-next{
  position: absolute;
  height:12px;
  right:12px;
  bottom:2px;
  padding:7px 10px;
  font-size: 10px;
  color:#fff;
  line-height: 12px;
}
.bannel-next label{
  position: relative;
  display: block;
  z-index: 1;
  padding-right:12px;
  height: 12px;
  line-height: 14px;
  background: url(../assets/next.png) right center no-repeat;
  background-size: 6px;
}
.bannel-next:after{
  position: absolute;
  content: '';
  background:#000;
  opacity: 0.3;
  left:0;
  top:0;
  right:0;
  bottom:0;
  border-radius: 24px;
}
.bannel-info h5{
  font-size: 16px;
  color:#fff;
  font-weight: bold;
  line-height: 18px;
  height: 18px;
  margin-bottom:8px;
  padding-left:46px;
  background: url(../assets/brand.png) left center no-repeat;
  background-size: contain;
}
.bannel-info p{
  font-size: 12px;
  color:#fff;
  font-weight: 200;
  line-height: 12px;
  height:12px;
}
.bannel-info p.p-text1{
  font-size: 10px;
  color:#fff;
  font-weight: 200;
  line-height: 16px;
  height: 14px;
  padding-left:20px;
  padding-right:80px;
  white-space: nowrap;
  overflow:hidden;
  text-overflow: ellipsis;
  margin-top:8px;
  background:url(../assets/decrease_2.png) left center no-repeat;
  background-size: contain;
}
.gg-info{
  overflow:hidden;
  height:28px;
  line-height: 28px;
  position: relative;
  padding:0 12px 0 52px;
}
.gg-info p{
  overflow:hidden;
}
.gg-info label{
  display: block;
  font-size:12px;
  color:#fff;
  white-space: nowrap;  
  overflow:hidden;
  text-overflow: ellipsis;
  position: relative;
  z-index: 1;
}
.gg-info:after{
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background:#000;
  opacity: 0.3;
  content: '';
}
.gg-info:before{
  content: '';
  position: absolute;
  left:12px;
  right:6px;
  top:0;
  bottom:0;
  z-index: 1;
  background:url(../assets/bulletin.png) left center no-repeat,url(../assets/next.png) right center no-repeat;
  background-size: 30px 15px, 6px;
}
</style>
