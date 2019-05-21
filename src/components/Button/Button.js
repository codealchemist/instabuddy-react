import React from 'react'
import styled from 'styled-components'
import { Howl } from 'howler'
import Clipboard from 'react-clipboard.js'
import { toast } from 'react-toastify'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  position: relative;
  background: #eee;
  color: #000;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border: 1px solid #fff;

    :before {
      content: '';
      background: rgba(255, 255, 255, 0.25);
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: 50%;
      transition: all 0.5s;

      -webkit-animation: scale-up-center 0.2s
        cubic-bezier(0.39, 0.575, 0.565, 1) both;
      animation: scale-up-center 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    }

    > div {
      display: flex;
    }
  }

  p {
    pointer-events: none;
    z-index: 10;

    /* Ellipsis. */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Actions = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  color: black;
  background: #eee;
  width: 90px;
  height: 40px;
  border-radius: 20px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: auto;
  border: 1px solid #fff;
  text-align: center;
  line-height: 21px;
  font-size: 20px;
  font-style: normal;

  i {
    font-style: normal;
  }
`

const colors = [
  '#abb2fc',
  '#abb2fc',
  '#99ffc6',
  '#fbffa3',
  '#ffc878',
  '#f1c40f',
  '#ff2d55',
  '#e74c3c',
  '#bfff00',
  '#828be0',
  '#5ac8fa',
  '#4cd964',
  '#07bc0c',
  '#3498db',
  '#00c4b7'
]

function getRandomColor() {
  const total = colors.length
  const index = Math.round(Math.random() * total)
  return colors[index]
}

export default class Button extends React.PureComponent {
  download = event => {
    event.stopPropagation()
    const { channel, id, src, name } = this.props
    console.log(`BUTTON.download @${channel}: ${id}`, event)

    fetch(src, { mode: 'cors' })
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${name.replace(' ', '-')}.webm`
        link.click()
        URL.revokeObjectURL(url)
      })
  }

  delete = event => {
    event.stopPropagation()
    const { channel, id, name, deleteButton } = this.props
    console.log(`BUTTON.delete @${channel}: ${id}`)
    if (!window.confirm(`Delete InstantButton '${name}'?`)) return

    deleteButton({ id })
    // this.send({type: 'removeButton', channel: this.channel, id})
    toast(`Deleted '${name}'.`, { type: 'error' })
  }

  play = () => {
    const { src } = this.props
    console.log('Play:', src)
    const sound = new Howl({ src: [src] })
    sound.play()
  }

  render() {
    const { id, name, src, channel } = this.props
    const shareUrl = `https://instabuddy.herokuapp.com/channel/${channel}/play/${id}`
    const backgroundColor = getRandomColor()
    return (
      <Wrapper
        style={{ backgroundColor }}
        onClick={this.play}
        className="slide-in-top"
      >
        <p>{name}</p>

        <Actions>
          <i
            title="Download"
            onClick={event => this.download(event, { channel, id, src })}
          >
            💾
          </i>

          <Clipboard data-clipboard-text={shareUrl} component="a">
            <i title="Share" data-clipboard-text={shareUrl}>
              🔗
            </i>
          </Clipboard>

          <i title="Delete" onClick={event => this.delete(event)}>
            ⌫
          </i>
        </Actions>
      </Wrapper>
    )
  }
}
