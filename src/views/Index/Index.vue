<template lang="pug">
  .content
    .header
      .title(class="animated") wujianbo
      .intro(class="animated fadeIn") 一位有理想、有道德、有文化、有纪律的前端开发工程师😁
      ripple
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation, Action, namespace } from 'vuex-class'
import { timeFix } from '@/utils/util'
import Ripple from '@/components/Ripple/Ripple.vue'

// vuex module 命名空间
const app = namespace('app')
const user = namespace('user')

@Component({
  name: 'Index',
  components: {
    Ripple
  }
})
export default class Index extends Vue {
  @user.State token?: string | number
  @Getter tokenB?: string | number
  @user.Action Login?: () => any

  async mounted() {
    // welcome
    ;(this as any)
      .Login()
      .then((res: any) => {
        this.$notify({
          title: `${timeFix()}`,
          dangerouslyUseHTMLString: true,
          message: `欢迎光临<b style="color: red;">红浪漫</b>🛀,拿好手牌儿楼上请！<b><p>贵宾一位!</p></b>`
        })
      })
      .catch((res: any) => {})
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/style/variable.styl'
.content
  width 100%
  height 100%
  .header
    width 100%
    height 100vh
    position relative
    overflow hidden
    display flex
    flex-direction column
    justify-content center
    color #33333f
    user-select none
    .title
      font-size 80px
      line-height 120px
      text-align center
      -webkit-text-fill-color transparent
      background-image linear-gradient(150deg, #000000 0%,#9999cf 100%)
      background-clip text
      animation hue 30s infinite linear
    .intro
      font-size 24px
      line-height 50px
      text-align center
@media only screen and (max-width: 700px)
  .content
    .header
      .title
        font-size 60px
        line-height 90px
      .intro
        font-size 14px
        line-height 40px
@keyframes hue
  0% { filter: hue-rotate(0deg) }
  100% { filter: hue-rotate(360deg) }
</style>
