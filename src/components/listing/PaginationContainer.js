import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function PaginationContainer (props) {
  const {
    activePage,
    pageCount,
    entity,
    searchQuery
  } = props

  return renderPagination()

  // *********************************

  function renderPagination () {
    const pages = []

    for (let page = 1; page <= pageCount; page++) {
      pages.push(
        <Pagination.Item key={page} active={page === activePage}>
          <Link to={getPath(page)}>
            {page}
          </Link>
        </Pagination.Item>
      )
    }

    return (<Pagination>{pages}</Pagination>)

    // *********************************

    function getPath (page) {
      const searchParam = (searchQuery) ? `&search=${searchQuery}` : ''
      return `/listing/${entity}/?page=${page}${searchParam}`
    }
  }
}
