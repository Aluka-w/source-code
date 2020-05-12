function mergeSort(arr) {
  if (arr.length <= 1) return arr //数组元素被划分到剩1个时，递归终止
  const midIndex = (arr.length / 2) | 0
  const leftArr = arr.slice(0, midIndex)
  const rightArr = arr.slice(midIndex, arr.length)
  return merge(mergeSort(leftArr), mergeSort(rightArr)) //先划分，后合并
}

//合并
function merge(leftArr, rightArr) {
  const result = []
  while (leftArr.length && rightArr.length) {
    leftArr[0] <= rightArr[0]
      ? result.push(leftArr.shift())
      : result.push(rightArr.shift())
  }
  while (leftArr.length) result.push(leftArr.shift())
  while (rightArr.length) result.push(rightArr.shift())
  return result
}
