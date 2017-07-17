<template>
	<div class="detail-rating">
    <div class="detail-rating-list" v-for="rating in rating_info">
      <div class="detail-rating-title">
        <p>{{rating.rateTime}}</p>
        <p>
          <label>{{rating.username}}</label>
          <img :src="rating.avatar">
        </p>
      </div>
      <div class="detail-rating-info" v-if="rating.text != ''">
        <i v-if="rating.rateType == 0">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 768 768">
            <path d="M736.5 319.5l-1.5 3h1.5v61.5q0 12-4.5 24l-97.5 225q-15 39-58.5 39h-288q-25.5 0-45-19.5t-19.5-45v-319.5q0-25.5 19.5-45l210-211.5 34.5 34.5q13.5 13.5 13.5 33v10.5l-31.5 147h202.5q25.5 0 45 18.75t19.5 44.25zM31.5 672v-384h129v384h-129z" fill="#00A0DC"></path>
          </svg>
        </i>
        <i v-if="rating.rateType == 1">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 768 768">
            <path d="M607.5 96h129v384h-129v-384zM480 96q25.5 0 45 19.5t19.5 45v319.5q0 25.5-19.5 45l-210 211.5-34.5-34.5q-13.5-13.5-13.5-33v-10.5l31.5-147h-202.5q-25.5 0-45-18.75t-19.5-44.25l1.5-3h-1.5v-61.5q0-12 4.5-24l97.5-225q15-39 58.5-39h288z" fill="#B7BBBF"></path>
          </svg>
        </i>
        <p>{{rating.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../bus.js'

export default {
  props: {
    rating: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      all_info: [],
      rating_info: []
    }
  },
  created () {
    this.rating_info = this.rating
    this.all_info = this.rating
    var allLength = 0
    var goodLength = 0
    var badLength = 0
    if (this.rating_info.length > 0) {
      for (let i in this.rating_info) {
        if (this.rating_info[i].rateType === 0) {
          goodLength++
        } else {
          badLength++
        }
        allLength = goodLength + badLength
      }
    }
    this.$parent.li_list[0].li_math = allLength
    this.$parent.li_list[1].li_math = goodLength
    this.$parent.li_list[2].li_math = badLength
    bus.$off('detailinfo')
    bus.$off('hasinfo')
    bus.$on('detailinfo', (a, bool) => {
      this.scr_info(a, bool)
    })
    bus.$on('hasinfo', (a, bool) => {
      this.scr_info(a, bool)
    })
  },
  methods: {
    scr_info (a, bool) {
      let allHasInfo = []
      let goodInfo = []
      let goodHasInfo = []
      let badInfo = []
      let badHasInfo = []
      for (let i in this.all_info) {
        if (this.all_info[i].text !== '') {
          allHasInfo.push(this.all_info[i])
        }
        if (this.all_info[i].rateType === 0) {
          if (this.all_info[i].text !== '') {
            goodHasInfo.push(this.all_info[i])
          }
          goodInfo.push(this.all_info[i])
        } else {
          if (this.all_info[i].text !== '') {
            badHasInfo.push(this.all_info[i])
          }
          badInfo.push(this.all_info[i])
        }
      }
      if (bool) {
        this.$parent.li_list[0].li_math = allHasInfo.length
        this.$parent.li_list[1].li_math = goodHasInfo.length
        this.$parent.li_list[2].li_math = badHasInfo.length
      } else {
        this.$parent.li_list[0].li_math = this.all_info.length
        this.$parent.li_list[1].li_math = goodInfo.length
        this.$parent.li_list[2].li_math = badInfo.length
      }
      if (a === 0) {
        if (bool) {
          this.rating_info = allHasInfo
          this.$parent.li_list[0].li_math = allHasInfo.length
        } else {
          this.rating_info = this.all_info
          this.$parent.li_list[0].li_math = this.all_info.length
        }
      } else if (a === 1) {
        if (bool) {
          this.rating_info = goodHasInfo
          this.$parent.li_list[1].li_math = goodHasInfo.length
        } else {
          this.rating_info = goodInfo
          this.$parent.li_list[1].li_math = goodInfo.length
        }
      } else if (a === 2) {
        if (bool) {
          this.rating_info = badHasInfo
          this.$parent.li_list[2].li_math = badHasInfo.length
        } else {
          this.rating_info = badInfo
          this.$parent.li_list[2].li_math = badInfo.length
        }
      }
    }
  }
}
</script>
