import React, { Component } from "react"
import "./index.css"

export default class Header extends Component {
  handleeKeyUp = e => {
    const { keyCode, target } = e
    const { addTodo } = this.props
    if (keyCode === 13 && target.value.trim() !== "") {
      addTodo(target.value)
      target.value = ""
    }
  }
  render() {
    return (
      <div className="todo-header">
        <input
          type="text"
          placeholder="请输入你的任务名称，按回车键确认"
          onKeyUp={this.handleeKeyUp}
        />
      </div>
    )
  }
}
