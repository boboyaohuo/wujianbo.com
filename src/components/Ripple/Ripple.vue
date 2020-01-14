<template lang="pug">
  .ripple-mask(:class="{'animate': animate}" ref="rippleMask")
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'Ripple'
})
export default class Ripple extends Vue {
  animate:boolean = false

  reppleClick(e: any): void {
    this.animate = true
    let button:any = e.target
    let ripple:any = this.$refs.rippleMask
    if (ripple) {
      let d:number = Math.sqrt(Math.pow(button.offsetHeight, 2) + Math.pow(button.offsetWidth, 2))
      let x:number = e.layerX - d / 2
      let y:number = e.layerY - d / 2
      ripple.setAttribute('style', 'height: ' + d + 'px; width: ' + d + 'px; top: ' + y + 'px; left: ' + x + 'px;')
    }
    this.$nextTick(() => {
      setTimeout(() => {
        this.animate = false
      }, 650)
    })
  }
}
</script>
<style lang="stylus" scoped>
.ripple-mask
  position absolute
  background rgba(0, 0, 0, .2)
  border-radius 100%
  transform scale(0)
  &.animate
    animation ripple 0.65s linear
@keyframes ripple
  100% {opacity: 0; transform: scale(4);}
</style>
