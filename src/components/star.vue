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
      star: 1
    }
  },
  created () {
    this.star = this.star_list
  },
  computed: {
    star_has () {
      return this.star_active
    }
  }
}
</script>
