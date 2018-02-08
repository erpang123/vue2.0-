<template>
  <Seller></Seller>
</template>

<script>
import LoadingComp from '@/dome/load'
import ErrorComp from '@/dome/error'
const Seller = () => ({
  component: import('@/components/Seller'),
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
    Seller: Seller
  }
}
</script>
