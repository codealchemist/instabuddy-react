import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import Background from 'components/Background'
import ChannelPage from 'pages/ChannelPage'

const App = () => (
  <Provider store={store}>
    <Background />

    <Router>
      <>
        <Route path="/channel/:channelId" exact component={ChannelPage} />
      </>
    </Router>
  </Provider>
)

export default App
