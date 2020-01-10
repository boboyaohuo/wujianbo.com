<template lang="pug">
  .content
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
    let that: any = this
    that
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
.content
  width: 100vw
  height: 100vh
  background: url('http://uploads.5068.com/allimg/151105/48-1511051J947-51.jpg') no-repeat center center/cover
</style>
