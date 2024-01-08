import React, { Component } from "react"
import "./index.css"

export default class footer extends Component {
  handleAllCheck = e => {
    const { checkedAll } = this.props
    checkedAll(e.target.checked)
  }
  handleClear = () => {
    const { handleClearIsDone } = this.props
    handleClearIsDone()
  }
  render() {
    const { todoList } = this.props
    let isDoneNum = todoList.filter(todo => todo.done === true).length
    return (
      <div className="todo-footer">
        <label>
          <input
            type="checkbox"
            checked={isDoneNum === todoList.length && isDoneNum !== 0}
            onChange={this.handleAllCheck}
          />
        </label>
        <span>
          <span>已完成{isDoneNum}</span> / 全部{todoList.length}
        </span>
        <button
          className="btn btn-danger"
          onClick={this.handleClear}>
          清除已完成任务
        </button>
      </div>
    )
  }
}
