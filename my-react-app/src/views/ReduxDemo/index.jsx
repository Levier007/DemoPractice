import React, { Component } from 'react'
import Count from '../../containers/count'
import Person from '../../containers/person'
export default class ReduxDemo extends Component {
  render() {
    return (
      <div>
        <Count></Count>
        <hr />
        <Person></Person>
      </div>
    )
  }
}
