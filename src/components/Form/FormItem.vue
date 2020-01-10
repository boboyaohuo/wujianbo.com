<template lang="pug">
  div
    label(:for="labelFor" v-if="label" :class="{ 'label-required': isRequired }") {{ label }}
    slot
    .message(v-if="isShowMes") {{ message }}
</template>
<script lang="ts">
import { Component, Prop, Inject, Vue } from 'vue-property-decorator'
import Mixin from '../../mixins/mixin'
import AsyncValidator from 'async-validator'

@Component({
  name: 'BFormItem',
  mixins: [Mixin]
})
export default class BFormItem extends Vue {
  @Inject() readonly form!: any

  @Prop() private label!: string
  @Prop() private prop!: string

  private isRequired: Boolean = false
  private isShowMes: Boolean = false
  private initialValue: any = ''
  private message: string = ''
  private labelFor: string = 'input' + new Date().valueOf()

  mounted() {
    if (this.prop) {
      this.dispatch('BForm', 'form-add', this)
      // 设置初始值
      this.initialValue = this.fieldValue
      this.setRules()
    }
  }

  // 组件销毁前，将实例从 Form 的缓存中移除
  private beforeDestroy(): void {
    this.dispatch('BForm', 'form-remove', this)
  }

  get fieldValue() {
    return this.form.model[this.prop]
  }

  private setRules(): void {
    let rules = this.getRules()
    if (rules.length) {
      rules.forEach((rule: any) => {
        if (rule.required !== undefined) this.isRequired = rule.required
      })
    }
    this.$on('form-blur', this.onFieldBlur)
    this.$on('form-change', this.onFieldChange)
  }
  getRules() {
    let formRules = this.form.rules
    formRules = formRules ? formRules[this.prop] : []
    return formRules
  }
  // 过滤出符合要求的 rule 规则
  getFilteredRule(trigger: any) {
    const rules = this.getRules()
    return rules.filter((rule: any) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
  }
  /**
   * 校验表单数据
   * @param trigger 触发校验类型
   * @param callback 回调函数
   */
  validate(trigger: any, cb?: Function) {
    let rules = this.getFilteredRule(trigger)
    if (!rules || rules.length === 0) return true
    // 使用 async-validator
    const validator = new AsyncValidator({ [this.prop]: rules })
    let model = { [this.prop]: this.fieldValue }
    validator.validate(model, { firstFields: true }, errors => {
      this.isShowMes = errors ? true : false
      this.message = errors ? errors[0].message : ''
      if (cb) cb(this.message)
    })
  }
  resetField() {
    this.message = ''
    this.form.model[this.prop] = this.initialValue
  }
  onFieldBlur() {
    this.validate('blur')
  }
  onFieldChange() {
    this.validate('change')
  }
}
</script>
<style lang="stylus" scoped>
.label-required:before {
  content: '*';
  color: red;
}
.message {
  font-size: 12px;
  color: red;
}
</style>
