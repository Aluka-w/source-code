// 原始类型
// 布尔
let isDone: boolean = true
// number
let num: number = 123
// string, 单/双引号, 模板字符串
let str: string = '123'
let strModeal: string = `test${str}`

// 数组
let list: number[] = [1, 2, 3]
// 泛型: 数组内容任选
let list2: Array<number | string | object> = [1, '2', 3]
// 元组: 越界部分, 会使用联合类型替代
let list3: [number, string] = [1, 'test']

// Any, 可以变更, 可以调用不存在的方法
let noSure: any = 3
noSure = '1232'
noSure = true
// noSure.method()

// Void, 类似any相反, 没有任何类型, 一般在函数没有返回值
// 声明void类型, 只能赋值为undefined和null, 本身意义不大
function fn(): void {}
let unsable: void = undefined

// null, 本身意义不大
let n: null = null
// undefined, 本身意义不大
let u: undefined = undefined
// null和undefined是所有类型的子类型
// let str2: string = null
// let str3: number = undefined

// never类型是任何类型的子类型
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// object 非原始类型除number，string，boolean，symbol，BigInt，null或undefined之外的类型。

// 类型断言, 确切知道某个值的类型, 提前告诉编译器
// 尖括号
let someValue: any = 'this is a string'
let strLength: number = (<string>someValue).length
// as语法
let someValue2: any = 'this is a string'
let strLength2: number = (someValue as string).length

// 函数声明(默认值, 可选参数)
function add(x: number, y: number = 10, z?: number): number {
  if (typeof z === 'number') {
    return x + y + z
  }
  return x + y
}
// 函数表达式
const add2 = (x: number, y: number = 10, z?: number): number => {
  if (typeof z === 'number') {
    return x + y + z
  }
  return x + y
}
// 函数类型(add3的函数类型)
const add3: (x: number, y: number, z?: number) => number = add2

// 类(class), 定义了实物的抽象特点(属性和方法)
// 对象: 类的实例
// 面向对象(OOP)三大特性:
// 封装: 只暴露对外接口, 外部只调用, 不需要知道细节
// 继承: 子类继承父类
// 多态: 由继承产生的相关的不同的类, 对同一个方法的不同响应, 猫狗都继承animal, 分别实现了eat方法, 但是调用eat, 程序就会自动执行
// ts-node
// ts-node 文件
class Animal {
  public name: string
  static categoies: string[] = ['bird']
  static isAnimal(a: any) {
    return a instanceof Animal
  }
  constructor(name: string) {
    this.name = name
  }
  run() {
    console.log(`${this.name} is runing`)
  }
}
// 继承
class Dog extends Animal {
  bark() {
    console.log(`${this.name} is bark`)
  }
}
const dog = new Dog('小狗')
// dog.run()
// dog.bark()

// 重新定义父类方法
class Cat extends Animal {
  constructor(name: string) {
    super(name)
  }
  run() {
    console.log(`cat ${this.name}`)
  }
}
const cat = new Cat('ccc')
// cat.run()
// console.log(cat.name)
// 类的修饰符
// public: 默认
// protected: 只能在Animal类和子类中访问
// private: 私有属性, 只在Animal中被访问
// readonly: 只读属性
// static: 静态属性和方法, 不需要实例化就可以调用
// console.log(Animal.isAnimal(cat))

// Interface 接口(按照定义的方法)
// ① 对对象形状进行描述 ② 对类进行抽象 ③ 鸭子类型
// ① 对对象形状进行描述
interface IPerson {
  name: string
  age?: number // 可选属性
  readonly id: number // 只读属性
}
// 一般以I开头
let jerry: IPerson = {
  name: 'jerry',
  id: 2
}
// jerry.id = 3 只读属性不可更改

// ② 对类进行抽象 和 ③ 鸭子类型
// Car 和 Cellphone都有收音机, 但又不是一个类, 没办法类的继承
// 只要长得像鸭子, 叫的像鸭子, 就是鸭子
interface Radio {
  switchRadio(): void
}
// Cellphone才有电池状态
interface Battery {
  checkBatteryStatus(): void
}
// 接口的继承
interface RadioWithBattery extends Radio {
  checkBatteryStatus(): void
}
class Car implements Radio {
  switchRadio() {}
}
// 以下两种一样
class Cellphone implements Radio, Battery {
  switchRadio() {}
  checkBatteryStatus() {}
}
class Cellphone2 implements RadioWithBattery {
  switchRadio() {}
  checkBatteryStatus() {}
}

// 枚举: 为数值赋予友好的名字
// 主动赋值从0开始
// 手动赋值 Up = 10, 就可以从10开始
// 反向映射 Direction[10] -> Up, Direction.Up
// enum Direction {
//   Up = 10,
//   Down,
//   Left,
//   Right
// }
// 字符串枚举
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
const value = 'UP'
if (value === Direction.Up) {
//  console.log(object)
}
// 常量枚举(const 会提高性能), 常量值才可常量枚举
const enum Direction2 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

// 泛型(Generics), 定义函数, 接口, 类的时候 不预先指定具体类型, 而是在使用时候再指定类型
// 应用到函数
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
// 使用的时, result已经指定类型
const result = swap(['123', 777])
// result[0]

// 约束泛型
interface withLength {
  length: number
}
// 报错
// function echoWithLength1<T>(arg: T): T {
//   // 没有length属性, 报错
//   console.log(arg.length)
//   return arg
// }
// 解决
function echoWithLength<T extends withLength>(arg: T): T {
  console.log(arg.length)
  return arg
}
let str3 = echoWithLength('str')
let arr4 = echoWithLength([1, 2, 3]) 
let obj = echoWithLength({ length: 10})

// 泛型应用到类
class Queue<T> {
  private data = [];
  push(item: T) {
    return this.data.push(item)
  }
  pop(): T {
    return this.data.shift()
  }
}
const queue = new Queue<number>()
queue.push(1)
// 但是假如是str时候, 没有这个方法
console.log(queue.pop().toFixed())
const queue2 = new Queue<string> ()
queue2.push('str')
console.log(queue2.pop().length)