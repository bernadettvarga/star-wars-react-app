import { useState, useEffect } from 'react'
import { Route, useHistory, useLocation } from 'react-router-dom'

import swapi from '../api/swapi'
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
  const [data, setData] = useState({})

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

  useEffect(function callApiOnEndpointChange () {
    async function callApiAndSetStates () {
      try {
        setLoading(true)
        const { data } = await swapi.get(`/${endpoint}`)
        setData(data)
        setError(false)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (endpoint) {
      callApiAndSetStates()
    }
  }, [endpoint])

  return (
    <div>
      <Route path='/listing'>
        <Listing
          data={data}
          endpoint={endpoint}
          entity={entity}
          error={error}
          loading={loading}
          getStateFromLocation={getStateFromLocation}
        />
      </Route>
      <Route path='/view'>
        <View
          data={data}
          entity={entity}
          error={error}
          loading={loading}
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
