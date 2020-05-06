// demo
class Product {
  constructor(name) {
    this.name = name
  }
  init() {
    console.log('init');
  }
}
// 工厂函数
class Creator {
  create(name) {
    return new Product(name)
  }
}

// 使用
let creator = new Creator()
let p = creator.create('p')
p.init()
