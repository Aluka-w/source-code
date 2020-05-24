// 简单版本
// var newObj = JSON.parse( JSON.stringify( someObj ) );

// 复杂版本
function deepCopy(obj) {
  let result
  if (typeof obj === 'object') {
    result = Array.isArray(obj) ? [] : {}
    for (let i in obj) {
      result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i]
    }
  } else {
    result = obj
  }
  return result
}

// 测试
let ary = [1, [{a: 1}, 3, {b: 4, c: { d: 5, f: [1, 2] } } ] ]

let ary2 = deepCopy(ary)
// JSON.stringify为了完整显示
console.log(ary === ary2, JSON.stringify(ary2))