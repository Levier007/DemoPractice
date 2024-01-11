import React, { Component } from 'react'
// 用于连接UI组件与redux
import { connect } from 'react-redux'
import { addPersonAction } from '../store/actions/peron'

class Person extends Component {
  addPerson = () => {
    let data = {
      id: Date.now(),
      name: this.nameInput.value,
      age: this.ageInput.value
    }
    this.props.addPerson(data)
    this.nameInput.value = ''
    this.ageInput.value = ''
  }
  render() {
    return (
      <div>
        <h2>Person组件</h2>
        <h1>
          当前人数为{this.props.personList.length}&nbsp;&nbsp;上一个组件求和为
          {this.props.count}
        </h1>
        &nbsp;
        <input
          ref={c => (this.nameInput = c)}
          type="text"
          placeholder="name"
        />
        &nbsp;
        <input
          ref={c => (this.ageInput = c)}
          type="text"
          placeholder="age"
        />
        &nbsp;
        <button onClick={this.addPerson}>添加</button>&nbsp;
        <ul>
          {this.props.personList.map(person => {
            return <li key={person.id}>{person.name + '---' + person.age}</li>
          })}
        </ul>
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
    personList: state.person
  }),
  // mapDispatchToProps，用于映射操作状态的方法
  {
    addPerson: addPersonAction
  }
)(Person)
