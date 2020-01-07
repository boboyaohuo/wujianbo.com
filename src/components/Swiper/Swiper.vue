<template>
  <div>{{ msg }}</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Swiper extends Vue {
  @Prop() private msg!: string
}
</script>
<style lang="stylus" scoped></style>
