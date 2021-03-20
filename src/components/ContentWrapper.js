import { useState, useEffect } from 'react'
import { Route, useHistory, useLocation } from 'react-router-dom'

import Listing from './listing/Listing'
import View from './view/View'

export default function ContentWrapper (props) {
  const {
    entity,
    setEntity,
    getEntityFromLocation,
    getStateFromLocation
  } = props

  const history = useHistory()
  const location = useLocation()

  const defaultEndpoint = getEndpointFromLocation(location)
  const [endpoint, setEndpoint] = useState(defaultEndpoint)

  useEffect(function setStatesOnFirstRender () {
    const endpoint = getEndpointFromLocation(location)
    const entity = getEntityFromLocation(location)

    setEndpoint(endpoint)
    setEntity(entity)
  }, [])

  useEffect(function updateStatesOnLocationChange () {
    return history.listen((location) => {
      const endpoint = getEndpointFromLocation(location)
      const entity = getEntityFromLocation(location)

      setEndpoint(endpoint)
      setEntity(entity)
    })
  }, [history])

  return (
    <div>
      <Route path='/listing'>
        <Listing
          endpoint={endpoint}
          entity={entity}
          getStateFromLocation={getStateFromLocation}
        />
      </Route>
      <Route path='/view'>
        <View
          endpoint={endpoint}
          entity={entity}
        />
      </Route>
    </div>
  )

  // ***********************

  function getEndpointFromLocation (location) {
    const state = 'endpoint'
    const regex = /\/(listing|view)\/(?<endpoint>.*)/
    const defaultValue = ''

    return getStateFromLocation({
      state,
      regex,
      defaultValue,
      location
    })
  }
}
