<template>
  <div>
    <input style="border: 1px solid #000000;" ref="input" :type="type" :value="currentValue" @input="handleInput" @blur="handleBlur" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Inject, Watch, Emit, Vue } from 'vue-property-decorator'
import Mixin from '@/mixin/mixin'

@Component({
  mixins: [Mixin]
})
export default class BInput extends Vue {
  @Prop() private type?: string
  @Prop() private value?: string

  currentValue: string = this.value
  id: string = ''

  @Watch('value')
  onChangeValue(value: string): void {
    this.currentValue = value
  }

  mounted() {
    if (this.$parent.labelFor) this.$refs.input.id = this.$parent.labelFor
  }

  @Emit('input')
  hanler(value: any) {
    return value
  }

  handleInput(e: Object) {
    const value = e.target.value
    this.currentValue = value
    this.hanler(value)
    this.dispatch('BFormItem', 'form-change', value)
  }
  handleBlur() {
    this.dispatch('BFormItem', 'form-blur', this.currentValue)
  }
}
</script>
<style lang="stylus" scoped></style>
