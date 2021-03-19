import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import NavBar from './navbar/NavBar'
import Dashboard from './dashboard/Dashboard'
import Listing from './listing/Listing'
import View from './view/View'

function App () {
  // TODO: add regex validation to routes
  return (
    <BrowserRouter>
      <>
        <NavBar />
        <Route path='/' exact>
          <Dashboard />
        </Route>
        <Route path='/listing'>
          <Listing />
        </Route>
        <Route path='/view'>
          <View />
        </Route>
      </>
    </BrowserRouter>
  )
}

export default App
