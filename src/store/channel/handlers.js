import { put } from 'redux-saga/effects'
import { loadSuccess, loadError } from './actions'

export function * channelSuccess (data) {
  console.log('PUT loadSuccess')
  yield put(loadSuccess(data))
}

export function * channelError (data) {
  console.log('PUT loadError')
  yield put(loadError(data))
}
