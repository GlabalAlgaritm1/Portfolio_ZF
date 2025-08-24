import React from 'react'
// Layout
import Layout from '../src/Layout/Layout'
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router'
import Home from './Pages/Home'
import PNF from './Pages/PNF'
import Abaut from './Pages/Abaut'
import Projects from './Pages/Projects'
import Contact from './Pages/Contact'

const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route element={<Layout />}>

          <Route path='/' element={<Home />} />
          <Route path='/About' element={<Abaut />} />
          <Route path='/Projects' element={<Projects />} />
          <Route path='/Contact' element={<Contact />} />

        </Route>
        <Route path='*' element={<PNF/>}/>
      </>
    ))
  return (
    <RouterProvider router={routes} />
  )
}

export default App