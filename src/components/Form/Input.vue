<template lang="pug">
  div
    input(style="border: 1px solid #000000;" ref="input" :type="type" v-model="currentValue" @blur="handleBlur")
</template>
<script lang="ts">
import { Component, Prop, Inject, Watch, Emit, Vue } from 'vue-property-decorator'
import Mixin from '@/mixins/mixin'

@Component({
  name: 'BInput',
  mixins: [Mixin]
})
export default class BInput extends Vue {
  $refs!: {
    input: any
  }

  @Prop() private type?: string
  @Prop() private value?: string

  currentValue: string | undefined = this.value
  id: string = ''

  @Watch('value')
  onChangeValue(value: string): void {
    if (value) this.currentValue = value
  }

  @Watch('currentValue')
  onChangeCurrentValue(value: string): void {
    this.hanler(value)
    this.dispatch('BFormItem', 'form-change', value)
  }

  mounted() {
    const parent: any = this.$parent
    if (parent.labelFor) this.$refs.input.id = parent.labelFor
  }

  @Emit('input')
  hanler(value: any) {
    return value
  }

  handleBlur() {
    this.dispatch('BFormItem', 'form-blur', this.currentValue)
  }
}
</script>
<style lang="stylus" scoped></style>
