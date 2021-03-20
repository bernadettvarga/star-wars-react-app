import { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import NavBar from './navbar/NavBar'
import Dashboard from './dashboard/Dashboard'
import Listing from './listing/Listing'
import View from './view/View'

function App () {
  const [endpoint, setEndpoint] = useState(getEndpointFromLocation(window.location))

  // TODO: add regex validation to routes

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Route path='/' exact>
          <Dashboard />
        </Route>
        <Route path='/listing'>
          <Listing
            endpoint={endpoint}
            setEndpoint={setEndpoint}
            getEndpointFromLocation={getEndpointFromLocation}
            getStateFromLocation={getStateFromLocation}
          />
        </Route>
        <Route path='/view'>
          <View />
        </Route>
      </div>
    </BrowserRouter>
  )

  // *********************************

  function getEndpointFromLocation (location) {
    const state = 'endpoint'
    const regex = /\/listing\/(?<endpoint>.*)/
    const defaultValue = ''

    return getStateFromLocation({
      state,
      regex,
      defaultValue,
      location
    })
  }

  function getStateFromLocation ({ state, regex, defaultValue, location }) {
    const match = `${location.pathname}${location.search}`.match(regex)
    return match?.groups[state] || defaultValue
  }
}

export default App
