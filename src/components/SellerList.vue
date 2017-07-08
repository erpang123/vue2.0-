<template>
  <div class="set-math">
    <transition name='grid' @before-enter="beforeEnter" @after-enter="afterEnter">
      <a v-if="show" class="math-cube"></a>
    </transition>
    <span v-if="math != 0" class="code-btn" @click="code_math"></span>
    <label :data-value="new_math">{{math}}</label>
    <span class="add-btn" ref='add_btn' @click="add_math"></span>
  </div>
</template>

<script>
import bus from '../bus.js'
var _this = []
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
    bus.$on('setcart', (a) => {
      window.shopcartview = a
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
    code_math () {
      this.math--
      if (window.shopcartview) {
        for (var i in _this) {
          if (_this[i].name === this.name) {
            _this[i].obj.math = this.math
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
      var obj = {
        tag: 0,
        price: this.price
      }
      bus.$emit('test', obj)
    },
    add_math () {
      this.show = true
      this.math++
      if (window.shopcartview) {
        for (var i in _this) {
          if (_this[i].name === this.name) {
            _this[i].obj.math = this.math
            break
          }
        }
      } else {
        var tab = {
          obj: this,
          name: this.name
        }
        _this.push(tab)
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

<style>
.set-math{
  position: absolute;
  right:0;
  top:0;
  width: 90px;
  right: 0;
  z-index: 100;
}
.set-math label{
  font-size: 12px;
  color: #93999F;
  display: block;
  padding:0 28px;
  text-align: center;
  line-height: 24px;
}
.code-btn{
  position: absolute;
  width: 24px;
  height: 24px;
  top:0;
  left:0;
  z-index: 1;
  border-radius: 50%;
  border:2px solid #00A0DC;
  background:#fff;
  box-sizing: border-box;
}
.code-btn:after{
  content: '';
  position: absolute;
  width: 12px;
  height:2px;
  background: #00A0DC;
  left:4px;
  top:9px;
}
.add-btn{
  position: absolute;
  width: 24px;
  height: 24px;
  top:0;
  right: 0;
  border-radius: 50%;
  border:2px solid #00A0DC;
  background:#00A0DC;
  box-sizing: border-box;
  z-index: 1;
}
.add-btn:after{
  content:'';
  position: absolute;
  width:12px;
  height:2px;
  background:#fff;
  left:4px;
  top:9px;
}
.add-btn:before{
  content: "";
  position: absolute;
  width:12px;
  height: 2px;
  background:#fff;
  left:4px;
  top:9px;
  transform: rotateZ(90deg);
  transform-origin: center;
}
.math-cube{
  position: fixed;
  width: 10px;
  height: 10px;
  z-index: 99;
  border-radius: 50%;
  background: #f00;
  transition: top 0.2s cubic-bezier(.42,-0.44,.44,.13),
              left 0.2s linear;
  -webkit-transition: top 0.2s cubic-bezier(.42,-0.44,.44,.13),
                      left 0.2s linear;
  -moz-transition: top 0.2s cubic-bezier(.42,-0.44,.44,.13),
                   left 0.2s linear;
}
</style>
