<template lang="pug">
.page
  label(for="input" v-if='!loading') 点击上传图片
    input(id="input" ref="fileRef" type='file' accept="image/*" placeholder='请输入' style='display: none;' @change="fileChange")
  label(v-else) 正在压缩，请稍等...
  a(:href="href" v-if="href" target="_blank") 压缩后图片地址(点击打开)：{{href}}
</template>
<script lang="ts">
import { ref } from 'vue'
import { postTinify } from '@/api/index'
import { v4 as uuidv4 } from 'uuid'
import upload from '@/utils/upload'
export default {
  setup() {
    const fileRef = ref()
    const href = ref('')
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
      const newFile = new File([file], `${fileName}.${file.type.split('/')[1]}`, { type: file.type })
      loading.value = true

      try {
        // 上传文件
        const url = await upload(newFile)
        // 请求nodejs tinify代理
        const res = await postTinify({ url })
        // 压缩后图片弹窗
        if (res.status === 0) {
          href.value = res.data.output.url
        } else {
          alert(res.data.message)
        }
      } catch {
        alert('上传错误，请刷新页面重试！')
      }

      // 重置loading
      loading.value = false
      fileRef.value = null
    }

    return { fileChange, fileRef, loading, href }
  }
}
</script>
<style lang="stylus" scoped>
.page
  width 100vw
  padding 0 20px
  height 100vh
  display flex
  flex-direction: column
  justify-content center
  align-items center
  label
    font-size 14px
    cursor pointer
  a
    font-size 12px
    margin-top 10px
    color #2440b3
    text-decoration underline
    word-break break-all
    line-height 14px
</style>
