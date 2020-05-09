let ary = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
// 扁平化
ary = ary.flat(Infinity)
// 去重
ary = Array.from(new Set(ary))
// 排序
ary = ary.sort((a, b) => {
  return a - b
})

console.log(ary)
