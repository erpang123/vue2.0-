<template>
  <goods></goods>
</template>

<script>
import LoadingComp from '@/dome/load'
import ErrorComp from '@/dome/error'
const goods = () => ({
  component: import('@/components/goods'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: 200,
  timeout: 3000
})
export default {
  data () {
    return {

    }
  },
  components: {
    goods: goods
  }
}
</script>
