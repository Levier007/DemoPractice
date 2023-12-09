class MyPromise {
  //储存promise的结果
  #result
  //   储存promise的错误
  #reason
  //   储存promise的状态
  #state = 'pending'
  //   储存then当中的回调函数,可能存在多个
  #callbacks = []
  constructor(excutor) {
    excutor(this.#resolve.bind(this), this.#reject.bind(this))
  }
  // # 私有方法
  #resolve(value) {
    if (this.#state !== 'pending') {
      return
    }
    this.#result = value
    this.#state = 'fullfilled'

    // resolve执行时，说明数据已经进来，需要调用then函数，
    queueMicrotask(() => {
      this.#callbacks.forEach(cb => {
        cb()
      })
    })
  }
  #reject(reason) {
    this.#reason = reason
  }
  then(onFullfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.#state === 'pending') {
        // 处理存储异步的数据的情况
        this.#callbacks.push(() => {
          // then返回的行的promise中的数据为onFullFilled等的返回值
          resolve(onFullfilled(this.#result))
        })
      } else if (this.#state === 'fullfilled') {
        // 放入微任务队列
        queueMicrotask(() => {
          resolve(onFullfilled(this.#result))
        })
      }
    })
  }
}
const mp = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(123)
  })
})
mp.then(val => {
  console.log(111, val)
  return 'lwt'
}).then(val => {
  console.log(222, val)
})
