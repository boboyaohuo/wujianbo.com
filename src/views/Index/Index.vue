<template lang="pug">
  .content
    .header(@click="getIndex")
      .title wujianbo
      .intro {{ text }}
      ripple
    input.input(v-model="addText" v-if="inputMark" v-on:keydown.enter="addIndex")
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation, Action, namespace } from 'vuex-class'
import { timeFix } from '@/utils/util'
import Ripple from '@/components/Ripple/Ripple.vue'
import { getIndex, addIndex } from '@/api/index'

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

  private text: String = ''
  private id: Number = 0
  private inputMark: Boolean = false
  private addText: String = ''

  async mounted() {
    ;(this as any).inputMark = this.$route.query.inputMark
    // welcome
    let res = await (this as any).Login()
    // 获取首页数据
    this.getIndex()
  }

  // 获取text
  private async getIndex() {
    let { id } = this
    let res: any = await getIndex({ id })
    this.text = res.text
    this.id = Number(res.id)
  }

  // 添加text
  private async addIndex() {
    let text = this.addText
    let res: any = await addIndex({ text })
    if (res.status === 0) {
      ;(this as any).$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    }
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
    .intro
      font-size 24px
      line-height 50px
      text-align center
  .input
    border 1px solid #000
@media only screen and (max-width: 700px)
  .content
    .header
      .title
        font-size 60px
        line-height 90px
      .intro
        font-size 14px
        line-height 40px
</style>
