<template>
  <div class="page-content">
    <div class="left-nav">
      <div @click="select_this(index)" v-for="(item,index) in items" :class="{'p-active': index == selet}">
        <p>
          <label>{{item.name}}</label>
        </p>
      </div>
    </div>
    <div class="right-show" ref="scroll_view" @scroll="scroll_index">
      <div v-for="(list,index) in items">
        <p class="info-title" :ref='"info_index"+index'>{{list.name}}</p>
        <div class="info-lists" v-for="food in list.foods" @click="detail_info(food)">
          <img :src="food.icon">
          <div>
            <h6 class="food-name">{{food.name}}</h6>
            <div class="rating">
              <label>月售{{food.sellCount}}份</label>
              <label>好评率{{food.rating}}%</label>
            </div>
            <div class="price">
              <a>￥{{food.price}}</a>
              <a style="text-decoration: line-through;" v-if="food.oldPrice != ''">￥{{food.oldPrice}}</a>
              <seller-list ref="sellerlist" :food_name="food.name" :food_price="food.price" :food_math = 'food_math'></seller-list>
            </div>
          </div>
        </div>
      </div>
    </div>
    <keep-alive>
      <transition name="slideleft">
        <detail-info v-if="detail_bool" :good_info="good_info" :good_math="good_math"></detail-info>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import sellerlist from './SellerList.vue'
import detailinfo from './detail-info.vue'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      selet: 0,
      food_math: 0,
      items: [],
      keys: [],
      detail_bool: false,
      good_info: {},
      foodList: [],
      good_math: 0
    }
  },
  created () {
    this.$http({
      url: '/api/seller',
      method: 'get'
    }).then((data) => {
      this.items = data.body.goods
    }, (error) => {
      console.log(error)
    })
  },
  updated () {
    var index = this.items.length
    var keys = []
    for (let i = 0; i < index; i++) {
      let j = 'info_index' + i
      keys.push(this.$refs[j][0].offsetTop)
    }
    this.keys = keys
    window._this = this.$refs.sellerlist
  },
  components: {
    'seller-list': sellerlist,
    'detail-info': detailinfo
  },
  methods: {
    ...mapGetters({
      getShopInfo: 'getShopInfo'
    }),
    select_this (index) {
      this.selet = index
      var i = 'info_index' + index
      this.$refs[i][0].scrollIntoView()
    },
    scroll_index () {
      let scrollTop = this.$refs.scroll_view.scrollTop
      for (var i in this.keys) {
        let j = parseInt(i) + 1
        if (j === this.keys.length) {
          if (scrollTop > this.keys[i]) {
            this.selet = i
            break
          }
        } else {
          if (scrollTop >= this.keys[i] && scrollTop < this.keys[j]) {
            this.selet = i
            break
          }
        }
      }
    },
    detail_info (obj) {
      this.detail_bool = true
      this.good_info = obj
      // 获取购物列表
      let shopInfos = this.getShopInfo()
      for (let info of shopInfos) {
        if (info.name === obj.name) {
          this.good_math = info.math
          return
        }
      }
      this.good_math = 0
    }
  }
}
</script>
