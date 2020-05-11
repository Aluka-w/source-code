/**
 * @description 发布订阅 模式
 */
class Pubsub {
  constructor() {
    // 缓存的事件列表
    this.callback = {}
  }
  // 订阅事件
  $on(name, fn) {
    (this.callback[name] || (this.callback[name] = [])).push(fn)
  }
  // 发布事件
  $emit(name, arg) {
    const cbs = this.callback[name]
    if (cbs) {
      cbs.forEach(c => {
        c.call(this, arg)
      })
    }
  }
  // 取消订阅
  $off(name) {
    this.callback[name] = null
  }
}

const event = new Pubsub()
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

/**
 * @description 观察者模式
 */

// 观察者
class Observer {
  constructor(fn) {
    this.update = fn
  }
}
// 被观察者
class Subject {
  constructor() {
    this.observer = [] // 观察者队列
  }
  addObserver(observer) { // 往观察者队列中添加观察者
    this.observer.push(observer)
  }
  notify() { // 通知所有的观察者
    this.observer.forEach(ob => {
      ob.update()
    })
  }
}
// 测试
let subject = new Subject()
const opdata = () => {console.log('被观察者发出通知')}
let ob1 = new Observer(update)
let ob2 = new Observer(update)
subject.addObserver(ob1)
subject.addObserver(ob2)
subject.notify()

