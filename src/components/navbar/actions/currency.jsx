import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { connect } from 'react-redux';
import './actions.sass';
import arrow from '../../../images/Vector.png';
import { setActiveCurrency } from '../../../redux/actions/currency';

class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: null
    }
  }

  componentDidMount() {
    const CURRENCIES = gql`
    {
        currencies {
          label
          symbol
        }
    }
    `;

    this.setState({currencies: CURRENCIES});
  }


  render() {
    if(!this.state.currencies) {
      return (
        <div>Loading</div>
      )
    }

    return (
      <div>
        <div className='currency-header'>
          <div className='currency-dropdown currency-click'>
            <div className='currency-click'>{this.props.currency.symbol}</div>
            <div className='d-flex currency-click'>
              <img src={arrow} alt='arrow' className='rotate-0 justify-center currency-click' id='currency-arrow'/>
            </div>
          </div>
          <div id='currency-switcher' className='inactive-currency-switcher'>
          <Query query={this.state.currencies}>
            {( { loading, data} ) => {
              if(loading) return 'loading...';

              const { currencies } = data;

              if(!this.props.currency) {
                this.props.setActiveCurrency(currencies[0]);
              }

              return currencies.map( currency =>(
                <div key={currency.label} className='currency-switcher-item' onClick={() => this.props.setActiveCurrency(currency)}>
                  {currency.symbol} {currency.label}
                </div>
              ))

            }}

          </Query>
          </div>
        </div>

      </div>
    );
  }
}

window.addEventListener('click', (clicked) => {
  const currencySwitcher = document.getElementById('currency-switcher');
  const currencyArrow = document.getElementById('currency-arrow');

  if(clicked.target.classList.contains('currency-click')) {
    currencySwitcher.classList.remove('inactive-currency-switcher')
    currencySwitcher.classList.add('active-currency-switcher');

    currencyArrow.classList.remove('rotate-0')
    currencyArrow.classList.add('rotate-180');
  } else {
    currencySwitcher.classList.add('inactive-currency-switcher')
    currencySwitcher.classList.remove('active-currency-switcher');

    currencyArrow.classList.add('rotate-0')
    currencyArrow.classList.remove('rotate-180');
  }

})

const mapStateToProps = (state) => ({
  currency: state.main.currency
})

export default connect(mapStateToProps, { setActiveCurrency })(Currency);
