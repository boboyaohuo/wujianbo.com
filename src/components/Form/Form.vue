<template>
  <div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Provide, Vue } from 'vue-property-decorator'

@Component
export default class BForm extends Vue {
  @Prop() private model!: Object
  @Prop() private rules!: Object

  fields: Array<any> = []

  @Provide() form = this

  resetFields() {
    this.fields.forEach(field => field.resetField())
  }
  validate(cb: Function) {
    return new Promise(resolve => {
      let valid = true,
        count = 0
      this.fields.forEach(field => {
        field.validate('', (error: any) => {
          if (error) valid = false
          if (++count === this.fields.length) {
            resolve(valid)
            if (typeof cb === 'function') cb(valid)
          }
        })
      })
    })
  }

  created() {
    this.$on('form-add', (field: any) => {
      if (field) this.fields.push(field)
    })
    this.$on('form-remove', (field: any) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1)
    })
  }
}
</script>
<style lang="stylus" scoped></style>
