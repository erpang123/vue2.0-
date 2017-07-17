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
        <li @click="get_rating(index)" :class="{'li-active': select_index == index}" v-for="(list,index) in li_list">{{list.li_name}}<small>{{list.li_math}}</small></li>
      </ul>
      <p class="admin-info-title" :class="{'success-active': select_p}" @click="get_info">只看有内容的评价</p>
      <message-info></message-info>
    </div>
  </div>
</template>

<script>
import star from './star.vue'
import messageInfo from './messageInfo.vue'
import bus from '../bus.js'

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
  },
  methods: {
    get_rating (index) {
      this.select_index = index
      bus.$emit('reload', this.select_index, this.select_p)
    },
    get_info () {
      this.select_p = !this.select_p
      bus.$emit('reload', this.select_index, this.select_p)
    }
  }
}
</script>
