import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { load, saveButton, deleteButton } from 'store/channel/actions'
import Channel from 'components/Channel'

const Wrapper = styled.div`
  display: flex;
`

export class ChannelPage extends React.PureComponent {
  state = { channelId: null }

  componentDidMount() {
    const { match, load } = this.props
    const { channelId } = match.params

    console.log('Channel:', channelId)
    load({ id: channelId })
  }

  render() {
    const { match, channel, deleteButton } = this.props
    const { channelId } = match.params
    return (
      <Channel
        id={channelId}
        buttons={channel.buttons}
        saveButton={saveButton}
        deleteButton={deleteButton}
      />
    )
  }
}

const mapStateToProps = state => ({
  channel: state.channel
})

const mapActionsToProps = {
  load,
  saveButton,
  deleteButton
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ChannelPage)
