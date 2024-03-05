import { ADD_PERSON } from '../const'

// reducer是一个类似于array.reduce的函数，通过action来处理先前的state
let initState = [{ id: '001', name: 'lwt', age: 18 }]
export default function personReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case ADD_PERSON:
      return [data, ...preState]
    default:
      return preState
  }
}
