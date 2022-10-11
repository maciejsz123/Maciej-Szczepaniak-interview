import React, { Component } from 'react';
import { connect } from 'react-redux';
import cart from '../../../images/Empty Cart.png';

class CartIcon extends Component {

  render() {
    return (
      <div className='cart-icon-container'>
        <img src={cart} alt='cart' id='cart-icon' className='cart-img-size'/>
        {
          this.props.itemsInBag ?
          <div className='cart-items' id='cart-icon'>
            <div id='cart-icon'>{this.props.itemsInBag}</div>
          </div> : ''
        }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  itemsInBag: state.main.itemsInBag
})

export default connect(mapStateToProps)(CartIcon);
