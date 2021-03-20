import { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import NavBar from './navbar/NavBar'
import Dashboard from './dashboard/Dashboard'
import Listing from './listing/Listing'
import View from './view/View'

function App () {
  const defaultEndpoint = getEndpointFromLocation(window.location)
  const [endpoint, setEndpoint] = useState(defaultEndpoint)

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
    const rgx = /\/listing\/(.*)/
    const match = `${location.pathname}${location.search}`.match(rgx)
    if (match) return match[1]
    return ''
  }
}

export default App
