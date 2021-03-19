import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import NavBar from './navbar/NavBar'
import Dashboard from './dashboard/Dashboard'
import Listing from './listing/Listing'
import View from './view/View'

function App () {
  return (
    <BrowserRouter>
      <>
        <NavBar />
        <Route path='/' exact component={Dashboard} />
        <Route path='/listing' component={Listing} />
        <Route path='/view' component={View} />
      </>
    </BrowserRouter>
  )
}

export default App
