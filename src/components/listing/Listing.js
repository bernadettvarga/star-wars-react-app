import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Header from '../common/Header'
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
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(function setItemCountOnDataChange () {
    if (data.count) {
      setItemCount(data.count)
    }
  }, [data])

  useEffect(function setPageAndSearchOnLocationChange () {
    if (endpoint) {
      const page = Number(getPageFromLocation(location))
      setPage(page)

      const newSearchQuery = getSearchQueryFromLocation(location)
      if (newSearchQuery !== searchQuery) {
        setSearchQuery(newSearchQuery)
      }
    }
  }, [endpoint])

  return (
    <div>
      <Header entity={entity} />
      {(loading) && <p>Loading...</p>}
      {(!loading && error) && <p>Oops, an error occured.</p>}
      {(!loading && !error && data.results?.length === 0) && <p>No results found.</p>}
      {(!loading && !error && data.results?.length > 0) &&
        <Container>
          <CardContainer
            results={data.results}
          />
          <PaginationContainer
            activePage={page}
            pageCount={Math.ceil(itemCount / 10)}
            entity={entity}
            searchQuery={searchQuery}
          />
        </Container>}
    </div>
  )

  // *****************************************

  function getPageFromLocation (location) {
    const state = 'page'
    const regex = /page=(?<page>\d+)/
    const defaultValue = 1

    return getStateFromLocation({
      state,
      regex,
      defaultValue,
      location
    })
  }

  function getSearchQueryFromLocation (location) {
    const state = 'searchQuery'
    const regex = /search=(?<searchQuery>.*)/
    const defaultValue = ''

    return getStateFromLocation({
      state,
      regex,
      defaultValue,
      location
    })
  }
}
