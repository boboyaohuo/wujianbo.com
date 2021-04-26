/**
 * @description mitt eventbus的替代方案  on off emit (off 方法此处不作处理)
 * @warning 引用已建方法需特殊注意
 */
import mitt from 'mitt'

const emitter = mitt()

// 滚动判断（导航条和视频交互）
const navScrollEmitter = {
  emit: (data: boolean): void => {
    emitter.emit('navScroll', data)
  },

  on: (callBack: any): void => {
    emitter.on('navScroll', data => {
      if (typeof callBack === 'function') {
        callBack(data)
      }
    })
  }
}

export { navScrollEmitter }
