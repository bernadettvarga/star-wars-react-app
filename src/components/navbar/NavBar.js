import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Search from './Search'
import logo from '../../img/logo.png'

export default function NavBar ({ entity }) {
  return (
    <Navbar variant='dark' expand='lg' className='navigation-bar'>
      <Navbar.Brand as={Link} to='/'>
        <img
          src={logo}
          height='30'
          className='d-inline-block align-top'
          alt='Star Wars App'
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='main-navigation' />
      <Navbar.Collapse id='main-navigation'>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
          <Nav.Link as={Link} to='/listing/planets/'>Planets</Nav.Link>
          <Nav.Link as={Link} to='/listing/starships/'>Starships</Nav.Link>
          <Nav.Link as={Link} to='/listing/vehicles/'>Vehicles</Nav.Link>
          <Nav.Link as={Link} to='/listing/people/'>People</Nav.Link>
          <Nav.Link as={Link} to='/listing/films/'>Films</Nav.Link>
          <Nav.Link as={Link} to='/listing/species/'>Species</Nav.Link>
          <Nav.Link href='https://github.com/bernadettvarga' target='_blank'>
            <i class='bi-github' />
          </Nav.Link>
        </Nav>
        {(entity) && <Search entity={entity} />}
      </Navbar.Collapse>
    </Navbar>
  )
}
