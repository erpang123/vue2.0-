<template>
  <div class="map-view">
		<div class="map-title">
			<span>杭州市</span>
			<input type="text" v-model="city"/>
		</div>
		<div class="map-setting" @click='getInfoList'><span>定位到当前位置</span></div>
		<div class="map-lists">
			<p v-for="addList in addLists" @click='getInfoList'>{{addList.name}}</p>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      city: '',
      addLists: []
    }
  },
  mounted () {
    this.MapPosition()
  },
  methods: {
    MapPosition () {
      let geolocation = new qq.maps.Geolocation('V44BZ-KMQC4-7XMUX-DXXJT-3UHIO-V7FEH', 'myapp')
      let options = {timeout: 8000}
      let searchService = new qq.maps.SearchService({
        complete: (results) => {
          this.addLists = results.detail.pois
        },
        error: function () {
          alert('出错了。')
        }
      })
      let setMap = (mapInfo) => {
        let lat = mapInfo.lat
        let lng = mapInfo.lng
        let myLatlng = new qq.maps.LatLng(lat, lng)
        searchService.searchNearBy('西溪', myLatlng, 4000)
      }
      let showPosition = (position) => {
        setMap(position)
      }
      let showErr = () => {
        alert('定位失败！')
      }
      geolocation.getLocation(showPosition, showErr, options)
    },
    getInfoList () {
      this.$router.push('/main/Seller')
    }
  }
}
</script>

