import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartProductElement from '../cartProductElement/cartProductElement';
import './cartOverlay.sass';
import { addItemToCart, changeItemAttributes, orderItems } from '../../redux/actions/cart';

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.countTotal = this.countTotal.bind(this);
  }

  countTotal() {
    return this.props.cart.reduce( (sum, elem) => sum + elem.counter * elem.item.prices.filter(price => price.currency.label === this.props.currency.label)[0].amount, 0).toFixed(2);
  }

  render() {
    const total = this.countTotal();
    return (
      <div className='inactive-cart-overlay' id='cart-overlay'>
        <div>
          <span className='cart-overlay-title'>My Bag,</span>
          <span className='cart-overlay-title-2'> {this.props.itemsInBag} {this.props.itemsInBag === 1 ? 'item' : 'items'}</span>
        </div>
        {this.props.cart.map( (cartElem, i) => (
          <CartProductElement key={i} cartElem={cartElem} overlay={true}/>
        ))}
        <div className='d-flex-row space-between' style={{margin: '30px 0'}}>
          <div className='total-text'>Total:</div>
          <div className='total-price'>{this.props.currency.symbol}{total}</div>
        </div>
        <div className='d-flex-row space-between'>
          <Link to='/cart' className='cart-overlay-button'>VIEW BAG</Link>
          <button type='button' onClick={this.props.orderItems} className='cart-overlay-button green-button'>CHECK OUT</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.main.cart,
  itemsInBag: state.main.itemsInBag,
  currency: state.main.currency
})

export default connect(mapStateToProps, { addItemToCart, changeItemAttributes, orderItems })(CartOverlay);
