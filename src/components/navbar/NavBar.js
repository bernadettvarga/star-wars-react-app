import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavBar () {
  return (
    <Navbar bg='light' expand='lg'>
      <Nav.Link as={Link} to='/'>Home</Nav.Link>
      <Navbar.Toggle aria-controls='main-navigation' />
      <Navbar.Collapse id='main-navigation'>
        <Nav className='mr-auto'>
          <NavDropdown title='Listing' id='listing-dropdown'>
            <NavDropdown.Item as={Link} to='/listing/planets'>Planets</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/listing/starships'>Starships</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/listing/vehicles'>Vehicles</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/listing/people'>People</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/listing/films'>Films</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/listing/species'>Species</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href='https://github.com/bernadettvarga' target='_blank'>Github</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button variant='outline-success'>Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}
