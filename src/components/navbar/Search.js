import React from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'

export default function Search ({ entity }) {
  return (
    <Form inline>
      <FormControl type='text' placeholder={`Search for ${entity}`} className='mr-sm-2' />
      <Button variant='outline-success'>Search</Button>
    </Form>
  )
}
