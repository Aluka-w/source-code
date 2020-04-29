/**
 * @description 防抖函数
 * 将几次操作合并为一此操作进行。
 * 原理是维护一个计时器，规定在delay时间后触发函数，
 * 但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置
 */

function debounce(fn, wait) {
  var timeout = null
  return function () {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(fn, wait)
  }
}

// 处理函数
function handle() {
  console.log(Math.random())
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000))
