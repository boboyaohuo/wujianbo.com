<template lang="pug">
.page
  .form
    .cookie td_cookie:
      input(placeholder='请输入' v-model='tdCookie')
    .sessionId sessionId:
      input(placeholder='请输入' v-model='sessionId')
    .btn(@click="reset") 提交
  .list(v-for='(item, index) in data' :key="index" v-if='data.length > 0')
    .item 仓{{ index + 1 }}
    .item
      .title 币种
      .text {{ item.symbol }}
    .item
      .title 杠杆倍数
      .text {{ item.leverage }}
    .item
      .title 保证金百分比
      .text {{ item.marginPercent }}
    .item
      .title 初始保证金
      .text {{ item.initialMargin }}
    .item
      .title 开仓价
      .text {{ item.entryPrice }}
    .item
      .title 利润百分比
      .text {{ item.profitPercent }}
    .item
      .title 未实现利润
      .text {{ item.unrealizedProfit }}
</template>
<script lang="ts">
import { ref } from 'vue'
import { getLatestOrder } from '@/api/index'

export default {
  setup() {
    const data = ref({})
    const tdCookie = ref('3286474926')
    const sessionId = ref('819e370ee9444ea4aa5746d7c1142f96')

    const get = async () => {
      const res = await getLatestOrder({
        id: 24,
        tradeTime: 12938129
      })
      data.value = res.data.positions
    }

    const reset = () => {
      document.cookie = `td_cookie=${tdCookie.value}`
      document.cookie = `sessionId=${sessionId.value}`
      get()
    }

    setInterval(() => {
      get()
    }, 2000)

    return {
      tdCookie,
      sessionId,
      data,
      reset
    }
  }
}
</script>
<style lang="stylus" scoped>
.page
  padding 10px
  .form
    display flex
    flex-direction column
    .cookie, .sessionId
      display flex
      font-size 14px
      input
        flex 1
        height 20px
        padding-left 10px
        line-height 20px
        font-size 14px
        &::-webkit-input-placeholder
          font-size 14px
    .btn
      width 40px
      height 20px
      border 1px solid #d5d5d5
      text-align center
      line-height 20px
      font-size 10px
      border-radius 5px
      transition all 0.3s
      user-select none
      cursor pointer
      &:active
        transform scale(0.9)
  .list
    .item
      padding 5px 0
      width 200px
      display flex
      justify-content space-between
      font-size 20px
      color red
      .title
        font-size 16px
        color blue
      .text
        font-size 18px
        color green
</style>
