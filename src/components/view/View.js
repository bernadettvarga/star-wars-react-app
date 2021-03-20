import { useState, useEffect } from 'react'

import swapi from '../../api/swapi'
import Title from '../common/Title'

export default function View (props) {
  const {
    endpoint,
    entity,
    error,
    setError,
    loading,
    setLoading
  } = props

  const [result, setResult] = useState({})

  useEffect(function setResultsOnLocationChange () {
    async function callSwapi () {
      try {
        setLoading(true)
        const { data } = await swapi.get(`/${endpoint}`)
        setResult(data)
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
      {(loading) && <p>Loading...</p>}
      {(!loading && error) && <p>Oops, an error occured.</p>}
      {(!loading && !error) && <Title name={result.name || result.title} />}
    </div>
  )
}
