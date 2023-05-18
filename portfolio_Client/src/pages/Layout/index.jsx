import React from 'react'
import PrimaryNavBar from '../../components/PrimaryNavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <PrimaryNavBar />
      <Outlet />
    </>
  )
}

export default Layout