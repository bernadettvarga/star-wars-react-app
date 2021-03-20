import { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import NavBar from './navbar/NavBar'
import Dashboard from './dashboard/Dashboard'
import Listing from './listing/Listing'
import View from './view/View'

function App () {
  const defaultEntity = getEntityFromLocation(window.location)
  const [entity, setEntity] = useState(defaultEntity)

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
            entity={entity}
            setEntity={setEntity}
            getEntityFromLocation={getEntityFromLocation}
          />
        </Route>
        <Route path='/view'>
          <View />
        </Route>
      </div>
    </BrowserRouter>
  )

  // *********************************

  function getEntityFromLocation (location) {
    const rgx = /planets|starships|vehicles|people|films|species/
    const match = location.pathname.match(rgx)
    if (match) return match[0]
    return ''
  }
}

export default App
