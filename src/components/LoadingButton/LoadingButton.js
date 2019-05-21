import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
`

const OutterCircle = styled.div`
  background: #6a46fb;
  width: 100%;
  height: 50%;
  position: absolute;
  top: 0;
  margin: 0 1em 1em 0;
  border-top-left-radius: 300px;
  border-top-right-radius: 300px;
  z-index: 1;
`

const InnerCircle = styled.div`
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  position: absolute;
  background: black;
  border-radius: 50%;
  z-index: 10;
  left: 3px;
  top: 3px;
`

export default class LoadingButton extends React.PureComponent {
  render () {
    return (
      <Wrapper className="rotate">
        <OutterCircle />
        <InnerCircle />
      </Wrapper>
    )
  }
}
