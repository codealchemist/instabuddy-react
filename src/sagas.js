import { all, fork } from 'redux-saga/effects'
import channel from 'store/channel/sagas'

export default function * saga () {
  console.log('load sagas')
  yield all([fork(channel)])
}
