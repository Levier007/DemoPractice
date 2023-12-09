const fun = async () => {
  let result = await 1
  return result
}
const sameFun = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
console.log(fun())
console.log(sameFun())
