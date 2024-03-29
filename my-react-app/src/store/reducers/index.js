/**
 * 此文件夹用于合并reducer
 */

import { combineReducers } from 'redux'
import countReducer from '../reducers/count'
import personReducer from '../reducers/person'

/**
 * 合并Reducer
 * 使用combineReducers合并Reducer，key为自定义，value为reducer
 */
export default combineReducers({
  count: countReducer,
  person: personReducer
})
