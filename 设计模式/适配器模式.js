/**
 * @description 适配器模式：兼容新旧接口，对类的包装
 * 例如出境旅游插头插座不匹配，这时我们就需要使用转换插头
 */
class Adaptee {
  test() {
    return '旧接口'
  }
}

class Target {
  constructor() {
    this.adaptee = new Adaptee()
  }
  test() {
    let info = this.adaptee.test()
    return `适配${info}`
  }
}

let target = new Target()
console.log(target.test())
