<template lang="pug">
.content(:style="{backgroundColor: color}")
  .header(@click="get")
    .intro {{ text }}
  canvas.live2d#cat(:width="280" :height="250")
</template>
<script lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { getIndexList } from '@/api/index'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const text = ref(route.query.text ? '' : '今日份的想你正在赶来的路上...')
    const id = ref<number>(-1)
    const idArray = ref<Array<string | number>>([])
    const textArray = ref([])
    const getMark = ref(false)
    const color = ref(`rgba(${random()},${random()},${random()}, .1)`)
    const model = {
      blackCat:
        'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-hijiki/assets/hijiki.model.json',
      whiteCat:
        'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-tororo/assets/tororo.model.json'
    }

    onMounted(async () => {
      const res: any = await getIndexList()
      textArray.value = res.data.map((item: any) => item.text)
      await nextTick()
      if (typeof route.query.text === 'string') {
        text.value = route.query.text
      } else {
        get()
      }
      try {
        window.loadlive2d('cat', Math.random() > 0.5 ? model.whiteCat : model.blackCat)
      } catch (error) {
        console.log(error)
      }
    })

    const get = async () => {
      if (!getMark.value) {
        getMark.value = true
        randomNumber()
        color.value = `rgba(${random()},${random()},${random()}, .1)`
        text.value = textArray.value[id.value]
        router.replace({ name: 'Index', query: { text: text.value } })
        setTimeout(() => {
          getMark.value = false
        }, 10)
      }
    }

    const randomNumber = () => {
      if (idArray.value.length === textArray.value.length) {
        idArray.value = []
      }
      id.value = Math.floor(Math.random() * textArray.value.length)
      if (idArray.value.includes(id.value)) {
        randomNumber()
      } else {
        idArray.value.push(id.value)
      }
    }

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
      width 100vw
      position absolute
      top 45%
      left 50%
      transform translate(-50%, -50%)
      color #333
      font-size 10px
      line-height 22px
      text-align center
@media only screen and (max-width: 900px)
  .content
    .header
      .intro
        font-size 16px
        line-height 20px
</style>
