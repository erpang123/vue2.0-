<template>
	<div class="shop-info">
    <div>
      <div>
        <h1>{{good_info.name}}</h1>
        <div class="good-star">
          <star :star_active="good_info.score"></star>
        </div>
      </div>
      <div>
        <p class="linear">
          <i></i>
          <label>优惠信息</label>
          <i></i>
        </p>
        <div class="linear-cube">
          <div class="linear-list" :class="{'linear-img1': list.type==0,'linear-img2': list.type==1,'linear-img3': list.type==2,'linear-img4': list.type==3,'linear-img5': list.type==4}" v-for="list in good_info.supports">{{list.description}}</div>
        </div>
      </div>
      <div>
        <p class="linear mar-top">
          <i></i>
          <label>商家公告</label>
          <i></i>
        </p>
        <div class="shop-announ">{{good_info.bulletin}}</div>
      </div>
      <a class="close" @click="hide_info">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 768 768">
          <path xmlns="http://www.w3.org/2000/svg" d="M607.5 205.5l-178.5 178.5 178.5 178.5-45 45-178.5-178.5-178.5 178.5-45-45 178.5-178.5-178.5-178.5 45-45 178.5 178.5 178.5-178.5z" fill="#6C7278"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import star from './star'

export default {
  data () {
    return {
      good_info: {}
    }
  },
  components: {
    'star': star
  },
  created () {
    this.$http({
      url: '/api/goods',
      method: 'get'
    }).then((data) => {
      this.good_info = JSON.parse(data.body).seller
    }, (error) => {
      console.log(error)
    })
  },
  methods: {
    hide_info () {
      this.$parent.blur_bool = false
      this.$parent.shop_bool = false
    }
  }
}
</script>

<style>
.shop-info{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1110;
  padding-top:64px;
  padding-left:36px;
  padding-right: 36px;
  padding-bottom: 100px;
}
.shop-info>div{
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
}
.shop-info:before{
  content: '';
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background:#07111B;
  opacity: 0.8;
}
.shop-info h1{
  font-size: 16px;
  text-align: center;
  color:#fff;
}
.shop-info p{
  color:#fff;
  font-size: 14px;
  text-align: center;
}
.good-star{
  text-align: center;
  margin-top:16px;
  margin-bottom: 28px;
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.good-star a{
  width:25px;
  height: 25px;
  margin-right: 20px;
}
.linear{
  height: 14px;
  line-height: 14px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}
.linear label{
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  margin:0 auto;
  padding:0 12px;
  flex-shrink: 0;
}
.linear i{
  height: 1px;
  background: rgba(255,255,255,0.2);
  display: block;
  flex-grow:1;
}
.linear-cube{
  padding:0 12px;
}
.linear-list{
  font-size: 12px;
  padding-left: 30px;
  height: 18px;
  line-height: 18px;
  margin-bottom: 10px;
}
.shop-info div{
  color:#fff;
}
.mar-top{
  margin-top:25px;
}
.shop-announ{
  font-size: 12px;
  color:#fff;
  padding: 0px 12px 0;
  line-height: 24px;
}
.linear-img1{
  background:url(../assets/decrease_2.png) left center no-repeat;
  background-size: contain;
}
.linear-img2{
  background:url(../assets/discount_2.png) left center no-repeat;
  background-size: contain;
}
.linear-img3{
  background:url(../assets/special_2.png) left center no-repeat;
  background-size: contain;
}
.linear-img4{
  background:url(../assets/invoice_2.png) left center no-repeat;
  background-size: contain;
}
.linear-img5{
  background:url(../assets/guarantee_2.png) left center no-repeat;
  background-size: contain;
}
.close{
  width:30px;
  height:30px;
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
