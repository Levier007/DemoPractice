let person = {
  age: 0,
  school: 'xdu',
  children: {
    name: '小明'
  }
}
let hander = {
  get(obj, key) {
    console.log('触发了get', key, obj, key in obj, obj[key])
    return key in obj ? obj[key] : 66
  },
  set(obj, key, val) {
    console.log('触发了set')
    obj[key] = val
    return true
  }
}
let proxyObj = new Proxy(person, hander)

console.log(proxyObj.sex)
// 测试get
console.log(proxyObj.children.name) //输出：触发了get 小明
console.log(proxyObj.children.height) //输出：触发了get undefined   之所以是undefined 是因为proxyObj.children走的proxy代理，返回的是{name:"小明"},proxyObj.children.height则只是普通对象，不会再走proxy代理了，故读取不存在的对象时返回的是undefined
// 测试set
proxyObj.children.name = '菜菜' // 触发了get
console.log(proxyObj.children.name) //输出: 触发了get 菜菜
