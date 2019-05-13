export class InstabuddyEvents {
  channel ({ type, data, error, callback }) {
    this.log('channel:', data)
    if (error) {
      if (typeof callback === 'function') callback(error)
      throw new Error(error)
    }

    if (!data || !data.buttons || !data.buttons.length) {
      this.log('EMPTY channel')
      return
    }

    if (typeof callback === 'function') callback(null, data)
  }

  buttonSaved ({ type, data, error }) {
    if (error) {
      this.log('ERROR SAVING BUTTON', error)
      return
    }

    this.log('BUTTON SAVED', data)
  }

  log () {
    console.log('[ EVENTS ]-->', ...arguments)
  }

  play ({ type, data, error }) {
    const { channel, id, src } = data
    this.log(`BROADCAST PLAY @${channel}, ID ${id}:`, src)
  }
}

const instabuddyEvents = new InstabuddyEvents()
export default instabuddyEvents
