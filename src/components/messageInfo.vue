<template>
	<div class="score-info-lists">
    <div class="score-info-list" v-for='list in admin_info'>
      <img class="admin-img" :src="list.avatar">
      <div class="admin-score-info">
        <p class="admin-name">
          <label>{{list.username}}</label>
          <label>{{list.rateTime}}</label>
        </p>
        <div class="arrival-view">
          <star :star_list='5' :star_active='list.score'></star>
          <a class="arrival-time" v-if="list.deliveryTime>0">{{list.deliveryTime}}分钟到达</a>
        </div>
        <p class="admin-score">{{list.text}}</p>
        <div class="recommend" :class="{'no-zan': list.rateType === 0}">
          <a v-for="good in list.recommend">{{good}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import star from './star.vue'
import bus from '../bus.js'

export default {
  data () {
    return {
      all_info: [],
      admin_info: []
    }
  },
  components: {
    star: star
  },
  created () {
    this.$http({
      url: '/api/message',
      method: 'get'
    }).then((data) => {
      var datajson = JSON.parse(data.body).ratings
      var goodMath = 0
      var badMath = 0
      for (let i in datajson) {
        var _this = datajson[i]
        if (_this.score >= 3) {
          goodMath++
        } else {
          badMath++
        }
        var date = new Date(_this.rateTime)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        if (month < 10) {
          month = '0' + month
        }
        var day = date.getDate()
        if (day < 10) {
          day += '0' + day
        }
        var hours = date.getHours()
        if (hours < 10) {
          hours += '0' + hours
        }
        var minutes = date.getMinutes()
        if (minutes < 10) {
          minutes += '0' + minutes
        }
        _this.rateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
      }
      this.$parent.li_list[0].li_math = datajson.length
      this.$parent.li_list[1].li_math = goodMath
      this.$parent.li_list[2].li_math = badMath
      this.admin_info = datajson
      this.all_info = datajson
      bus.$off('reload')
      bus.$on('reload', (idx, idy) => {
        var goodList = []
        var badList = []
        if (idx === 0) {
          this.admin_info = this.all_info
        } else if (idx === 1) {
          for (let i in this.all_info) {
            if (this.all_info[i].score >= 3) {
              goodList.push(this.all_info[i])
            }
          }
          this.admin_info = goodList
        } else if (idx === 2) {
          for (let i in this.all_info) {
            if (this.all_info[i].score < 3) {
              badList.push(this.all_info[i])
            }
          }
          this.admin_info = badList
        }
        this.reload_info(this.admin_info, idy)
      })
    }, (error) => {
      console.log(error)
    })
  },
  methods: {
    reload_info (obj, bool) {
      let info = []
      if (bool) {
        for (let i in obj) {
          if (obj[i].text !== '') {
            info.push(obj[i])
          }
        }
        this.admin_info = info
      }
    }
  }
}
</script>

<style>
  .score-info-lists{
    padding:0 18px;
    border-top:1px solid #E6E7E8;
  }
  .score-info-list{
    display: flex;
    padding:18px 0;
    position: relative;
  }
  .score-info-list:after{
    position: absolute;
    content: '';
    left:0;
    right:0;
    bottom:0;
    height:1px;
    transform: scaleY(0.5);
    background:#F1F1F2;
  }
  .admin-img{
    width: 28px;
    height: 28px;
    margin-right: 12px;
    flex-shrink: 0;
  }
	.admin-name{
    font-size: 10px;
    color: #333;
    line-height: 12px;
    margin-bottom:4px;
  }
  .admin-name label:last-child{
    float: right;
    color: #C3C6C9;
  }
  .admin-score{
    font-size: 12px;
    color: #333;
    line-height: 18px;
    margin-bottom:8px;
    margin-top:8px;
  }
  .admin-score-info{
    flex-grow:1;
  }
  .arrival-view{
    overflow:hidden;
  }
  .arrival-view .star-lists{
    float: left;
  }
  .arrival-time{
    float: left;
    margin-left: 10px;
    font-size: 12px;
    color:#A3A8AD;
    line-height: 14px;
  }
  .recommend{
    padding-left:28px;
    background:url(../assets/zan.png) left top no-repeat;
    background-size: 20px;
    margin-bottom: 18px;
    overflow:hidden;
  }
  .recommend.no-zan{
    background:url(../assets/no-zan.png) left top no-repeat;
    background-size: 20px;
  }
  .recommend a{
    float: left;
    width: 100px;
    font-size: 12px;
    color: #979DA2;
    margin-right:8px;
    padding:0 6px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border:1px solid #EDEEEF;
    border-radius: 2px;
    margin-bottom: 8px;
  }
</style>
