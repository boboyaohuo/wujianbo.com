<template lang="pug">
  .content
    .header wujianbo
    .ha fdf
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation, Action, namespace } from 'vuex-class'
import { timeFix } from '@/utils/util'

// vuex module 命名空间
const app = namespace('app')
const user = namespace('user')

@Component({
  name: 'Index'
})
export default class Index extends Vue {
  @user.State token?: string | number
  @Getter tokenB?: string | number
  @user.Action Login?: () => any
  async mounted() {
    // welcome
    (this as any)
      .Login()
      .then((res: any) => {
        this.$notify({
          title: `${timeFix()}`,
          dangerouslyUseHTMLString: true,
          message: `欢迎光临<b style="color: red;">红浪漫</b>🛀,拿好手盘楼上请！<b><p>贵宾一位!</p></b>`
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
    height 100%
    line-height 100vh
    text-align center
    color $color-A
    font-size 32px
</style>
