import React, { Component } from 'react'
// 用于连接UI组件与redux
import { connect } from 'react-redux'
import {
  incrementAction,
  decrementAction,
  incrementAsyncAction
} from '../store/actions/count'

class Count extends Component {
  increment = () => {
    let { value } = this.selectNumber
    this.props.increase(value)
  }
  decrement = () => {
    let { value } = this.selectNumber
    this.props.decrease(value)
  }
  incrementOfAsync = () => {
    let { value } = this.selectNumber
    this.props.increaseAsync(value, 500)
  }
  render() {
    return (
      <div>
        <h2>Count组件</h2>
        <h1>
          当前求和为{this.props.count}&nbsp;下面组件人数为{this.props.personNum}
        </h1>
        &nbsp;
        <select ref={c => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementOfAsync}>异步加</button>
      </div>
    )
  }
}

// 定义容器组件
export default connect(
  // mapStateToProps，用于映射状态
  // 此处的值传入UI组件中，UI组件可使用this.props.xxx拿到对应的值
  state => ({
    count: state.count,
    personNum: state.person.length
  }),
  // mapDispatchToProps，用于映射操作状态的方法
  {
    increase: incrementAction,
    decrease: decrementAction,
    increaseAsync: incrementAsyncAction
  }
)(Count)
