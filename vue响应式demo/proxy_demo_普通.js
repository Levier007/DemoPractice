//定义一个需要代理的对象
let person = {
  age: 0,
  school: 'xdu'
}
//定义handler对象
let hander = {
  get(obj, key) {
    console.log('触发了get')
    // 如果对象里有这个属性，就返回属性值，如果没有，就返回默认值66
    return key in obj ? obj[key] : 66
  },
  set(obj, key, val) {
    console.log('触发了set')
    obj[key] = val
    return true
  }
}
//把handler对象传入Proxy
let proxyObj = new Proxy(person, hander)

// 一旦使用Proxy，如果想要读写操作生效，我们就要对Proxy的实例对象proxyObj进行操作

// 测试get能否拦截成功
console.log(proxyObj.school) //输出：触发了get xdu
console.log(proxyObj.name) //输出：触发了get 66

// 测试set能否拦截成功
proxyObj.age = 18 // 输出：触发了set
console.log(proxyObj.age) //输出： 触发了set 18
