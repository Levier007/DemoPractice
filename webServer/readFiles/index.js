const fs = require('fs/promises')
const path = require('path')

const readFiles = async fileName => {
  try {
    let result = await fs.readFile(path.resolve(__dirname, 'jsons', fileName))
    let resultObj = JSON.parse(result.toString())
    console.log(resultObj)
    if (resultObj.next) {
      readFiles(resultObj.next)
    }
  } catch (error) {
    console.log(error, '出错了')
  }
}
readFiles('a.json')
