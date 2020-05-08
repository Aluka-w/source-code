/**
 * @description 发布订阅 模式
 */
class Event {
  constructor() {
    // 缓存的事件列表
    this.callback = {}
  }
  // 订阅事件
  $on(name, fn) {
    ;(this.callback[name] || (this.callback[name] = [])).push(fn)
  }
  // 发布事件
  $emit(name, arg) {
    const cbs = this.callback[name]
    if (cbs) {
      cbs.forEach((c) => {
        c.call(this, arg)
      })
    }
  }
  // 取消订阅
  $off(name) {
    this.callback[name] = null
  }
}

const event = new Event()
// 订阅
event.$on('event1', function (arg) {
  console.log('1', arg)
})
// event.$on('event1', function(arg) {
//   console.log('2', arg)
// })
// 发布
// event.$emit('event1', {name: 'text'})

// 取消订阅
event.$off('event1')
event.$emit('event1', { name: 'text' })
