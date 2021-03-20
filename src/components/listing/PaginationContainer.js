import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function PaginationContainer ({ activePage, pageCount }) {
  return renderPagination()

  // *********************************

  function renderPagination () {
    const pages = []

    for (let page = 1; page <= pageCount; page++) {
      pages.push(
        <Pagination.Item key={page} active={page === activePage}>
          {page}
        </Pagination.Item>
      )
    }

    return (<Pagination>{pages}</Pagination>)
  }
}
