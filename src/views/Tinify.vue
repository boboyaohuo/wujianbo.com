<template lang="pug">
.page
  label(for="input" v-if='!loading') 点击上传图片
    input(id="input" ref="fileRef" type='file' accept="image/*" placeholder='请输入' style='display: none;' @change="fileChange")
  label(v-else) 正在压缩，请稍等...
</template>
<script lang="ts">
import { ref } from 'vue'
import { postTinify } from '@/api/index'
import { v4 as uuidv4 } from 'uuid'
export default {
  setup() {
    const fileRef = ref()
    const loading = ref(false)
    const fileChange = async () => {
      if (fileRef.value.files?.length === 0) return
      const file = fileRef.value.files[0]

      // 小于5mb 请前往tinify
      const fileSize = file.size
      if (fileSize < 5 * 1024 * 1024) {
        const confirmResult = confirm('图片小于5MB,去 https://tinify.cn/ 压缩？')
        if (confirmResult) {
          window.location.href = 'https://tinify.cn/'
        }
        return
      }

      // 大于50mb 不允许上传
      if (fileSize > 50 * 1024 * 1025) {
        alert('图片不能大于50MB')
        return
      }

      // 更名
      const fileName = localStorage.getItem('uuid') || uuidv4()
      localStorage.setItem('uuid', fileName)
      const newFile = new File([file], `${fileName}.${file.name.split('.')[1]}`, { type: file.type })
      loading.value = true

      // 拼入formData 请求
      const formData = new FormData()
      formData.append('files', newFile)
      const res = await postTinify(formData)

      // 重置loading
      loading.value = false
      fileRef.value = null

      // 压缩后图片弹窗
      if (res.status === 0) {
        const link = document.createElement('a')
        link.style.display = 'none'
        link.target = '_blank'
        link.href = res.data.output.url
        link.click()
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
