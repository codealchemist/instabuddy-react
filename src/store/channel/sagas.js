import { eventChannel } from 'redux-saga'
import { takeEvery, put, take } from 'redux-saga/effects'
import channelService from 'services/channelService'
import { LOAD } from './actionTypes'
import * as channelHandlers from './handlers'
import { loadSuccess, loadError } from './actions'

export function getChannelEventEmitter (channelId) {
  return eventChannel(emitter => {
    channelService
      .onChannel((err, channel) => {
        if (err) {
          console.log('channel sagas: err loading channel:', err)
          emitter({ type: 'channelError', data: err })
          return
        }

        console.log('channel sagas: got channel', channel)
        emitter({ type: 'channelSuccess', data: channel })
      })
      .getChannel(channelId)

    return () => {
      console.log('Channel unsubscribe.')
    }
  })
}

export function * loadChannel ({ payload }) {
  console.log('channel saga: loadChannel', payload)
  try {
    const channel = getChannelEventEmitter(payload.id)
    while (true) {
      const { type, data } = yield take(channel)
      console.log(`----- CHANNEL EMITTER, type ${type}:`, data)
      if (type in channelHandlers) yield channelHandlers[type](data)
    }
  } catch (e) {
    console.error(e)
  }
}

export default function * channelSagas () {
  console.log('channel sagas')
  yield takeEvery(LOAD, loadChannel)
}
