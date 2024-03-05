const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/dbConfig')

const connection = mysql.createConnection(MYSQL_CONFIG)
// 建立连接
connection.connect()

const executeSQL = (sql, cb) => {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
  return promise
}

module.exports = {
  executeSQL
}
