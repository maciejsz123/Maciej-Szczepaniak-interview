import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import CartOverlay from '../cartOverlay/cartOverlay';
import Navigation from './navigation/navigation';
import './navbar.sass';
import Logo from './logo/logo';
import Actions from './actions/actions';

class Navbar extends Component {
  render() {
    return (
      <div className='p-relative'>
        <div className='navbar'>
          <Navigation />
          <Logo />
          <Actions />
        </div>
        <CartOverlay />
        <div id='grey-background'></div>

        <Outlet />
      </div>
    );
  }
}

export default Navbar;
