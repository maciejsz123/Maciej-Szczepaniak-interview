import React, { Component } from 'react';
import logo from '../../../images/Brand icon.png';

class Logo extends Component {
  render() {
    return (
      <div className='d-flex' style={{justifyContent: 'center', alignItems: 'center'}}>
        <img src={logo} alt='brand icon' style={{width: '41px', height: '41px'}}/>
      </div>
    );
  }
}

export default Logo;
