import React from 'react';
import Navbar from './Home/Navbar.jsx';
import {Outlet} from "react-router-dom";
function Layout(){
    return (
        <>
          <Navbar/>
          <Outlet />
        </>
    );

}
export default Layout;