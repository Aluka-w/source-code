/**
 * @description 装饰器模式：对类的包装，动态地拓展类的功能
 * React高阶组件、ES7 装饰器、Redux connect()函数
 */
function info(target) {
  target.prototype.name = '张三'
  target.prototype.age = 10
}

@info
class Man {}

let man = new Man()
man.name // 张三