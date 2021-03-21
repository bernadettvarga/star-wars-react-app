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
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(function setStatesOnFirstRender () {
    const endpoint = getEndpointFromLocation(location)
    const entity = getEntityFromLocation(location)

    setEndpoint(endpoint)
    setEntity(entity)
  }, [])

  useEffect(function updateEndpointOnLocationChange () {
    return history.listen((location) => {
      const endpoint = getEndpointFromLocation(location)

      setEndpoint(endpoint)
    })
  }, [history])

  useEffect(function updateEntityOnEndpointChange () {
    const newEntity = getEntityFromLocation(location)

    if (newEntity !== entity) {
      setEntity(newEntity)
    }
  }, [endpoint])

  return (
    <div>
      <Route path='/listing'>
        <Listing
          endpoint={endpoint}
          entity={entity}
          error={error}
          setError={setError}
          loading={loading}
          setLoading={setLoading}
          getStateFromLocation={getStateFromLocation}
        />
      </Route>
      <Route path='/view'>
        <View
          endpoint={endpoint}
          entity={entity}
          error={error}
          setError={setError}
          loading={loading}
          setLoading={setLoading}
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
