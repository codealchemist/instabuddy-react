import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Howler } from 'howler'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import store from './store'
import Background from 'components/Background'
import ChannelPage from 'pages/ChannelPage'

const ToastWrapper = styled.div`
  .instabuddy-toast {
    background: black;
    color: #eee;
  }

  button {
    color: #eee;
  }
`

const App = () => (
  <Provider store={store}>
    <Background />
    <ToastWrapper>
      <ToastContainer toastClassName="instabuddy-toast" />
    </ToastWrapper>

    <Router>
      <>
        <Route path="/channel/:channelId" exact component={ChannelPage} />
      </>
    </Router>
  </Provider>
)

export default App
