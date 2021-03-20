import { useState, useEffect } from 'react'

import swapi from '../../api/swapi'
import Title from '../common/Title'

export default function View ({ entity, endpoint }) {
  const [result, setResult] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

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
    <Title name={result.name || result.title} />
  )
}
