import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CardContainer ({ results }) {
  return (
    <Container className='card-container'>
      <Row xs={2} sm={2}>
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
        <Col className='card-container__col'>
          <Link key={item.name || item.title} to={fullPath}>
            <div className='card-container__card'>
              {item.name || item.title}
            </div>
          </Link>
        </Col>
      )
    }
  }
}
