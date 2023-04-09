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
  background: url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/9ae3f0e7c276b8f0d4c531a8ef4fc474.JPG') no-repeat 60% center/cover;
  position relative
  overflow hidden
  .lets
    position absolute
    width 240px
    height 80px
    top: 0px
    left: 10px
    background url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/db24c069710f8b9fab63293e21373818.png') no-repeat center center/cover
  .meeting
    position absolute
    width 300px
    height 80px
    top 70px
    left 110px
    background url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/ddf618a806e6f516d87b98d974f51bad.png') no-repeat center center/cover
  .address
    position absolute
    width 120px
    height 25px
    top 515px
    left 50%
    transform translateX(-50%)
    background url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/618a8d036ab103a4f96d4c214b082958.png') no-repeat center center/contain
  .time
    position absolute
    width 200px
    height 25px
    top 535px
    left 115px
    background url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/8dd22d6d396987d083d20783c8bf2e90.png') no-repeat center center/contain
  .wu
    position absolute
    width 150px
    height 30px
    top 330px
    right 0px
    background url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/c12de72bd247071dda1f4b8213717a8e.png') no-repeat right center/contain
  .liu
    position absolute
    width 150px
    height 30px
    top 210px
    left -5px
    background url('https://tutor-test1.fbcontent.cn/growth/eagle-resource/b689af0769868acb8839b5c472977b05.png') no-repeat left center/contain
</style>
