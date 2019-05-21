import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  font-weight: 700;
  color: #111;
  font-size: 12vw;
  text-align: center;
  cursor: default;
`

export default class Background extends React.PureComponent {
  render () {
    return <Wrapper>InstaBuddy</Wrapper>
  }
}
