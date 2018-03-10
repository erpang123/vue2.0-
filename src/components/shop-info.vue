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
import { GetGoods } from '@/request/api'

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
    this.setGoods()
  },
  methods: {
    hide_info () {
      this.$parent.blur_bool = false
      this.$parent.shop_bool = false
    },
    // 获取产品列表
    async setGoods () {
      let res = await GetGoods()
      this.good_info = res.seller
    }
  }
}
</script>
