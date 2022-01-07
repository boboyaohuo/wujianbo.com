<template lang="pug">
.page
  label(for="input" v-if='!loading') 点击上传图片
    input(id="input" ref="fileRef" type='file' placeholder='请输入' style='display: none;' @change="fileChange")
  label(v-else) 正在压缩，请稍等...
</template>
<script lang="ts">
import { ref } from 'vue'
import { postTinify } from '@/api/index'
export default {
  setup() {
    const fileRef = ref()
    const loading = ref(false)
    const fileChange = async () => {
      if (fileRef.value.files?.length === 0) return
      loading.value = true
      const file = fileRef.value.files[0]
      const formData = new FormData()
      formData.append('files', file)
      const res = await postTinify(formData)
      loading.value = false
      fileRef.value = null
      if (res.status === 0) {
        window.open(res.data.output.url)
      } else {
        alert(res.data.message)
      }
    }

    return { fileChange, fileRef, loading }
  }
}
</script>
<style lang="stylus" scoped>
.page
  width 100vw
  height 100vh
  display flex
  justify-content center
  align-items center
  label
    font-size 14px
    cursor pointer
</style>
