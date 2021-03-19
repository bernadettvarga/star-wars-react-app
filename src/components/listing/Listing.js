import { useState, useEffect } from 'react'
import Title from '../common/Title'

export default function Listing () {
  const [entity, setEntity] = useState(getEntityFromUrl())

  useEffect(function onLocationChange () {
    setEntity(getEntityFromUrl())
  }, [window.location.pathname])

  return (
    <div>
      <Title name='Listing' />
      <p>{entity}</p>
    </div>
  )

  // ***********************************

  function getEntityFromUrl () {
    const location = window.location.pathname
    const match = location.match(/\/listing\/(?<entity>[a-z]+)[/]?/)
    return match.groups.entity
  }
}
