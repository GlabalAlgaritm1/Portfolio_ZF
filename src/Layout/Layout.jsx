import React from 'react'
import Xeader from '../Components/Xeader'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <section className='bg-black text-white'>
        <Xeader/>
        <main>
            <Outlet/>
        </main>

    </section>
  )
}

export default Layout