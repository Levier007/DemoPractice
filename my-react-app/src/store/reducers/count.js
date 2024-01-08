import { INCREMENT, DECREMENT } from '../const'

// reducer是一个类似于array.reduce的函数，通过action来处理先前的state
let initState = 0
export default function countReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case INCREMENT:
      return preState + +data
    case DECREMENT:
      return preState - +data
    default:
      return preState
  }
}
