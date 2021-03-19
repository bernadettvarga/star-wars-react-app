import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Title from '../common/Title'
import swapi from '../../api/swapi'

export default function Listing (props) {
  const [entity, setEntity] = useState(getEntityFromLocation(useLocation()))
  const [results, setResults] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const history = useHistory()

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
      {(!loading && !error && results.length > 0) && <p>{results.length}</p>}
    </div>
  )

  // *******************

  function getEntityFromLocation (location) {
    const rgx = /planets|starships|vehicles|people|films|species/
    const match = location.pathname.match(rgx)
    if (match) return match[0]
    return ''
  }
}
