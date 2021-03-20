import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function PaginationContainer ({ activePage, pageCount, entity }) {
  return renderPagination()

  // *********************************

  function renderPagination () {
    const pages = []

    for (let page = 1; page <= pageCount; page++) {
      pages.push(
        <Pagination.Item key={page} active={page === activePage}>
          <Link to={`/listing/${entity}/?page=${page}`}>
            {page}
          </Link>
        </Pagination.Item>
      )
    }

    return (<Pagination>{pages}</Pagination>)
  }
}
