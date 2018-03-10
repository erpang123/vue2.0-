<template>
	<div class="score-info-lists" :data-value='reload'>
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
import { mapGetters } from 'vuex'
import { GetMessage } from '@/request/api'

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
    this.setMessage()
  },
  computed: {
    reload () {
      // 0：全部，1：满意，2：不满意
      let idx = this.getCheckState()
      // 是否显示内容
      let idy = this.getHasContext()
      // 获取所有评价列表
      let allInfo = this.all_info
      if (idy) {
        let allList = []
        let goodList = []
        let badList = []
        for (let i in allInfo) {
          if (allInfo[i].text !== '') {
            allList.push(allInfo[i])
            if (allInfo[i].score >= 3) {
              goodList.push(allInfo[i])
            } else {
              badList.push(allInfo[i])
            }
          }
        }
        this.setInfo(allList, goodList, badList, idx)
      } else {
        let allList = []
        let goodList = []
        let badList = []
        for (let i in allInfo) {
          allList.push(allInfo[i])
          if (allInfo[i].score >= 3) {
            goodList.push(allInfo[i])
          } else {
            badList.push(allInfo[i])
          }
        }
        this.setInfo(allList, goodList, badList, idx)
      }
    }
  },
  methods: {
    ...mapGetters({
      getCheckState: 'getCheckState',
      getHasContext: 'getHasContext'
    }),
    async setMessage () {
      let res = await GetMessage()
      var datajson = res.ratings
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
    },
    setInfo (...obj) {
      let [allList, goodList, badList, idx] = obj
      this.$parent.li_list[0].li_math = allList.length
      this.$parent.li_list[1].li_math = goodList.length
      this.$parent.li_list[2].li_math = badList.length
      if (idx === 0) {
        this.admin_info = allList
      } else if (idx === 1) {
        this.admin_info = goodList
      } else if (idx === 2) {
        this.admin_info = badList
      }
    }
  }
}
</script>
