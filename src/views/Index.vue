<template lang="pug">
.content
  .header(@click="get")
    .intro {{ text }}
  canvas.live2d#cat(:width="280" :height="250")
</template>
<script lang="ts">
declare const window: Window & { loadlive2d: any }
import { getIndex } from '@/api/index'
import { onMounted, ref } from 'vue'
export default {
  setup() {
    const text = ref('今日份的想你正在赶来的路上...')
    const id = ref(0)
    const getMark = ref(false)
    const model = {
      blackCat:
        'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-hijiki/assets/hijiki.model.json',
      whiteCat:
        'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-tororo/assets/tororo.model.json'
    }

    onMounted(() => {
      window.loadlive2d('cat', Math.random() > 0.5 ? model.blackCat : model.whiteCat)
    })

    const get = async () => {
      if (!getMark.value) {
        getMark.value = true
        const res: any = await getIndex({ id: id.value })
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

      get
    }
  }
}
</script>
<style lang="stylus" scoped>
.content
  width 100%
  height 100%
  background url('~assets/images/texture.png') #f3f3f3
  .live2d
    position fixed
    right 0
    bottom 0
    z-index 0
  .header
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
