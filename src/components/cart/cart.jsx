import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartProductElement from '../cartProductElement/cartProductElement';
import './cart.sass';
import { orderItems } from '../../redux/actions/cart';

class Cart extends Component {
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
      <div className='padding'>
        <p className='title-text'>CART</p>
        <p className='line'/>
        {this.props.cart.map( (cartElem, i) => (
          <div key={i}>
            <CartProductElement cartElem={cartElem}/>
            <p className='line'/>
          </div>
        ))}
        <div className='grid'>
          <div className='tax-title'>Tax 21%:</div>
          <div className='tax-amount'>{this.props.currency.symbol}{(total * 21/100).toFixed(2)}</div>
          <div className='quantity-title'>Quantity:</div>
          <div className='quantity-amount'>{this.props.itemsInBag}</div>
          <div className='total-title'>Total:</div>
          <div className='total-amount'>{this.props.currency.symbol}{total}</div>
          <div className='grid-button'><button type='button' className='add-to-cart-btn' style={{fontSize: '14px'}} onClick={this.props.orderItems}>order</button></div>
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

export default connect(mapStateToProps, { orderItems })(Cart);
