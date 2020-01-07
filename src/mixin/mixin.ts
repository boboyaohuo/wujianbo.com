import { Component, Emit, Vue } from 'vue-property-decorator'

@Component
export default class Mixin extends Vue {
  // 仿elementUi
  dispatch(componentName: String, eventName: string, params: any) {
    let parent = this.$parent || this.$root
    let name = parent.$options.name
    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent
      if (parent) name = parent.$options.name
    }
    if (parent) parent.$emit.apply(parent, [eventName, params])
  }
  broadcast(componentName: String, eventName: string, params: any) {
    this.$children.forEach(child => {
      const name = child.$options.name
      if (name === componentName) child.$emit.apply(child, [eventName, params])
      else this.broadcast.apply(child, [componentName, eventName, params])
    })
  }
}
