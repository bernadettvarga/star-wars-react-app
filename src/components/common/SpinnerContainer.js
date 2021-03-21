import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function SpinnerContainer () {
  return (
    <div className='spinner-container'>
      <Spinner animation='border' role='status' variant='light' />
      <span>Loading..</span>
    </div>
  )
}
