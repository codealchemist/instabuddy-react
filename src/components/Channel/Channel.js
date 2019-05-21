import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button'
import AddButton from 'components/AddButton'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`
export default class Channel extends React.PureComponent {
  render () {
    const { id, buttons, deleteButton } = this.props
    console.log(buttons)
    return (
      <Wrapper>
        {buttons.map((button, i) => (
          <Button
            key={`${button.id}-${i}`}
            id={button.id}
            name={button.name}
            src={button.src}
            channel={id}
            deleteButton={deleteButton}
          />
        ))}

        <AddButton />
      </Wrapper>
    )
  }
}
