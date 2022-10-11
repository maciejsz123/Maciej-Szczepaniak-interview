import React, { Component } from 'react';
import Currency from './currency';
import CartIcon from './cartIcon';
import './actions.sass';

class Actions extends Component {

  render() {
    return (
      <div className='header-actions'>
        <Currency />
        <CartIcon />
      </div>
    );
  }
}

export default Actions;
