/**
 * @description 数组扁平化
 */
let ary = [1, [2, [3, [4, 5]]], 6] // -> [1, 2, 3, 4, 5, 6]
let str = JSON.stringify(ary)

// 1. ES6的flat方法
arr.flat(Infinity)

// 2. 普通递归
let result = []
let fn = function (ary) {
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i]
    if (Array.isArray(ary[i])) {
      fn(item)
    } else {
      result.push(item)
    }
  }
}

// 3. reduce函数迭代
function flatten(ary) {
  return ary.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}

// 4. 拓展运算符
//只要有一个元素有数组，那么循环继续
while (ary.some(Array.isArray())) {
  ary = [].concat(...ary);
}

// 5. replace + split
str.replace(/(\[|\])/g, '').split(',')