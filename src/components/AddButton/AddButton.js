import React from 'react'
import styled from 'styled-components'

import { Wrapper } from 'components/Button'
import LoadingButton from 'components/LoadingButton'

const AddWrapper = styled(Wrapper)`
  font-size: 35px;
  color: #eee;
  background: black;
  border: 1px solid #eee;
`

export default class AddButton extends React.PureComponent {
  render () {
    return (
      <AddWrapper className="blink">
        <p>+</p>
        <LoadingButton />
      </AddWrapper>
    )
  }
}
