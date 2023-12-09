// 规范响应结构
class BaseModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}
// 成功模型
class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errNo = 0
  }
}
// 失败模型
class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errNo = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
