<template>
  <div class="page-content">
    <div class="left-nav">
      <div :ref='"item_index"+index' @click="select_this(index)" v-for="(item,index) in items" :class="{'p-active': index==selet}">
        <p>
          <!-- <img v-if='item.icon!=""' :src="item.icon"/> -->
          <label>{{item.name}}</label>
        </p>
      </div>
    </div>
    <div class="right-show">
      <div v-for="(list,index) in items">
        <p class="info-title" :ref='"info_index"+index'>{{list.name}}</p>
        <div class="info-lists" v-for="food in list.foods">
          <img :src="food.icon">
          <div>
            <h6 class="food-name">{{food.name}}</h6>
            <div class="rating">
              <label>月售{{food.sellCount}}份</label>
              <label>好评率{{food.rating}}%</label>
            </div>
            <div class="price">
              <a>￥{{food.price}}</a>
              <a style="text-decoration: line-through;">￥{{food.oldPrice}}</a>
              <seller-list :food_name="food.name" :food_price="food.price" :food_math = 'food_math'></seller-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sellerlist from './SellerList.vue'

export default {
  data () {
    return {
      selet: 0,
      food_math: 0,
      items: []
    }
  },
  created () {
    this.$http({
      url: '/api/seller',
      method: 'get'
    }).then((data) => {
      this.items = JSON.parse(data.body).goods
    }, (error) => {
      console.log(error)
    })
  },
  components: {
    'seller-list': sellerlist
  },
  watch: {
    food_math (newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  },
  methods: {
    select_this (index) {
      this.selet = index
      var i = 'info_index' + index
      this.$refs[i][0].scrollIntoView()
    }
  }
}
</script>

<style>
.page-content{
  display: flex;
  height: calc(100% - 224px);
  height: -webkit-calc(100% - 224px);
}
.right-show{
  flex-grow:1;
  height: 100%;
  overflow-y:auto;
  overflow-scrolling:touch;
  -webkit-overflow-scrolling:touch;
}
.left-nav{
  width: 80px;
  box-sizing: border-box;
  background:#F4F5F7;
  height: 100%;
  overflow-y:auto;
  overflow-scrolling:touch;
  -webkit-overflow-scrolling:touch;
}
.left-nav div{
  height:54px;
  padding:0 12px;
  box-sizing: border-box;
  font-size: 12px;
  color:#333;
  position: relative;
  display: flex;
  align-items: center;
}
.left-nav div:after{
  content: '';
  position: absolute;
  height: 1px;
  left: 12px;
  right: 12px;
  background:#E6E7E9;
  transform: scaleY(0.5);
  bottom:0;
}
.left-nav div.p-active{
  background:#fff;
  color:#000;
}
.left-nav p img{
  width:12px;
}
.info-title{
  padding-left:16px;
  border-left: 2px solid #D9DDE1;
  background: #F3F5F7;
  font-size: 12px;
  color:#93999F;
  text-align: left;
  height: 27px;
  line-height: 27px;
}
.info-lists{
  display: flex;
  align-items: center;
  padding:18px 0;
  position: relative;
}
.info-lists:not(:last-child):after{
  content: '';
  position: absolute;
  height: 1px;
  left: 18px;
  right: 18px;
  background:#E6E7E9;
  transform: scaleY(0.5);
  transform-origin: 0 0;
  bottom:0;
}
.info-lists>div{
  text-align: left;
  flex-grow:1;
}
.info-lists img{
  width: 36px;
  height: 36px;
  margin-left: 18px;
  margin-right:10px;
}
.food-name{
  font-size: 14px;
  color: rgb(7,17,27);
  line-height: 28px;
  margin-bottom:8px;
  font-weight: normal;
}
.rating{
  font-size: 10px;
  color:rgb(147,153,159);
  line-height: 10px;
}
.rating label:nth-of-type(1){
  margin-right:12px;
}
.price{
  margin-top:5px;
  position: relative;
}
.price a{
  vertical-align: text-top;
}
.price a:nth-of-type(1){
  font-size:14px;
  color:#F21415;
  font-weight: bold;
  line-height: 24px;
  margin-right:8px;
}
.price a:nth-of-type(2){
  font-size: 10px;
  color:rgb(147,153,159);
  font-weight: bold;
  line-height: 24px;
}
.price .set-math{
  right:20px;
}
</style>
