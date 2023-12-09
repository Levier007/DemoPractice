/* function sum(a, b, cb) {
  setTimeout(() => {
    // 通过回调函数获取函数的返回值 
    cb(a + b)
  }, 1000)
}
const getSum = sum(1, 2, result => {
  sum(result, 3, result => {
    sum(result, 4, result => {
      sum(result, 5, result => {
        sum(result, 6, result => {
          console.log(result)
        })
      })
    })
  })
})
console.log(getSum) */

/* promise写法 */
/* function sum(oldVal, newVal) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(oldVal + newVal)
    }, 1000)
  })
}
sum(1, 2)
  .then(result => {
    return result + 3
  })
  .then(result => {
    return result + 4
  })
  .then(result => {
    return result + 5
  })
  .then(result => {
    return result + 6
  })
  .then(result => {
    console.log(result)
  }) */

/* const p2 = new Promise((resolve, reject) => {
  reject(123)
})
p2.then(data => {
  console.log(data)
  //   return 456
})
  .then(data => {
    console.log(data)
  })
  .catch(data => {
    console.log(data)
  })
  .then(data => {
    console.log(data)
  }) */

/* function sum(a, b, cb) {
  setTimeout(() => {
    // 通过回调函数获取函数的返回值
    cb(a + b)
  }, 1000)
}
const getSum = sum(1, 2, result => {
  console.log(result)
})
console.log(getSum) */

/* let x
function sum(a, b, cb) {
  setTimeout(() => {
    // 通过回调函数获取函数的返回值
    x = a + b
    return cb(x)
  }, 1000)
}
const getSum = sum(1, 2, result => {
  console.log(result)
}) */

/* class Person {
  constructor() {
    this.sayNo = () => {
      console.log('no')
    }
  }
  sayHi() {
    console.log('Hi')
  }
}
class Chinese extends Person {
  constructor() {
    super()
    this.a = 'a'
  }
}
let p1 = new Person()
let p2 = new Chinese()
console.log(p1.sayHi === p2.sayHi)
console.log(p2.a) */

/* =================== */
const sum = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}
/* let p1 = sum(1, 2)
  .then(res => sum(res, 3))
  .then(res => {
    console.log(res)
  })
console.log(p1) */
/* const getSum = async () => {
  let res = await sum(1, 2)
  let res2 = await sum(res, 3)
  console.log(res2)
}
getSum() */

const sameGetSum = () => {
  sum(1, 2)
    .then(res => {
      return sum(res, 3)
    })
    .then(res => {
      console.log(res)
    })
}
sameGetSum()
/* =============== */
/* const getSum1 = async () => {
  console.log(1)
}
// 等价形式
const sameGetSum1 = () => {
  return new Promise((resolve, reject) => {
    console.log(1)
    resolve()
  })
}
console.log(getSum1()) */
