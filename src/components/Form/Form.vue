<template lang="pug">
  div
    slot
</template>
<script lang="ts">
import { Component, Prop, Provide, Vue } from 'vue-property-decorator'

@Component({
  name: 'BForm'
})
export default class BForm extends Vue {
  @Provide() form = this

  @Prop() private model!: Object
  @Prop() private rules!: Object

  public fields: Array<any> = []

  public resetFields(): void {
    this.fields.forEach(field => field.resetField())
  }
  public validate(cb: Function): any {
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

  private created(): void {
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
