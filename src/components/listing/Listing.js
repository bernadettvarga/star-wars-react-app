import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Title from '../common/Title'
import swapi from '../../api/swapi'

export default function Listing ({ entity, setEntity, getEntityFromLocation }) {
  const [results, setResults] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  useEffect(function setEntityOnFirstRender () {
    setEntity(getEntityFromLocation(window.location))
  }, [])

  useEffect(function setEntityOnLocationChange () {
    return history.listen((location) => {
      setEntity(getEntityFromLocation(location))
    })
  }, [history])

  useEffect(function setResultsOnEntityChange () {
    async function callSwapi () {
      try {
        setLoading(true)
        const { data } = await swapi.get(`/${entity}`)
        setResults(data.results)
        setError(false)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (entity) {
      callSwapi()
    }
  }, [entity])

  return (
    <div>
      <Title name={entity} />
      {(loading) && <p>Loading...</p>}
      {(!loading && error) && <p>Oops, an error occured.</p>}
      {(!loading && !error && results.length === 0) && <p>No results found.</p>}
      {(!loading && !error && results.length > 0) &&
        <Container fluid>
          <Row xs={2} sm={5}>
            {renderItems()}
          </Row>
        </Container>}
    </div>
  )

  // *****************************************

  function renderItems () {
    return results.map((item) => renderCard(item))

    function renderCard (item) {
      return (
        <Col key={item.name || item.title}>{item.name || item.title}</Col>
      )
    }
  }
}
