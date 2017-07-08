<template>
  <div class="admin-message">
    <div class="message-star">
      <div class="message-star-score">
        <p>3.9</p>
        <p>综合评分</p>
        <p>高于周边商家69.2%</p>
      </div>
      <div class="star-cube">
        <div class="message-star-math">
          <label>服务态度</label>
          <star :star_list='star_list' :star_active='star_active'></star>
          <span>3.9</span>
        </div>
        <div class="message-star-math">
          <label>服务态度</label>
          <star :star_list='star_list' :star_active='star_active'></star>
          <span>4.0</span>
        </div>
        <div class="get-time">
          <label>服务态度</label>
          <span>44分钟</span>
        </div>
      </div>
    </div>
    <div class="admin-info-view">
      <ul class="admin-info-banner">
        <li @click="select_index=index" :class="{'li-active': select_index == index}" v-for="(list,index) in li_list">{{list.li_name}}<small>{{list.li_math}}</small></li>
      </ul>
      <p class="admin-info-title" :class="{'success-active': select_p}" @click="select_p=!select_p">只看有内容的评价</p>
      <message-info></message-info>
    </div>
  </div>
</template>

<script>
import star from './star.vue'
import messageInfo from './messageInfo.vue'

export default {
  data () {
    return {
      star_list: 5,
      star_active: 4,
      select_p: false,
      select_index: 0,
      li_list: [
        {
          li_name: '全部',
          li_math: 57
        },
        {
          li_name: '满意',
          li_math: 47
        },
        {
          li_name: '不满意',
          li_math: 10
        }
      ]
    }
  },
  components: {
    star: star,
    'message-info': messageInfo
  }
}
</script>

<style>
  .admin-message{
    background: #F3F5F7;
    height: calc(100% - 224px);
    height: -webkit-calc(100% - 224px);
    overflow: auto;
  }
  .message-star{
    display: flex;
    background: #fff;
    border-bottom:1px solid #E6E7E8;
  }
  .message-star-score{
    width: 137px;
    flex-grow:1;
    position: relative;
  }
  .message-star-score:after{
    position: absolute;
    right: 0;
    top:18px;
    bottom: 18px;
    width: 1px;
    content: '';
    background: #EEEEEF;
    transform: scaleX(0.5);
  }
  .message-star-score p{
    text-align: center;
  }
  .message-star-score p:nth-of-type(1){
    font-size: 24px;
    color:#FF9900;
    height: 28px;
    line-height: 28px;
    margin-top:18px;
    margin-bottom:6px;
  }
  .message-star-score p:nth-of-type(2){
    margin-bottom: 8px;
    font-size: 12px;
    color:#121C25;
    height: 12px;
    line-height: 12px;
  }
  .message-star-score p:nth-of-type(3){
    font-size: 10px;
    color: #9DA3A8;
    height: 10px;
    line-height: 10px;
  }
  .star-cube{
    padding:18px 24px;
    flex-grow:1;
    width: 237px;
    box-sizing: border-box;
  }
  .star-cube label{
    font-size:12px;
  }
  .message-star-math{
    display: flex;
    margin-bottom: 8px;
  }
  .message-star-math .star-lists{
    margin:0 12px;
  }
  .message-star-math span{
    font-size: 12px;
    color:#FF9C0C;
  }
  .get-time span{
    font-size: 12px;
    color: #93999F;
    margin-left: 12px;
  }
  .admin-info-view{
    margin-top:20px;
    border-top:1px solid #E6E7E8;
    background:#fff;
  }
  .admin-info-banner{
    overflow:hidden;
    padding:18px;
  }
  .admin-info-banner li{
    float: left;
    margin-right: 10px;
    border-radius: 2px;
    height: 35px;
    line-height: 35px;
    padding:0 15px;
    background:#E9EBEC;
    font-size: 14px;
    color:#333;
    list-style: none;
  }
  .admin-info-banner li.li-active{
    background:#00A0DC;
    color: #fff;
  }
  .admin-info-title{
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #979CA2;
    padding-left:45px;
    position: relative;
    background:url(../assets/success.png) 10px center no-repeat;
    background-size: 25px;
  }
  .admin-info-title.success-active{
    background:url(../assets/success-active.png) 10px center no-repeat;
    background-size: 25px;
  }
  .admin-info-title:after{
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
