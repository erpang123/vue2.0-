<template>
  <div class="set-math">
    <span v-if="math != 0" class="code-btn" @click.stop="code_math"></span>
    <label :data-value='newMath'>{{math}}</label>
    <span class="add-btn" ref='add_btn' @click.stop="add_math($event)"></span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    food_name: {
      type: String,
      default: ''
    },
    food_math: {
      type: Number,
      default: 0
    },
    food_price: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      math: 0,
      price: 0,
      name: '',
      show: false,
      pageX: 0,
      pageY: 0
    }
  },
  computed: {
    newMath () {
      this.name = this.food_name
      this.price = this.food_price
      let shopInfos = this.getShopInfo()
      for (let info of shopInfos) {
        if (this.name === info.name) {
          this.math = info.math
          return
        }
      }
      this.math = 0
    }
  },
  methods: {
    ...mapGetters({
      getShopInfo: 'getShopInfo',
      getSumNum: 'getSumNum',
      getPrice: 'getPrice'
    }),
    ...mapActions({
      setInfo: 'setShopInfo',
      setNum: 'setNum',
      setPrice: 'setPrice'
    }),
    code_math () {
      this.math--
      let info = {
        name: this.name,
        price: this.price,
        math: this.math
      }
      // 减少总价
      this.setSumPrice(-this.price)
      // 减商品总数
      this.setSumNum(-1)
      // 存储商品列表
      this.sendInfo(info)
    },
    add_math (e) {
      this.show = true
      this.math++
      let info = {
        name: this.name,
        price: this.price,
        math: this.math
      }
      // 增加总价
      this.setSumPrice(this.price)
      // 添加商品总数
      this.setSumNum(1)
      // 判断列表中是否有数据
      this.sendInfo(info)
      // 添加动效(函数文件在myplugin中)
      this.circleAnimate(e)
    },
    // 判断列表中是否有数据
    sendInfo (info) {
      let shopInfos = this.getShopInfo()
      if (shopInfos.length === 0) {
        shopInfos.push(info)
      } else {
        for (let k = 0; k < shopInfos.length; k++) {
          if (shopInfos[k].name === info.name) {
            if (info.math === 0) {
              shopInfos.splice(k, 1)
            } else {
              shopInfos[k].math = info.math
            }
            break
          } else if (k === shopInfos.length - 1) {
            shopInfos.push(info)
          }
        }
      }
      this.setInfo(shopInfos)
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
