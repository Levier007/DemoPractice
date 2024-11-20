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
const tableName = 'balance_detail'
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
      // 每隔 30 分钟发送一次心跳包
      setInterval(() => {
        connection.query('SELECT 1', (err, results) => {
          if (err) {
            console.error('Error during heartbeat query:', err)
          } else {
            console.log('Heartbeat query executed.')
          }
        })
      }, 30 * 60 * 1000)
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
  const date = new Date(parseInt(timestamp))
  const beijingOffset = 8 * 60 * 60 * 1000 // 北京时间比 UTC 快 8 小时
  const beijingDate = new Date(date.getTime() + beijingOffset)
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

    // 计算当前 total 与上一行 total 的差值
    connection.query(`SELECT total FROM ${tableName} ORDER BY id DESC LIMIT 1`, (err, results) => {
      if (err) {
        console.error('Error fetching previous total:', err)
        return
      }

      let previousTotal = results.length > 0 ? results[0].total : null
      let balanceDifference = previousTotal !== null ? data.total - previousTotal : null

      if (results.length === 0 || balanceDifference !== 0) {
        // 准备要插入的新数据
        const newRow = {
          timestamp: convertToMySQLDatetime(data.timestamp),
          usdtRate: data.usdtRate,
          internalBalance: data.internalBalance,
          externalBalance: data.externalBalance,
          total: data.total,
          balance_diff: balanceDifference
        }

        // 插入新数据到数据库
        connection.query(
          `INSERT INTO ${tableName} (timestamp, usdtRate, internalBalance, externalBalance, total, balance_diff) VALUES (?, ?, ?, ?, ?, ?)`,
          [newRow.timestamp, newRow.usdtRate, newRow.internalBalance, newRow.externalBalance, newRow.total, newRow.balance_diff],
          (err, results) => {
            if (err) {
              console.error('Error inserting data into MySQL:', err)
            } else {
              console.log('Inserted new row:', newRow)

              // 推送消息到钉钉
              const message = `${newRow.timestamp}\nmfs总额变化：${newRow.balance_diff}\n\n当前内部mfs余额: ${newRow.internalBalance}\n当前外部mfs余额: ${newRow.externalBalance}\n当前总mfs余额: ${newRow.total}\n当前汇率: ${newRow.usdtRate}`
              sendToDingTalk(message)
            }
          }
        )
      }
    })
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

console.log(`WebSocket server is running on ws://localhost:${port}`)
