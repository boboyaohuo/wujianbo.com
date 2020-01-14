<template lang="pug">
  .content
    .header(@click="headerClick($event)") wujianbo
      ripple(ref="ripple")
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
  $refs!: {
    ripple: Ripple
  }
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
          message: `欢迎光临<b style="color: red;">红浪漫</b>🛀,拿好手盘楼上请！<b><p>贵宾一位!</p></b>`
        })
      })
      .catch((res: any) => {})
  }

  headerClick(event:any) {
    this.$refs.ripple.reppleClick(event)
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
    user-select none
    font-size 56px
    text-align center
    width 100%
    line-height 100vh
</style>
