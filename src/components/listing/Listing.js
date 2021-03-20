import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Title from '../common/Title'
import CardContainer from './CardContainer'
import PaginationContainer from './PaginationContainer'
import swapi from '../../api/swapi'

export default function Listing (props) {
  const {
    endpoint,
    setEndpoint,
    getEndpointFromLocation,
    getStateFromLocation
  } = props

  const defaultEntity = getEntityFromLocation(window.location)
  const defaultPage = Number(getPageFromLocation(window.location))

  const [results, setResults] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [entity, setEntity] = useState(defaultEntity)
  const [page, setPage] = useState(defaultPage)
  const [itemCount, setItemCount] = useState(0)

  const history = useHistory()

  useEffect(function setEndpointOnFirstRender () {
    const endpoint = getEndpointFromLocation(window.location)

    setEndpoint(endpoint)
  }, [])

  useEffect(function updateStatesOnLocationChange () {
    return history.listen((location) => {
      const endpoint = getEndpointFromLocation(location)
      const entity = getEntityFromLocation(location)
      const page = Number(getPageFromLocation(location))

      setEndpoint(endpoint)
      setEntity(entity)
      setPage(page)
    })
  }, [history])

  useEffect(function setResultsOnLocationChange () {
    async function callSwapi () {
      try {
        setLoading(true)
        const { data } = await swapi.get(`/${endpoint}`)
        setResults(data.results)
        setItemCount(Number(data.count))
        setError(false)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (endpoint) {
      callSwapi()
    }
  }, [endpoint])

  return (
    <div>
      <Title name={entity} />
      {(loading) && <p>Loading...</p>}
      {(!loading && error) && <p>Oops, an error occured.</p>}
      {(!loading && !error && results.length === 0) && <p>No results found.</p>}
      {(!loading && !error && results.length > 0) &&
        <div>
          <CardContainer
            results={results}
            page={page}
          />
          <PaginationContainer
            activePage={page}
            pageCount={Math.ceil(itemCount / 10)}
            entity={entity}
          />
        </div>}
    </div>
  )

  // *****************************************

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

  function getPageFromLocation (location) {
    const state = 'page'
    const regex = /\?page=(?<page>\d+)/
    const defaultValue = 1

    return getStateFromLocation({
      state,
      regex,
      defaultValue,
      location
    })
  }
}
