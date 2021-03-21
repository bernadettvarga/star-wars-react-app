import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Title from '../common/Title'
import CardContainer from './CardContainer'
import PaginationContainer from './PaginationContainer'

export default function Listing (props) {
  const {
    data,
    endpoint,
    entity,
    error,
    loading,
    getStateFromLocation
  } = props

  const location = useLocation()
  const defaultPage = Number(getPageFromLocation(location))

  const [page, setPage] = useState(defaultPage)
  const [itemCount, setItemCount] = useState(0)

  useEffect(function setItemCountOnDataChange () {
    if (data.count) {
      setItemCount(data.count)
    }
  }, [data])

  useEffect(function setPageOnLocationChange () {
    if (endpoint) {
      const page = Number(getPageFromLocation(location))
      setPage(page)
    }
  }, [endpoint])

  return (
    <div>
      <Title name={entity} />
      {(loading) && <p>Loading...</p>}
      {(!loading && error) && <p>Oops, an error occured.</p>}
      {(!loading && !error && data.results?.length === 0) && <p>No results found.</p>}
      {(!loading && !error && data.results?.length > 0) &&
        <div>
          <CardContainer
            results={data.results}
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
