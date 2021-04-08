<template lang="pug">
  .content
    .header(@click="getIndex")
      .intro {{ text || '今日份的想你正在赶来的路上...' }}
      .addBtn(v-if="!isMobile" @click.stop="addShow") 我也要添加一条
        ripple
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation, Action, namespace } from 'vuex-class'
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

  private isMobile: Boolean = false
  private getMark: Boolean = true
  private id: Number = 0
  private text: String = ''
  private addMark: Boolean = false
  private addText: String = ''

  async mounted() {
    this.isMobile = (this as any).$TOOL.isMobile()
    // welcome
    let res = await (this as any).Login()
    // 获取首页数据
    this.getIndex()
  }

  // 获取text
  private async getIndex() {
    if (this.getMark) {
      this.getMark = false
      let { id } = this
      let res: any = await getIndex({ id })
      this.text = res.data.text
      this.id = Number(res.data.id)
      setTimeout(() => {
        this.getMark = true
      }, 1000)
    }
  }

  // 打开添加窗口
  addShow() {
    ;(this as any)
      .$prompt('请输入内容，以 。结束', '添加一条', {
        inputValidator: (value: String) => {
          if (!value) return false
        }
      })
      .then(({ value }: any) => {
        if (value) {
          this.addIndex(value)
        }
      })
      .catch(() => {})
  }

  // 添加text
  private async addIndex(value: String) {
    let text = value
    let res: any = await addIndex({ text })
    if (res.status === 0) {
      ;(this as any).$message({
        message: '感谢您添加的一条语录，经管理员审核后展示。😉',
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
    background url('../../assets/images/texture.png') #f3f3f3
    user-select none
    cursor pointer
    .intro
      max-width 100vw
      white-space nowrap
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      font-size 32px
      line-height 30px
      text-align center
    .addBtn
      position absolute
      right 20px
      bottom 20px
      overflow hidden
      padding 12px
      color $color-B
      font-size 15px
      border 1px solid $color-B
      border-radius 5px
      cursor pointer
      &:hover
        color $color-C
        border 1px solid $color-C
        background rgba(105, 42, 27, 0.1)
@media only screen and (max-width: 700px)
  .content
    .header
      .intro
        font-size 15px
        line-height 20px
      .addBtn
        font-size 12px
        padding 8px
</style>
