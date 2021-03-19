import { useState, useEffect } from 'react'
import Title from '../common/Title'
import swapi from '../../api/swapi'

export default function Listing () {
  const [entity, setEntity] = useState(getEntityFromUrl())
  const [results, setResults] = useState([])

  useEffect(function setEntityonLocationChange () {
    setEntity(getEntityFromUrl())
  }, [window.location.pathname])

  useEffect(function setResultsOnEntityChange () {
    async function callSwapi () {
      try {
        const { data } = await swapi.get(`/${entity}`)
        setResults(data.results)
      } catch (err) {
        // TODO: set an error state
        console.log(err)
      }
    }

    callSwapi()
  }, [entity])

  return (
    <div>
      <Title name={entity} />
      <p>{results.length}</p>
    </div>
  )

  // ***********************************

  function getEntityFromUrl () {
    const location = window.location.pathname
    // TODO: specify the regex more to only accept the valid entities
    const match = location.match(/\/listing\/(?<entity>[a-z]+)[/]?/)
    return match.groups.entity
  }
}
