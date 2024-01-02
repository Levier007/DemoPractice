/* eslint-disable no-unused-vars */
import React, { Component } from "react"
import "./index.css"

export default class ListItem extends Component {
  state = {
    iconVisible: false,
  }
  handleMouseLeave = () => {
    this.setState({
      iconVisible: false,
    })
  }
  handleMouseEnter = () => {
    this.setState({
      iconVisible: true,
    })
  }
  handleDelete = id => {
    return () => {
      const { deleteTodo } = this.props
      deleteTodo(id)
    }
  }
  handleChangeTodo = id => {
    return e => {
      const { updateTodo } = this.props
      updateTodo(id, e.target.checked)
    }
  }
  render() {
    const { iconVisible } = this.state
    const { name, id, done, deleteTodo } = this.props
    return (
      <li
        ref={c => {
          this.liRef = c
        }}
        style={{ backgroundColor: iconVisible ? "#ddd" : "" }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <label>
          <input
            type="checkbox"
            checked={done}
            onChange={this.handleChangeTodo(id)}
          />
          <span>{name}</span>
        </label>
        <button
          className="btn btn-danger"
          style={{ display: iconVisible ? "" : "none" }}
          onClick={this.handleDelete(id)}>
          删除
        </button>
      </li>
    )
  }
}
