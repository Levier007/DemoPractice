function observe(obj) {
  for (const key in obj) {
    let internalValue = obj[key]
    if (typeof internalValue === 'object') {
      observe(internalValue)
    }
    let functions = new Set()
    Object.defineProperty(obj, key, {
      get() {
        if (window._func && !functions.has(window._func)) {
          functions.add(window._func)
        }
        console.log('读取了属性' + key)
        return internalValue
      },
      set(val) {
        internalValue = val
        functions.forEach(func => {
          func()
        })
        console.log('修改了属性' + key + '  ' + val)
      }
    })
  }
}

function autorun(callback) {
  window._func = callback
  callback()
  window._func = null
}
