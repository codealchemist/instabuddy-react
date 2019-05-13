import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
`
export default class Channel extends React.PureComponent {
  render () {
    const { id, buttons } = this.props
    console.log(buttons)
    return (
      <Wrapper>
        {buttons.map(button => (
          <div key={button.id}>{button.name}</div>
        ))}
      </Wrapper>
    )
  }
}
