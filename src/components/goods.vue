<template>
  <div class="merchants">
    <div class="merchants-title">
      <div class="merchants-title1">
        <div>
          <h6>{{shop_info.name}}</h6>
          <div class="merchants-title-star">
            <star :star_list='5' :star_active='4'></star>
            <label>({{shop_info.sellCount}})</label>
            <span>月售{{shop_info.sellCount}}单</span>
          </div>
        </div>
        <div class="collect" :class="{'has-collect': collect}" @click="collect=!collect">收藏</div>
      </div>
      <div class="merchants-title2">
        <div>
          <p>起送价</p>
          <p>{{shop_info.minPrice}}<a>元</a></p>
        </div>
        <div>
          <p>商家配送</p>
          <p>{{shop_info.deliveryPrice}}<a>元</a></p>
        </div>
        <div>
          <p>平均配送时间</p>
          <p>{{shop_info.deliveryTime}}<a>分钟</a></p>
        </div>
      </div>
    </div>
    <div class="merchants-content">
      <h6>公告与活动</h6>
      <div class="merchants-content-info">{{shop_info.bulletin}}</div>
      <div class="com-info-class" :class="{'com-info-img1': list.type==0,'com-info-img2': list.type==1,'com-info-img3': list.type==2,'com-info-img4': list.type==3,'com-info-img5': list.type==4}" v-for="list in shop_info.supports">{{list.description}}</div>
    </div>
    <div class="goods-imglist">
      <h6>商家实景</h6>
      <div>
        <img v-for="img in shop_info.pics" :src="img" />
      </div>
    </div>
    <div class="shops-info">
      <h6>商家信息</h6>
      <div>
        <p v-for="info in shop_info.infos">{{info}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import star from './star.vue'

export default {
  data () {
    return {
      imgs: ['', '', '', ''],
      collect: false,
      shop_info: {}
    }
  },
  components: {
    star: star
  },
  created () {
    this.$http({
      url: '/api/goods',
      method: 'get'
    }).then((data) => {
      var goodslist = JSON.parse(data.body).seller
      this.shop_info = goodslist
    }, (error) => {
      console.log(error)
    })
  }
}
</script>

<style>
  .merchants{
    background: #F3F5F7;
    height: calc(100% - 224px);
    height: -webkit-calc(100% - 224px);
    overflow: auto;
  }
  .merchants-title{
    overflow:hidden;
    padding-left:18px;
    padding-right:18px;
    border-bottom:1px solid #EBECED;
    background:#fff;
  }
  .merchants-title h6{
    margin-top:18px;
    font-size: 14px;
    color:#333;
    height: 14px;
    line-height: 14px;
    margin-bottom:8px;
    font-weight: normal;
  }
  .merchants-content{
    background: #fff;
    margin-top:10px;
    border-top:1px solid #EBECED;
    padding-left:18px;
    padding-right:18px;
  }
  .merchants-content h6{
    padding-top:18px;
    padding-bottom: 8px;
    font-size: 14px;
    color:#333;
    font-weight: normal;
  }
  .merchants-content-info{
    font-size: 12px;
    color:#F01B1B;
    line-height: 24px;
    padding-bottom: 16px;
    position: relative;
  }
  .merchants-content-info:after{
    content: '';
    position: absolute;
    bottom:0;
    left:0px;
    right:0px;
    height:1px;
    transform: scaleY(0.5);
    transform-origin: 0 0;
    background:#EBECED;
  }
  .com-info-class{
    height:48px;
    box-sizing: border-box;
    line-height: 16px;
    padding:16px 0;
    font-size: 12px;
    color:#333;
    padding-left:34px;
    position: relative;
  }
  .com-info-class:not(:last-child):after{
    content: '';
    position: absolute;
    bottom:0;
    left:0px;
    right:0px;
    height:1px;
    transform: scaleY(0.5);
    transform-origin: 0 0;
    background:#EBECED;
  }
  .com-info-img1{
    background:url(../assets/decrease_3.png) 12px center no-repeat;
    background-size: 16px;
  }
  .com-info-img2{
    background:url(../assets/discount_3.png) 12px center no-repeat;
    background-size: 16px;
  }
  .com-info-img3{
    background:url(../assets/special_3.png) 12px center no-repeat;
    background-size: 16px;
  }
  .com-info-img4{
    background:url(../assets/invoice_3.png) 12px center no-repeat;
    background-size: 16px;
  }
  .com-info-img5{
    background:url(../assets/guarantee_3.png) 12px center no-repeat;
    background-size: 16px;
  }
  .merchants-title-star .star-lists{
    float: left;
  }
  .merchants-title-star label,.merchants-title-star span{
    margin-left: 8px;
    font-size: 12px;
    line-height: 14px;
    color:#333;
    vertical-align: 3px;
  }
  .collect{
    font-size: 12px;
    color: #333;
    width: 40px;
    text-align: center;
    margin-top:10px;
    padding-top:30px;
    background:url(../assets/nohot.png) center top no-repeat;
    background-size: 30px;
  }
  .collect.has-collect{
    background:url(../assets/hot.png) center top no-repeat;
    background-size: 30px;
  }
  .merchants-title1{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 18px;
    position: relative;
  }
  .merchants-title1:after{
    content: '';
    position: absolute;
    bottom:0;
    left:0px;
    right:0px;
    height:1px;
    transform: scaleY(0.5);
    transform-origin: 0 0;
    background:#EBECED;
  }
  .merchants-title2{
    display: flex;
    align-items: center;
    padding-top: 18px;
    padding-bottom: 18px;
  }
  .merchants-title2>div{
    flex-grow:1;
    width: 0;
    overflow: hidden;
    position: relative;
  }
  .merchants-title2>div:not(:last-child):after{
    content: '';
    position: absolute;
    bottom:0;
    top:0;
    right:0px;
    width:1px;
    transform: scaleX(0.5);
    transform-origin: 0 0;
    background:#EBECED;
  }
  .merchants-title2>div p:first-child{
    font-size: 10px;
    color: #949AA0;
    margin-bottom:4px;
  }
  .merchants-title2>div p{
    font-size: 18px;
    text-align: center;
    color: #333;
  }
  .merchants-title2>div p:last-child a{
    font-size: 12px;
    color: #333;
  }
  .goods-imglist{
    padding-top:18px;
    padding-left: 18px;
    padding-bottom: 18px;
    border-top:1px solid #E6E7E8;
    background: #fff;
    margin-top:10px;
  }
  .goods-imglist h6{
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
    font-weight: normal;
  }
  .goods-imglist div{
    overflow:hidden;
    font-size: 0;
    white-space: nowrap;
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
  }
  .goods-imglist img{
    width: 120px;
    height: 90px;
    display: inline-block;
    margin-right: 10px;
  }
  .shops-info{
    padding-top:18px;
    padding-left: 18px;
    padding-right: 18px;
    padding-bottom: 8px;
    border-top:1px solid #E6E7E8;
    background: #fff;
    margin-top:10px;
  }
  .shops-info h6{
    font-size: 14px;
    color: #333;
    padding-bottom: 12px;
    font-weight: normal;
    position: relative;
  }
  .shops-info h6:after{
    content: '';
    position: absolute;
    bottom:0;
    left:0px;
    right:0px;
    height:1px;
    transform: scaleY(0.5);
    transform-origin: 0 0;
    background:#EBECED;
  }
  .shops-info div p{
    padding-left: 12px;
    padding-right: 12px;
    padding-top:16px;
    padding-bottom: 16px;
    line-height: 16px;
    font-size: 12px;
    position: relative;
  }
  .shops-info div p:not(:last-child):after{
    content: '';
    position: absolute;
    bottom:0;
    left:0px;
    right:0px;
    height:1px;
    transform: scaleY(0.5);
    transform-origin: 0 0;
    background:#EBECED;
  }
</style>
