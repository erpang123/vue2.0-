<template>
	<div class="detail-info" :data-value='math'>
    <div class="detail-info-cube">
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
          <a @click="add_cart($event)" v-if="!show_seller">加入购物车</a>
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
import { mapActions, mapGetters } from 'vuex'

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
  },
  computed: {
    // 获取购物列表
    math () {
      let shopInfos = this.getShopInfo()
      for (let info of shopInfos) {
        if (info.name === this.info.name) {
          return
        }
      }
      this.show_seller = false
    }
  },
  methods: {
    ...mapGetters({
      getShopInfo: 'getShopInfo',
      getSumNum: 'getSumNum',
      getPrice: 'getPrice',
      getCartBtn: 'getCartBtn'
    }),
    ...mapActions({
      setInfo: 'setShopInfo',
      setNum: 'setNum',
      setPrice: 'setPrice'
    }),
    back_page () {
      this.$parent.detail_bool = false
    },
    get_rating (index) {
      this.select_index = index
    },
    get_info () {
      this.select_p = !this.select_p
    },
    add_cart (e) {
      this.show_seller = true
      this.rating_math = 1
      var info = {
        name: this.info.name,
        price: this.info.price,
        math: this.rating_math
      }
      // 增加总价
      this.setSumPrice(this.info.price)
      // 增加商品总数
      this.setSumNum(1)
      // 存储商品列表
      this.sendInfo(info)
      // 添加动效(函数文件在myplugin中)
      this.circleAnimate(e)
    },
    // 存储商品列表
    sendInfo (info) {
      let shopInfo = this.getShopInfo()
      shopInfo.push(info)
      this.setInfo(shopInfo)
    },
    // 存储商品总数
    setSumNum (a) {
      let num = this.getSumNum()
      num = parseInt(a) + num
      this.setNum(num)
    },
    // 存储商品总价
    setSumPrice (a) {
      let price = this.getPrice()
      price += parseInt(a)
      this.setPrice(price)
    }
  }
}
</script>
