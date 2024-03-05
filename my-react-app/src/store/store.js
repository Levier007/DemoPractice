// createStore已被标注为弃用，但是还能用，只是官方不推荐
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
// 用于支持异步action
import { thunk } from 'redux-thunk'
import allReducers from './reducers'

export default createStore(allReducers, applyMiddleware(thunk))
