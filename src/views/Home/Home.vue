<template>
  <div>
    <swiper msg="boboyaohuo" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Swiper from '@/components/Swiper/Swiper.vue'

@Component({
  components: {
    Swiper
  }
})
export default class Home extends Vue {}
</script>
<style lang="stylus" scoped></style>
