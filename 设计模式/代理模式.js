/**
 * @description 代理模式：控制对象的访问
 */
class ReadImg {
  constructor(fileName) {
    this.fileName = fileName
    this.loadFormDisk() // 模拟 初始化即从硬盘加载
  }
  loadFormDisk () {
    console.log('loading', this.fileName)
  }
  display () {
    console.log('display', this.fileName)
  }
}
// 代理
class ProxyImg {
  constructor (fileName) {
    this.readImg = new ReadImg(fileName)
  }
  display () {
    this.readImg.display()
  }
} 

// 测试
let proxyImg = new ProxyImg('1.png')
// 通过代理, 拿到真实需要拿到的数据
proxyImg.display()

