<template lang="pug">
  .ripple
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import classlist from './classlist'
import elementRef from './element-ref'

const startRipple = function(eventType: any, event: any) {
  let holder = event.currentTarget || event.target

  if (holder && !classlist.has(holder, 'ripple')) {
    holder = holder.querySelector('.ripple')
  }

  if (!holder) {
    return
  }

  // Store the event use to generate this ripple on the holder: don't allow
  // further events of different types until we're done. Prevents double
  // ripples from mousedown/touchstart.
  const prev = holder.getAttribute('data-ui-event')

  if (prev && prev !== eventType) {
    return
  }

  holder.setAttribute('data-ui-event', eventType)

  // Get ripple position
  const rect: any = holder.getBoundingClientRect()
  const x: any = event.clientX - rect.left
  const y: any = event.clientY - rect.top

  // Create the ripple
  const ripple: any = document.createElement('div')
  let max: any

  if (rect.width === rect.height) {
    max = rect.width * 1.412
  } else {
    max = Math.sqrt(rect.width * rect.width + rect.height * rect.height)
  }

  const size: any = max * 2 + 'px'

  // Position the ripple
  ripple.style.width = size
  ripple.style.height = size
  ripple.style.marginLeft = -max + x + 'px'
  ripple.style.marginTop = -max + y + 'px'

  // Add the ripple element
  ripple.className = 'ripple-ink'
  holder.appendChild(ripple)

  setTimeout(() => {
    classlist.add(ripple, 'is-held')
  }, 0)

  const releaseEvent: any = eventType === 'mousedown' ? 'mouseup' : 'touchend'

  const handleRelease = function() {
    document.removeEventListener(releaseEvent, handleRelease)

    classlist.add(ripple, 'is-done')

    // Larger than the animation duration in CSS
    const timeout: number = 650

    setTimeout(() => {
      holder.removeChild(ripple)
      if (holder.children.length === 0) {
        holder.removeAttribute('data-ui-event')
      }
    }, timeout)
  }
  document.addEventListener(releaseEvent, handleRelease)
}

const handleMouseDown = function(e: any) {
  // Trigger on left click only
  e.stopPropagation()
  if (e.button === 0) {
    startRipple(e.type, e)
  }
}

const handleTouchStart = function(e: any) {
  e.stopPropagation()
  if (e.changedTouches) {
    for (let i = 0; i < e.changedTouches.length; ++i) {
      startRipple(e.type, e.changedTouches[i])
    }
  }
}

@Component({
  name: 'Ripple'
})
export default class Ripple extends Vue {
  // 父元素节点,或ref节点(初始化有问题),或#id,或.class
  @Prop() private trigger: any

  private triggerEl: any

  @Watch('trigger')
  onChangeValue(): void {
    this.setupRipple()
  }
  created() {
    // Instance data, not declared in data() as we don't want reactivity.
    this.triggerEl = null
  }

  mounted() {
    this.setupRipple()
  }

  beforeDestroy() {
    this.destroyRipple()
  }

  setupRipple() {
    this.triggerEl = elementRef.resolve((this as any).trigger, (this as any).$el.parentElement)
    if (!this.triggerEl) {
      console.error('[UiRippleInk]: Trigger element not found.')
      return
    }

    this.triggerEl.addEventListener('touchstart', handleTouchStart)
    this.triggerEl.addEventListener('mousedown', handleMouseDown)
  }

  destroyRipple() {
    if (!this.triggerEl) {
      return
    }

    this.triggerEl.removeEventListener('mousedown', handleMouseDown)
    this.triggerEl.removeEventListener('touchstart', handleTouchStart)
  }
}
</script>
<style lang="stylus" scoped>
.ripple
  border-radius inherit
  bottom 0
  display block
  left 0
  overflow hidden
  position absolute
  right 0
  top 0
  // Forces webkit to properly contain content within border-radius
  -webkit-mask-image -webkit-radial-gradient(circle, white, black)

.ripple >>> .ripple-ink
  background-clip padding-box
  background-color currentColor
  border-radius 50%
  height 0
  opacity 0.2
  pointer-events none
  position absolute
  will-change transform, opacity
  transform scale(0)
  transition transform 0.6s ease-out, opacity 0.6s ease-out
  user-select none
  width 0

  &.is-held
    opacity 0.4
    transform scale(1)

  &.is-done
    opacity 0!important
</style>
