# source-code

面试常见手写源码

## 防抖节流

1. 防抖: 将几次操作合并为一此操作进行。

   ![防抖](/img/防抖.png)

2. 节流: 使得一定时间内只触发一次函数(多次点击触发一次)

   ![节流](/img/节流.png)

## js 原理

1. 实现 new

   1. 让实例可以访问到私有属性
   2. 让实例可以访问构造函数原型(constructor.prototype)所在原型链上的属性
   3. 如果构造函数返回的结果不是引用数据类型

2. 实现 bind

   1. 对于普通函数，绑定 this 指向
   2. 对于构造函数，要保证原函数的原型对象上的属性不能丢失

3. 实现 apply/call

4. 实现 Promise

5. 深拷贝

6. 实现 instanceOf

## 数组扁平化

1. flat 函数

2. reduce

3. 递归函数

4. 拓展运算符

## 设计模式

### 五大设计原则

    S - 单一职责原则: 一个程序只做一件事

    O - 开放封闭原则: 对拓展开放, 对修改封闭(支持拓展, 不支持修改源代码影响原有功能)

    L - 李氏置换原则: 子类能覆盖父类, 父类能出现的地方子类就能出现(React.component), js较少

    I - 接口独立原则: 保持接口单一独立, 避免出现"胖接口"(java等语言实现接口, js较少)

    D - 依赖导致原则: 依赖抽象而不依赖具体(js较少)

### 工厂模式

1. 概念: 直接生成实例, 避免每次都 new 生成, 一般出现在 new 新实例上

2. 经典使用场景

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

1. 概念: 保证全局只存在一个实例

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

1. 概念: 通过代理访问私有方法(类比翻墙, vpn)

2. 经典使用

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

### 观察者模式 和 发布订阅

1. 区别:

   1. 发布-订阅模式: 报社，邮局和个人的关系，报纸的订阅和分发是由邮局来完成的。报社只负责将报纸发送给邮局。
   2. 观察者模式: 个体奶农和个人的关系。奶农负责统计有多少人订了产品，所以个人都会有一个相同拿牛奶的方法。奶农有新奶了就负责调用这个方法。

2. 原理图

   ![区别](/img/发布订阅.png)
