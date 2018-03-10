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
import { GetGoods } from '@/request/api'

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
    this.setGoods()
  },
  methods: {
    // 获取产品列表
    async setGoods () {
      let res = await GetGoods()
      let goodslist = res.seller
      this.shop_info = goodslist
    }
  }
}
</script>
