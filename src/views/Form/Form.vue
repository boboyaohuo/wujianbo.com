<template lang="pug">
  .home
    h3 Form (校验表单)
    b-form(ref="form" :model="formData" :rules="rules")
      b-form-item(label="名称：" prop="name")
        b-input(v-model="formData.name")
      b-form-item(label="邮箱：" prop="mail")
        b-input(v-model="formData.mail")
      button(@click="handleSubmit") 提交
      button(@click="handleReset") 重置
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BForm from '@/components/Form/Form.vue'
import BFormItem from '@/components/Form/FormItem.vue'
import BInput from '@/components/Form/Input.vue'

@Component({
  name: 'Form',
  components: {
    BForm,
    BFormItem,
    BInput
  }
})
export default class Form extends Vue {
  $refs!: {
    form: BForm
  }

  formData: Object = { name: '', mail: '' }
  rules: Object = {
    name: [{ required: true, message: '不能为空', trigger: 'blur' }],
    mail: [
      { required: true, message: '不能为空', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
  }

  private handleSubmit(): void {
    this.$refs.form.validate((valid: any) => {
      if (valid) console.log('提交成功')
      else console.log('校验失败')
    })
  }
  private handleReset(): void {
    this.$refs.form.resetFields()
  }
}
</script>
<style lang="stylus" scoped></style>
