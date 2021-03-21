import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CardContainer ({ results }) {
  return (
    <Container fluid>
      <Row xs={2} sm={5}>
        {renderItems()}
      </Row>
    </Container>
  )

  // ***********************

  function renderItems () {
    return results.map((item) => renderCard(item))

    function renderCard (item) {
      const path = item.url.match(/^http:\/\/swapi\.dev\/api\/(?<endpoint>.*$)/)
      const fullPath = `/view/${path?.groups.endpoint}`

      return (
        <Link key={item.name || item.title} to={fullPath}>
          <Col>
            <Card body>{item.name || item.title}</Card>
          </Col>
        </Link>
      )
    }
  }
}
