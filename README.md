# source-code

面试常见手写源码

## 防抖节流

1. 防抖: 将几次操作合并为一此操作进行。

   ![防抖](/img/防抖.png)

2. 节流: 使得一定时间内只触发一次函数(多次点击触发一次)

   ![节流](/img/节流.png)

## ES

1. 实现 new

   1. 让实例可以访问到私有属性
   2. 让实例可以访问构造函数原型(constructor.prototype)所在原型链上的属性
   3. 如果构造函数返回的结果不是引用数据类型

2. 实现 bind

   1. 对于普通函数，绑定 this 指向
   2. 对于构造函数，要保证原函数的原型对象上的属性不能丢失

3. 实现 apply/call

4. 实现 Promise

   >参考： `https://juejin.im/post/5b2f02cd5188252b937548ab`

5. 深拷贝

6. 实现 instanceOf

7. 原生自定义事件

## 算法

### 数组扁平化

   1. flat 函数
   2. reduce
   3. 递归函数
   4. 拓展运算符

### 排序

   1. 冒泡排序
   2. 快排序
   3. 归并排序
   4. 堆排序

   5. V8的Array.sort()就采取了当 n<=10 时, 采用插入排序, 当 n>10 时，采用三路快排的排序策略

### lazyMan

参考：`https://www.jianshu.com/p/f1b7cb456d37`

### 数组

## 设计模式

### 五大设计原则

    S - 单一职责原则: 一个程序只做一件事

    O - 开放封闭原则: 对拓展开放, 对修改封闭(支持拓展, 不支持修改源代码影响原有功能)

    L - 李氏置换原则: 子类能覆盖父类, 父类能出现的地方子类就能出现(React.component), js较少

    I - 接口独立原则: 保持接口单一独立, 避免出现"胖接口"(java等语言实现接口, js较少)

    D - 依赖导致原则: 依赖抽象而不依赖具体(js较少)

### 工厂模式

1. 概念: 对创建对象逻辑的封装

2. 经典使用场景 : jQuery的$(selector)

```js
// jquery 的 $
window.$ = function (selector) {
  return new jQuery(selector)
}
// React.createElement源码
class Vnode {
  constructor(tag, attrs, children) {
    // ... 源码
  }
}
React.createElement = function (tag, attrs, children) {
  return new Vnode(tag, attrs, children)
}
```

### 单例模式

1. 概念: 一个类只能构造出唯一实例

2. 经典实例

   1. jquery 的\$存在

      ```js
      if (window.jQuery != null) {
        return window.jQuery
      } else {
        // 初始化...
      }
      ```

   2. 购物车(和登录框类似)

   3. vuex 和 redux 中的 store

   4. element 的弹窗组件

> `https://github.com/ElemeFE/element/blob/dev/packages/message-box/src/main.js#L79`

### 代理模式

1. 概念: 控制对象的访问(类比翻墙, vpn)

2. 经典使用：事件代理、ES6的Proxy

```js
   // 网页事件代理(通过事件冒泡给父标签绑定事件)
   const div1 = document.getElementById('div1)
   div1.addEventListener('click', function(e) {
      var target = e.target
      if (target.nodeName === 'A) {
         alter(target.innerHTML)
      }
   })
   // ES6 proxy
   let star = {
      name: 'zhangsan',
      age: 23,
      phone: 'start_12345678948'
   }

   let agent = new Proxy(star, {
   get: function (target, key) {
      if (key === 'phone') {
         // 返回经纪人自己电话
         return 'agent_454545787878'
      }
      if (key === 'price') {
         // 经纪人报价
         return 120000
      }
      return target[key]
   },
   set: function (target, key, val) {
      if (key === 'customPrice') {
         if (val < 10000) {
         throw new Error('价格太低')
         } else {
         target[key] = val
         return true
         }
      }
   }
   })

   // 测试代码
   console.log(agent.name)
   console.log(agent.phone)
   console.log(agent.price)
   agent.customPrice = 15000
   console.log(agent.customPrice)
```

### 装饰器模式

1. 概念：对类的包装，动态地拓展类的功能

2. 经典使用：React高阶组件、ES7 装饰器、Redux connect()函数

### 适配器模式

1. 概念：兼容新旧接口，对类的包装

2. 经典使用：封装旧API

### 观察者模式 和 发布订阅

1. 区别:

   1. 发布-订阅模式: 报社，邮局和个人的关系，报纸的订阅和分发是由邮局来完成的。报社只负责将报纸发送给邮局。(多对多关系，执行不同的方法)
   2. 观察者模式: 个体奶农和个人的关系。奶农负责统计有多少人订了产品，所以个人都会有一个相同拿牛奶的方法。奶农有新奶了就负责调用这个方法。(一对多关系，执行同一个方法)

2. 原理图

   ![区别](/img/发布订阅.png)

## redux，react-redux 源码

1. redux：实现 getSate，subscribe，dispatch，applyMiddleware
2. react-redux：实现 connect，Provider

> 参考： `https://juejin.im/post/5def4831e51d45584b585000`

## node

### Express 源码

1. use/get/post 的实现
2. next 机制的实现
3. res.json 的实现

### Koa 源码

1.  洋葱圈模型
