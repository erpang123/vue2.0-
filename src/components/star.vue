<template>
	<div class="star-lists">
    <a v-for="i in star" :class="{'star-active': i <= star_has}"></a>
  </div>
</template>

<script>
export default {
  props: {
    star_list: {
      type: Number,
      default: 5
    },
    star_active: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      star: 1,
      star_has: 1
    }
  },
  created () {
    this.star = this.star_list
    this.star_has = this.star_active
  }
}
</script>

<style>
  .star-lists{
    overflow:hidden;
  }
  .star-lists a{
    float: left;
    width: 15px;
    height: 15px;
    background:url(../assets/star36_off.png) center no-repeat;
    background-size:contain;
    margin-right:5px;
  }
  .star-lists a:last-child{
    margin-right:0;
  }
  .star-lists a.star-active{
    background:url(../assets/star36_on.png) center no-repeat;
    background-size:contain;
  }
</style>
