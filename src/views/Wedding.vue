<template lang="pug">
.page
  .lets
  .meeting
  .address
  .wu
  .liu
  .intro
  .time
</template>
<script lang="ts">
export default {
  setup() {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
.page
  width 100%
  height 150vw
  background: url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/d6df91c61a0a0d5d1a4fd2cd83e4d7a0.jpg') no-repeat center center/cover;
  position relative
  overflow hidden
  .lets
    position absolute
    width 240px
    height 80px
    top: 30px
    left: 10px
    background url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/60d07ff1e8fd8d67f04b656bec063b34.png') no-repeat center center/cover
  .meeting
    position absolute
    width 300px
    height 80px
    top 110px
    left 110px
    background url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/45880267a3a27b8b304280cbc616d828.png') no-repeat center center/cover
  .address
    position absolute
    width 120px
    height 25px
    top 480px
    left 235px
    background url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/618a8d036ab103a4f96d4c214b082958.png') no-repeat left center/contain
  .time
    position absolute
    width 200px
    height 25px
    top 500px
    left 225px
    background url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/8dd22d6d396987d083d20783c8bf2e90.png') no-repeat left center/contain
  .wu
    position absolute
    width 150px
    height 25px
    top 420px
    left 230px
    background url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/0213e2af6bbd3e4433e415beee90801d.png') no-repeat left center/contain
  .liu
    position absolute
    width 150px
    height 25px
    top 440px
    left 230px
    background url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/b8bb0ce1152ca39faa9576146c7c37c9.png') no-repeat left center/contain
</style>
