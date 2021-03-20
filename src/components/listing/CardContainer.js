import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function CardContainer ({ results, page }) {
  return (
    <Container fluid>
      <p>page: {page}</p>
      <Row xs={2} sm={5}>
        {renderItems()}
      </Row>
    </Container>
  )

  // ***********************

  function renderItems () {
    return results.map((item) => renderCard(item))

    function renderCard (item) {
      return (
        <Col key={item.name || item.title}>{item.name || item.title}</Col>
      )
    }
  }
}
