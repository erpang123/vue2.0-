<template>
  <div class="set-math">
    <transition name='grid' @before-enter="beforeEnter" @after-enter="afterEnter">
      <a v-if="show" class="math-cube"></a>
    </transition>
    <span v-if="math != 0" class="code-btn" @click.stop="code_math"></span>
    <label :data-value="new_math">{{math}}</label>
    <span class="add-btn" ref='add_btn' @click.stop="add_math"></span>
  </div>
</template>

<script>
import bus from '../bus.js'

window.shopcartview = false // 是否是购物车界面的加减

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
      show: false,
      name: ''
    }
  },
  created () {
    this.math = this.food_math
    this.price = this.food_price
    this.name = this.food_name
    bus.$off('setcart')
    bus.$off('clearcart')
    bus.$off('startinfo')
    bus.$on('setcart', (a) => {
      window.shopcartview = a
    })
    bus.$on('clearcart', () => {
      let _this = window._this
      for (let i in _this) {
        _this[i].math = 0
      }
      _this = []
    })
    bus.$on('startinfo', (obj) => {
      this.startinfo(obj)
    })
  },
  computed: {
    new_math () {
      this.math = this.food_math
      this.price = this.food_price
      this.name = this.food_name
    }
  },
  methods: {
    startinfo (obj) {
      console.log(1)
      let _this = window._this
      for (var i in _this) {
        if (_this[i].name === obj.name) {
          _this[i].math = obj.math
          break
        }
      }
    },
    code_math () {
      this.math--
      let _this = window._this
      if (window.shopcartview) {
        for (var i in _this) {
          if (_this[i].name === this.name) {
            _this[i].math = this.math
            break
          }
        }
      }
      var info = {
        name: this.name,
        price: this.price,
        math: this.math
      }
      bus.$emit('shopInfo', info)
      // bus.$emit('detailmath', info)
      bus.$emit('detailgood', info)
      var obj = {
        tag: 0,
        price: this.price
      }
      bus.$emit('test', obj)
    },
    add_math () {
      this.show = true
      this.math++
      let _this = window._this
      if (window.shopcartview) {
        for (var i in _this) {
          if (_this[i].name === this.name) {
            _this[i].math = this.math
            break
          }
        }
      } else {
        // if (_this.length > 0) {
        //   for (let i in _this) {
        //     if (_this[i].name === this.name) {
        //       _this[i].obj = this
        //     } else {
        //       let tab = {
        //         obj: this,
        //         name: this.name
        //       }
        //       _this.push(tab)
        //     }
        //   }
        // } else {
        //   let tab = {
        //     obj: this,
        //     name: this.name
        //   }
        //   _this.push(tab)
        // }
      }
      var price = this.price
      var obj = {
        tag: 1,
        price: price
      }
      var info = {
        name: this.name,
        price: price,
        math: this.math
      }
      bus.$emit('test', obj)
      bus.$emit('shopInfo', info)
      // bus.$emit('detailmath', info)
      bus.$emit('detailgood', info)
    },
    beforeEnter (el) {
      var x = event.clientX
      var y = event.clientY
      el.style.top = y + 'px'
      el.style.left = x + 'px'
    },
    afterEnter (el) {
      el.style.top = '612px'
      el.style.left = '45px'
      this.show = false
    }
  }
}
</script>
