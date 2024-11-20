const { ethers } = require('ethers')
const axios = require('axios')

// 配置
const walletAddress = {
  hcWallet: {
    address: '0x6FCb55C09671bD0d28b5A0e9d303793aC005F19c',
    tag: 'HC卖币钱包'
  },
  jdWallet: {
    address: '0x073F13181dAE13A527E9Ab5022641e4c808B7821',
    tag: '主钱包'
  },
  lhWallet: {
    address: '0xA0AbF7e98A9724cBc39dba90bBb55386E94F25b9',
    tag: '副钱包'
  },
  ttWallet: {
    address: '0xd9CCBbcD01eEC912F15207E53D29A337Ac637186',
    tag: '涛涛主钱包'
  }
}
const tokenContractAddress = '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063'
const dingTalkWebhookUrl = 'https://oapi.dingtalk.com/robot/send?access_token=734fb395ecaca1bad92d6559f0f24e83b36f23adb2fe74a46ffb10561a770560' // 钉钉 Webhook URL

// Polygon 网络提供商
const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')

// ERC-20 代币 ABI
const erc20Abi = ['function balanceOf(address owner) view returns (uint256)', 'event Transfer(address indexed from, address indexed to, uint amount)']

// 创建代币合约实例
const tokenContract = new ethers.Contract(tokenContractAddress, erc20Abi, provider)

// 钉钉消息发送函数
function sendDingTalkMessage(content) {
  const data = {
    msgtype: 'text',
    text: {
      content: '收到新的 DAI 转账！:\n' + content
    }
  }

  axios
    .post(dingTalkWebhookUrl, data)
    .then(response => {
      console.log('DingTalk message sent: ', response.data)
    })
    .catch(error => {
      console.error('Error sending message to DingTalk: ', error)
    })
}
// 判断别名
// function checkAlias(address) {

//   }
// 设置最低转账金额（100000 DAI），并转换为 DAI 的最小单位（18 位小数）
const minimumTransferAmount = ethers.utils.parseUnits('100000', 18)

// 监听 DAI 转账事件
tokenContract.on('Transfer', (from, to, amount, event) => {
  if (to.toLowerCase() === walletAddress.hcWallet.address.toLowerCase() && amount.gte(minimumTransferAmount)) {
    const amountInTokens = ethers.utils.formatUnits(amount, 18)
    console.log(`Received ${amountInTokens} DAI from ${from}`)
    sendDingTalkMessage(`${amountInTokens} DAI from ${from}`)
  }
  // if (to.toLowerCase() === walletAddress.jdWallet.address.toLowerCase()) {
  //   const amountInTokens = ethers.utils.formatUnits(amount, 18)
  //   sendDingTalkMessage(`Received ${amountInTokens} DAI from ${from}`)
  // }
})

console.log(`Listening for DAI transfers greater than 100 to wallet: ${walletAddress.hcWallet.tag}`)
