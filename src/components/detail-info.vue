<template>
	<div class="detail-info">
    <img class="info-img" :src="info.image">
    <div class="detail-info-title">
      <h6>{{info.name}}</h6>
      <p>
        <label>月售{{info.sellCount}}份</label>
        <label v-if="info.rating != ''">好评率{{info.rating}}</label>
      </p>
      <div class="detail-info-money">
        <p>
          <label>￥{{info.price}}</label>
          <label v-if="info.oldPrice != ''">￥{{info.oldPrice}}</label>
        </p>
        <a @click="add_cart" v-if="!show_seller">加入购物车</a>
        <div v-if="show_seller" class="show-seller">
          <seller-list :food_name='info.name' :food_math='rating_math' :food_price='info.price'></seller-list>
        </div>
      </div>
    </div>
    <div class="detail-info-desc">
      <h6>商品介绍</h6>
      <div>{{info.info}}</div>
    </div>
    <div class="detail-info-view">
      <h6>商品评价</h6>
      <ul class="detail-info-banner">
        <li @click="get_rating(index)" :class="{'li-active': select_index == index}" v-for="(list,index) in li_list">{{list.li_name}}<small>{{list.li_math}}</small></li>
      </ul>
      <p class="detail-con-degree" :class="{'success-active': select_p}" @click="get_info">只看有内容的评价</p>
      <detail-raing :rating = "info.ratings"></detail-raing>
    </div>
    <a class="back" @click="back_page">
      <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300" style="enable-background:new 0 0 300 300;" xml:space="preserve">
        <path id="XMLID_1_" class="st0" d="M72.3,137.2L202.1,7.5c7.3-7.3,18.3-7.3,25.6,0s7.3,18.3,0,25.6l-117,117l117,117 c7.3,7.3,7.3,18.3,0,25.6c-7.3,7.3-18.3,7.3-25.6,0L72.3,162.8C65,155.5,65,144.5,72.3,137.2z" fill="#fff"/>
      </svg>
    </a>
  </div>
</template>

<script>
import detailraing from './detail-raing.vue'
import sellerlist from './SellerList.vue'
import bus from '../bus.js'

export default {
  props: {
    good_info: {
      type: Object,
      default: {}
    },
    good_math: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      info: {},
      select_p: false,
      show_seller: false,
      select_index: 0,
      rating_math: 0,
      li_list: [
        {
          li_name: '全部',
          li_math: 57
        },
        {
          li_name: '推荐',
          li_math: 47
        },
        {
          li_name: '吐槽',
          li_math: 10
        }
      ]
    }
  },
  components: {
    'detail-raing': detailraing,
    'seller-list': sellerlist
  },
  created () {
    this.info = this.good_info
    this.rating_math = this.good_math
    if (this.rating_math > 0) {
      this.show_seller = true
    }
    window.shopcartview = true
    bus.$off('detailgood')
    bus.$on('detailgood', (obj) => {
      this.detail_math(obj)
    })
  },
  methods: {
    back_page () {
      this.$parent.detail_bool = false
      window.shopcartview = false
    },
    get_rating (index) {
      this.select_index = index
      bus.$emit('detailinfo', index, this.select_p)
    },
    get_info () {
      this.select_p = !this.select_p
      bus.$emit('hasinfo', this.select_index, this.select_p)
    },
    add_cart () {
      this.show_seller = true
      this.rating_math = 1
      var obj = {
        tag: 1,
        price: this.info.price
      }
      var info = {
        name: this.info.name,
        price: this.info.price,
        math: this.rating_math
      }
      bus.$emit('test', obj)
      bus.$emit('shopInfo', info)
      bus.$emit('startinfo', info)
    },
    detail_math (obj) {
      if (this.info.name === obj.name) {
        this.rating_math = obj.math
        if (this.rating_math === 0) {
          this.show_seller = false
        }
      }
    }
  }
}
</script>

<style>
.back{
  position: fixed;
  bottom:60px;
  right: 20px;
  width: 40px;
  height: 40px;
  background:#00A0DC;
  padding:10px;
  box-sizing: border-box;
  border-radius: 50%;
}
.detail-info{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:50px;
  z-index: 110;
  background: #F3F5F7;
  overflow-y: auto;
  overflow-x: hidden;
  overflow-scrolling:touch;
  -webkit-overflow-scrolling:touch;
}
.show-seller{
  position: relative;
  height: 24px;
}
.info-img{
  width: 100%;
}
.detail-info-title{
  position: relative;
  margin-bottom:16px;
  padding: 0 18px 18px;
  background:#fff;
}
.detail-info-title:after{
  content: '';
  position: absolute;
  bottom:0;
  left:0;
  right:0;
  height: 1px;
  background: rgba(7,17,27,0.1);
  transform: scaleY(0.5);
}
.detail-info-title h6{
  font-size: 14px;
  font-weight: bold;
  color: rgb(7,17,27);
  padding:18px 0 8px;
}
.detail-info-title>p{
  font-size: 10px;
  color:rgb(147,153,159);
  line-height: 10px;
  margin-bottom:18px;
}
.detail-info-title>p label:first-child{
  margin-right: 12px;
}
.detail-info-money {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail-info-money p label:nth-of-type(1){
  font-size: 14px;
  color:rgb(240,20,20);
  line-height: 24px;
  height: 24px;
}
.detail-info-money p label:nth-of-type(2){
  text-decoration: line-through;
  font-size: 10px;
  color:rgb(147,153,159);
  line-height: 24px;
  height: 24px;
}
.detail-info-money a{
  background:rgb(0,160,220);
  border-radius: 14px;
  height: 28px;
  padding:6px 12px;
  line-height: 14px;
  font-size: 12px;
  box-sizing: border-box;
  color:#fff;
}
.detail-info-desc{
  background: #fff;
  border-top:1px solid #E6E7E8;
  border-bottom:1px solid #E6E7E8;
  padding:0 18px 18px;
}
.detail-info-desc h6{
  padding: 18px 0 6px;
  font-size: 14px;
  color:rgb(7,17,27);
  height: 14px;
  line-height: 14px;
}
.detail-info-desc div{
  font-size: 12px;
  color:rgb(77,85,93);
  line-height: 24px;
}
.detail-info-view{
  margin-top:20px;
  border-top:1px solid #E6E7E8;
  background:#fff;
}
.detail-info-view h6{
  font-size: 14px;
  color:rgb(7,17,27);
  height: 14px;
  line-height: 14px;
  padding:18px 0 6px 18px;
}
.detail-info-banner{
  overflow:hidden;
  padding:18px;
}
.detail-info-banner li{
  float: left;
  margin-right: 10px;
  border-radius: 4px;
  height: 35px;
  line-height: 35px;
  padding:0 15px;
  background:#E9EBEC;
  font-size: 14px;
  color:#333;
  list-style: none;
}
.detail-info-banner li.li-active{
  background:#00A0DC;
  color: #fff;
}
.detail-con-degree{
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  color: #979CA2;
  padding-left:45px;
  position: relative;
  background:url(../assets/success.png) 10px center no-repeat;
  background-size: 25px;
  border-bottom: 1px solid #E6E7E8;
}
.detail-con-degree.success-active{
  background:url(../assets/success-active.png) 10px center no-repeat;
  background-size: 25px;
}
.detail-con-degree:before{
  content: '';
  position: absolute;
  top:0;
  left: 16px;
  right: 16px;
  height: 1px;
  transform: scaleY(0.5);
  background:#EBECED;
}
small{
  margin-left:5px;
}
</style>
