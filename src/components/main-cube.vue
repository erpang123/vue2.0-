<template>
  <mainDom></mainDom>
</template>

<script>
import LoadingComp from '@/dome/load'
import ErrorComp from '@/dome/error'
const mainDom = () => ({
  component: import('@/components/main'),
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
    mainDom: mainDom
  }
}
</script>
