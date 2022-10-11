import React, { Component } from 'react';
import { connect } from 'react-redux';
import './currencyDisplay.sass';

class CurrencyDisplay extends Component {
  render() {
    return (
      <div>
      {
        this.props.prices.filter( price => price.currency.label === this.props.currency.label)
        .map( (price, i) => (
          <div key={i}>
            <span className={`${(this.props.style === 'PDP' || this.props.style === 'cart') ? 'currency-cart-text' : 'currency-display-text'}`}>{price.currency.symbol}{price.amount.toFixed(2)}</span>
          </div>
        ))
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.main.currency
})

export default connect(mapStateToProps)(CurrencyDisplay);
