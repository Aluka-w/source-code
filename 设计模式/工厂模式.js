/**
 * @description 工厂模式：对创建对象逻辑的封装
 */
class User {
  constructor(name, auth) {
    this.name = name
    this.auth = auth
  }
}
// 工厂模式
class UserFactory {
  static createUser(name, auth) {
    //工厂内部封装了创建对象的逻辑:
    //权限为admin时,auth=1, 权限为user时, auth为2
    //使用者在外部创建对象时,不需要知道各个权限对应哪个字段, 不需要知道赋权的逻辑，只需要知道创建了一个管理员和用户
    if (auth === 'admin') new User(name, 1)
    if (auth === 'user') new User(name, 2)
  }
}

const admin = UserFactory.createUser('cxk', 'admin')
const user = UserFactory.createUser('cxk', 'user')
