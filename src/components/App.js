import { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import './App.scss'
import NavBar from './navbar/NavBar'
import Dashboard from './dashboard/Dashboard'
import ContentWrapper from './ContentWrapper'

function App () {
  const defaultEntity = getEntityFromLocation(window.location)
  const [entity, setEntity] = useState(defaultEntity)

  // TODO: add regex validation to routes

  return (
    <BrowserRouter>
      <div>
        <NavBar entity={entity} />
        <div className='swa-content'>
          <Route path='/' exact>
            <Dashboard />
          </Route>
          <Route path={['/listing', '/view']}>
            <ContentWrapper
              entity={entity}
              setEntity={setEntity}
              getEntityFromLocation={getEntityFromLocation}
              getStateFromLocation={getStateFromLocation}
            />
          </Route>
        </div>
      </div>
    </BrowserRouter>
  )

  // *********************************

  function getEntityFromLocation (location) {
    const state = 'entity'
    const regex = /(?<entity>planets|starships|vehicles|people|films|species)/
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
