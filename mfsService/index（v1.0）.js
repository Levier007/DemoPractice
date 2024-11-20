const WebSocket = require('ws')
const mysql = require('mysql2')
const axios = require('axios') // 使用 axios 进行 HTTP 请求

// 钉钉 Webhook URL
const dingTalkWebhookUrl = 'https://oapi.dingtalk.com/robot/send?access_token=1bde0714184f03ec5c744e5880c3fbb98ae4e3ad88e4592b73b9694c1458a609'

// 创建 MySQL 数据库连接
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'lee5672020',
  database: 'mfs'
}
const tableName = 'balancehistory'
let connection

// 创建并管理 MySQL 连接
function handleDisconnect() {
  connection = mysql.createConnection(dbConfig)

  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err)
      setTimeout(handleDisconnect, 2000) // 2秒后重试连接
    } else {
      console.log('Connected to MySQL database.')
      // 每隔 5 分钟发送一次心跳包
      setInterval(() => {
        connection.query('SELECT 1', (err, results) => {
          if (err) {
            console.error('Error during heartbeat query:', err)
          } else {
            console.log('Heartbeat query executed.')
          }
        })
      }, 30 * 60 * 1000) // 5分钟间隔
    }
  })

  connection.on('error', err => {
    console.error('MySQL error', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect() // 自动重连
    } else {
      throw err
    }
  })
}

handleDisconnect()

// 将 Unix 时间戳（毫秒）转换为 MySQL 兼容的日期时间格式
function convertToMySQLDatetime(timestamp) {
  // 创建一个 Date 对象并设置时间戳
  const date = new Date(parseInt(timestamp))

  // 将时间从 UTC 转换为北京时间（CST）
  const beijingOffset = 8 * 60 * 60 * 1000 // 北京时间比 UTC 快 8 小时
  const beijingDate = new Date(date.getTime() + beijingOffset)

  // 将日期转换为 MySQL 兼容的日期时间格式
  return beijingDate.toISOString().slice(0, 19).replace('T', ' ')
}

// 发送消息到钉钉
function sendToDingTalk(message) {
  axios
    .post(dingTalkWebhookUrl, {
      msgtype: 'text',
      text: {
        content: message
      }
    })
    .then(response => {
      console.log('Message sent to DingTalk:', response.data)
    })
    .catch(error => {
      console.error('Error sending message to DingTalk:', error)
    })
}

// 创建 WebSocket 服务器
const port = 8081
const wss = new WebSocket.Server({ port })

wss.on('connection', ws => {
  console.log('Client connected')

  ws.on('message', message => {
    const data = JSON.parse(message)

    // 计算当前balance与上一行balance的差值
    connection.query(`SELECT balance FROM ${tableName} ORDER BY timestamp DESC LIMIT 1`, (err, results) => {
      if (err) {
        console.error('Error fetching previous balance:', err)
        return
      }

      let previousBalance = results.length > 0 ? results[0].balance : null
      let balanceDifference = previousBalance !== null ? data.balance - previousBalance : 0
      if (results.length === 0 || balanceDifference !== 0) {
        // 准备要插入的新数据
        const newRow = {
          timestamp: convertToMySQLDatetime(data.timestamp),
          balance: data.balance,
          balance_difference: balanceDifference
        }
        // 插入新数据到数据库
        connection.query(`INSERT INTO ${tableName} (timestamp, balance, balance_difference) VALUES (?, ?, ?)`, [newRow.timestamp, newRow.balance, newRow.balance_difference], (err, results) => {
          if (err) {
            console.error('Error inserting data into MySQL:', err)
          } else {
            console.log('Inserted new row with balance difference:', newRow)
            // 推送消息到钉钉
            const message = `${newRow.timestamp}\nmfs余额变化：${balanceDifference}\n当前可用mfs余额: ${data.balance}`
            sendToDingTalk(message)
          }
        })
      }
    })
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

console.log(`WebSocket server is running on ws://localhost:${port}`)
