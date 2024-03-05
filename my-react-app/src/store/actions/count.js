import { INCREMENT, DECREMENT, ASYNC_INCREMENT } from '../const'

export const incrementAction = data => ({ type: INCREMENT, data })
export const decrementAction = data => ({ type: DECREMENT, data })
export const incrementAsyncAction = (data, delay) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(incrementAction(data))
    }, delay)
  }
}
