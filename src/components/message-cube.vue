<template>
  <message></message>
</template>

<script>
import LoadingComp from '@/dome/load'
import ErrorComp from '@/dome/error'
const message = () => ({
  component: import('@/components/message'),
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
    message: message
  }
}
</script>
