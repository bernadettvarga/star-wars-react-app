import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

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
        <LinkContainer key={page} to={getPath(page)}>
          <Pagination.Item active={page === activePage}>
            {page}
          </Pagination.Item>
        </LinkContainer>
      )
    }

    return (
      <Pagination className='pagination-container'>
        {pages}
      </Pagination>
    )

    // *********************************

    function getPath (page) {
      const searchParam = (searchQuery) ? `&search=${searchQuery}` : ''
      return `/listing/${entity}/?page=${page}${searchParam}`
    }
  }
}
