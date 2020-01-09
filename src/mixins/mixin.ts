import { Component, Vue } from 'vue-property-decorator'

declare module 'vue/types/vue' {
  interface Vue {
    dispatch(componentName: String, eventName: string, params: any): void
    broadcast(componentName: String, eventName: string, params: any): void
  }
}

@Component({})
export default class Mixin extends Vue {
  // 仿elementUi
  // 向上逐级查询，执行目标组件挂载方法
  public dispatch(componentName: String, eventName: string, params: any): void {
    let parent = this.$parent || this.$root
    let name = parent.$options.name
    // 父组件不是指定的组件，进行向上级查询
    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent
      if (parent) name = parent.$options.name
    }
    if (parent) parent.$emit.apply(parent, [eventName, params])
  }
  // 向下逐级查询，执行目标组件挂载方法
  public broadcast(componentName: String, eventName: string, params: any): void {
    this.$children.forEach(child => {
      const name = child.$options.name
      if (name === componentName) child.$emit.apply(child, [eventName, params])
      else this.broadcast.apply(child, [componentName, eventName, params])
    })
  }
}
