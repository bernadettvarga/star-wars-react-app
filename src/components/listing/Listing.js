import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Title from '../common/Title'
import swapi from '../../api/swapi'

export default function Listing (props) {
  const {
    endpoint,
    setEndpoint,
    getEndpointFromLocation,
    getStateFromLocation
  } = props

  const [results, setResults] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [entity, setEntity] = useState(getEntityFromLocation(window.location))
  const [page, setPage] = useState(getPageFromLocation(window.location))

  const history = useHistory()

  useEffect(function setEndpointOnFirstRender () {
    setEndpoint(getEndpointFromLocation(window.location))
  }, [])

  useEffect(function updateStatesOnLocationChange () {
    return history.listen((location) => {
      setEndpoint(getEndpointFromLocation(location))
      setEntity(getEntityFromLocation(location))
      setPage(getPageFromLocation(location))
    })
  }, [history])

  useEffect(function setResultsOnLocationChange () {
    async function callSwapi () {
      try {
        setLoading(true)
        const { data } = await swapi.get(`/${endpoint}`)
        setResults(data.results)
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
        <Container fluid>
          <p>page: {page}</p>
          <Row xs={2} sm={5}>
            {renderItems()}
          </Row>
        </Container>}
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

  function renderItems () {
    return results.map((item) => renderCard(item))

    function renderCard (item) {
      return (
        <Col key={item.name || item.title}>{item.name || item.title}</Col>
      )
    }
  }
}
