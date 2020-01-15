<template lang="pug">
  #not-found
    .not-found
      .not-found-404
        h3 THE PAGE NOT FOUND 🙃
        h1
          span 4
          span 0
          span 4
        h2 你似乎来到了没有知识存在的荒原
        router-link.a(:to="{name: 'Index'}" tag="a" replace) 去往首页
        span or
        a.a(@click="$router.go(-1)") 返回上一页
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'NotFound'
})
export default class NotFound extends Vue {}
</script>
<style lang="stylus" scoped>
#not-found
  position: relative
  height: 100vh
  .not-found
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    max-width: 520px
    width: 100%
    text-align: center
    .not-found-404
      position: relative
      h1
        font-family: 'Montserrat', sans-serif
        height: 300px
        line-height: 300px
        font-size: 300px
        font-weight: 900
        margin: 0px
        color: #262626
        text-transform: uppercase
        letter-spacing: -40px
        margin-left: -20px
        span
          text-shadow: -8px 0px 0px #fff
      h3
        font-family: 'Cabin', sans-serif
        position: relative
        font-size: 16px
        font-weight: 700
        text-transform: uppercase
        color: #262626
        margin: 0px
        padding-left: 6px
      h2
        font-family: 'Cabin', sans-serif
        font-size: 24px
        text-transform: uppercase
        font-weight: 500
        color: #000
        margin-top: 0px
        margin-bottom: 25px
        letter-spacing: 3px
      .a
        font-size: 16px
        margin: 10px
        color: #ffffff
        padding: 10px
        background: #0084ff
        border-radius: 5px
        cursor: pointer
        &:hover
          background: #0066ff
@media only screen and (max-width: 700px)
  #not-found
    .not-found
      .not-found-404
        h1
          height: 162px
          line-height: 162px
          font-size: 162px
        h2
          font-size: 16px
        h3
          font-size: 12px
        .a
          font-size: 12px
</style>
