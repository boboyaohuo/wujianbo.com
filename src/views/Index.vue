<template lang="pug">
.content(:style="{backgroundColor: color}")
  .header(@click="get")
    .intro {{ text }}
  canvas.live2d#cat(:width="280" :height="250")
</template>
<script lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const text = ref('今日份的想你正在赶来的路上...')
    const id = ref(0)
    const getMark = ref(false)
    const color = ref(`rgba(${random()},${random()},${random()}, .1)`)
    const model = {
      blackCat:
        'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-hijiki/assets/hijiki.model.json',
      whiteCat:
        'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-tororo/assets/tororo.model.json'
    }

    onMounted(async () => {
      await nextTick()
      window.loadlive2d('cat', Math.random() > 0.5 ? model.blackCat : model.whiteCat)
    })

    const get = async () => {
      if (!getMark.value) {
        getMark.value = true
        const res: any = await store.dispatch('getIndex', id.value)
        color.value = `rgba(${random()},${random()},${random()}, .1)`
        text.value = res.data.text
        id.value = Number(res.data.id)
        setTimeout(() => {
          getMark.value = false
        }, 10)
      }
    }
    get()
    return {
      text,
      color,

      get
    }
  }
}
function random() {
  const randomNumber: number = Math.floor(Math.random() * 256)
  return randomNumber
}
</script>
<style lang="stylus" scoped>
.content
  width 100%
  height 100%
  transition background 0.3s linear
  .live2d
    position fixed
    right 0
    bottom 0
    z-index 0
  .header
    background url('~assets/images/texture.png')
    width 100%
    height 100vh
    position relative
    z-index 10
    overflow hidden
    user-select none
    cursor pointer
    .intro
      max-width 100vw
      white-space nowrap
      position absolute
      top 45%
      left 50%
      transform translate(-50%, -50%)
      color #333
      font-size 10px
      line-height 20px
      text-align center
@media only screen and (max-width: 900px)
  .content
    .header
      .intro
        font-size 16px
        line-height 20px
</style>
