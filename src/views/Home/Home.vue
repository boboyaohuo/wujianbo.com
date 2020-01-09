<template>
  <div>
    <swiper msg="boboyaohuo" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Swiper from '@/components/Swiper/Swiper.vue'
import { login } from '@/api/home.js'

@Component({
  components: {
    Swiper
  }
})
export default class Home extends Vue {
  mounted() {
    login({ token: 'hah' })
  }
}
</script>
<style lang="stylus" scoped></style>
