// 简单版本
// var newObj = JSON.parse( JSON.stringify( someObj ) );

// 复杂版本
function deepCopy(obj) {
  //判断是否是简单数据类型，
  if (typeof obj == 'object') {
    //复杂数据类型
    var result = obj.constructor == Array ? [] : {}
    for (let i in obj) {
      result[i] = typeof obj[i] == 'object' ? deepCopy(obj[i]) : obj[i]
    }
  } else {
    //简单数据类型 直接 == 赋值
    var result = obj
  }
  return result
}

// 测试
let ary = [1, [{a: 1}, 3, {b: 4, c: { d: 5, f: [1, 2] } } ] ]

let ary2 = deepCopy(ary)
// JSON.stringify为了完整显示
console.log(ary === ary2, JSON.stringify(ary2))