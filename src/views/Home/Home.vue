<template>
  <div>
    <swiper msg="boboyaohuo" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Swiper from '@/components/Swiper/Swiper.vue'
import { login } from '@/api/home.ts'

@Component({
  components: {
    Swiper
  }
})
export default class Home extends Vue {
  mounted() {
    login({ wd: '阿哲' })
  }
}
</script>
<style lang="stylus" scoped></style>
