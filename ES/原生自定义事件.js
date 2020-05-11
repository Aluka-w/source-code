/**
 * @description 原生自定义事件
 */
// let myEvent = document.createEvent('CustomEvent');// 注意这里是为'CustomEvent'
// myEvent.initEvent(
// 	// 1. event_name: 事件名称
// 	// 2. canBubble: 是否冒泡
// 	// 3. cancelable: 是否可以取消默认行为
// )

// 定义自定义事件
let myEvent = document.createEvent('CustomEvent');
myEvent.initEvent('myEvent', true, true)

let btn = document.getElementsByTagName('button')[0]
// 监听自定义事件
btn.addEventListener('myEvent', function (e) {
  console.log(e)
  console.log(e.detail)
})
// 触发自定义事件
setTimeout(() => {
  btn.dispatchEvent(myEvent)
}, 2000)

