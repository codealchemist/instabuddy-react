import ReconnectingWebSocket from 'reconnectingwebsocket'
import instabuddyEvents from './instabuddyEvents'
import messages from 'messages/index'

export class ChannelService {
  constructor () {
    this.connected = false
    this.events = instabuddyEvents
    this.handlers = {
      channel: null,
      buttonSaved: null,
      play: null
    }
  }

  onChannel (callback) {
    this.handlers.channel = callback
    return this
  }

  onButtonSaved (callback) {
    this.handlers.buttonSaved = callback
    return this
  }

  onPlay (callback) {
    this.handlers.play = callback
    return this
  }

  connect (callback) {
    // Check for websockets support.
    if (!('WebSocket' in window)) {
      alert(messages.noWebSocketSupport)
      return
    }

    let wsProto = 'ws'
    let port = 3100
    if (window.location.protocol === 'https:') {
      wsProto = 'wss'
      port = window.location.port
    }
    this.ws = new ReconnectingWebSocket(
      `${wsProto}://${window.location.hostname}:${port}`
    )
    this.ws.binaryType = 'arraybuffer'

    this.ws.onopen = () => {
      if (this.connected) {
        this.log('WebSocket reconnected.')
        return
      }

      this.log('WebSocket connected.')
      this.connected = true
      if (typeof callback === 'function') callback()
    }

    this.ws.onmessage = event => {
      const { type, data, error } = JSON.parse(event.data)
      this.log(`Got message '${type}'`, data, error)
      if (typeof this.events[type] === 'function') {
        this.events[type]({ type, data, error, callback: this.handlers[type] })
      }
    }

    this.ws.onerror = event => {
      this.log('ERROR:', event)
    }
  }

  getChannel (channel) {
    this.log('Get channel...')

    // Wait for connection.
    // TODO: Add this on all methods.
    if (!this.connected) {
      setTimeout(() => {
        this.getChannel(channel)
      }, 1000)
      return
    }

    this.send({ type: 'getChannel', name: channel })
  }

  removeButton (event, { channel, id }) {
    this.send({ type: 'removeButton', channel: channel, id })
  }

  sendPlay ({ channel, id, src }) {
    this.send({
      type: 'play',
      data: { channel, id, src }
    })
  }

  sendBinary (buffer, { id, name, channel }) {
    const xhr = new XMLHttpRequest()
    const url = `/binary/${channel}/${id}/${name}`
    xhr.open('POST', url, true)
    xhr.send(buffer)
  }

  send (message) {
    const data = JSON.stringify(message)
    this.ws.send(data)
  }

  log () {
    console.log('[ CHANNEL SERVICE ]-->', ...arguments)
  }
}

const channelService = new ChannelService()
channelService.connect()

export default channelService
