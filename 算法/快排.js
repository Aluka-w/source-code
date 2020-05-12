/**
 * @description 手写快排序
 * 选取基准元素
 * 比基准元素小的元素放到左边，大的放右边
 * 在左右子数组中重复步骤一二，直到数组只剩下一个元素
 * 向上逐级合并数组
 */

function quickSort(arr, left, right) {
  //这个left和right代表分区后“新数组”的区间下标，因为这里没有新开数组，所以需要left/right来确认新数组的位置
  if (left < right) {
    let pos = left - 1 //pos即“被置换的位置”，第一趟为-1
    for (let i = left; i <= right; i++) {
      //循环遍历数组，置换元素
      let pivot = arr[right] //选取数组最后一位作为基准数，
      if (arr[i] <= pivot) {
        //若小于等于基准数，pos++，并置换元素, 这里使用小于等于而不是小于, 其实是为了避免因为重复数据而进入死循环
        pos++
        let temp = arr[pos]
        arr[pos] = arr[i]
        arr[i] = temp
      }
    }
    //一趟排序完成后，pos位置即基准数的位置，以pos的位置分割数组
    quickSort(arr, left, pos - 1)
    quickSort(arr, pos + 1, right)
  }
  return arr //数组只包含1或0个元素时(即left>=right)，递归终止
}

//使用
var arr = [5, 1, 4, 2, 3]
var start = 0
var end = arr.length - 1
quickSort(arr, start, end)
