/**
 * @description 函数节流
 * 使得一定时间内只触发一次函数(多次点击触发一次)。
 * 原理是通过判断是否到达一定时间来触发函数。
 */
// 时间戳方式
var throttle = function (func, delay) {
  var prev = Date.now()
  return function () {
    var context = this
    var args = arguments
    var now = Date.now()
    if (now - prev >= delay) {
      func.apply(context, args)
      prev = Date.now()
    }
  }
}

// 定时器方式
var throttle2 = function (func, delay) {
  var timer = null
  return function () {
    var context = this
    var args = arguments
    if (!timer) {
      timer = setTimeout(function () {
        func.apply(context, args)
        timer = null
      }, delay)
    }
  }
}

// 时间错 + 定时器方式
var throttle3 = function (func, delay) {
  var timer = null
  var startTime = Date.now()
  return function () {
    var curTime = Date.now()
    var remaining = delay - (curTime - startTime)
    var context = this
    var args = arguments
    clearTimeout(timer)
    if (remaining <= 0) {
      func.apply(context, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(func, remaining)
    }
  }
}

function handle() {
  console.log(Math.random())
}
window.addEventListener('scroll', throttle(handle, 1000))
