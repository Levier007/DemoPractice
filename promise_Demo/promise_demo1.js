// setTimeout(() => {
//   console.log(11)
//   setTimeout(() => {
//     console.log(22)
//     setTimeout(() => {
//       console.log(33)
//       setTimeout(() => {
//         console.log(44)
//       }, 1000)
//     }, 1000)
//   }, 1000)
// }, 1000)

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 0)
// })
// p1.then(data => {
//   console.log(data)
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(2)
//     }, 2000)
//   })
// })
//   .then(data => {
//     console.log(data)
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(3)
//       }, 3000)
//     })
//   })
//   .then(data => {
//     console.log(data)
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(4)
//       }, 4000)
//     })
//   })
//   .then(data => {
//     console.log(data)
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(2)
//       }, 5000)
//     })
//   })

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log(111)
//     resolve()
//   }, 1000)
// })
// p2.then(data => {
//   setTimeout(() => {
//     console.log(222)
//     return new Promise((resolve, reject) => {
//       resolve()
//     })
//   }, 1000)
// }).then(data => {
//   setTimeout(() => {
//     console.log(333)
//     return new Promise((resolve, reject) => {
//       resolve()
//     })
//   }, 1000)
// })

const p3 = new Promise((resolve, reject) => {
  reject(1)
})
p3.then(
  data => {
    console.log(data)
  },
  err => {
    console.error(err, '错误')
  }
)
