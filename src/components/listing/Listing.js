import { useState, useEffect } from 'react'
import Title from '../common/Title'
import swapi from '../../api/swapi'

export default function Listing () {
  const [entity, setEntity] = useState(getEntityFromUrl())
  const [results, setResults] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(function setEntityonLocationChange () {
    setEntity(getEntityFromUrl())
  }, [window.location.pathname])

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

    callSwapi()
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

  // ***********************************

  function getEntityFromUrl () {
    const location = window.location.pathname
    const entity = location.match(/planets|starships|vehicles|people|films|species/)
    return entity[0]
  }
}
