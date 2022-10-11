import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CurrencyDisplay from '../currencyDisplay/currencyDisplay'
import './productElement.sass';
import cart from '../../images/Empty Cart-white.png';
import { addItemToCart } from '../../redux/actions/cart';

class ProductElement extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
  }

  addItem(e, item) {
    this.props.addItemToCart(item);
    e.preventDefault();
  }

  render() {
    let outOfStock = this.props.data.inStock ? '' : <div className='out-of-stock'><div>OUT OF STOCK</div></div>
    return (
      <div className='product-card'>
          {outOfStock}
        <Link to={`/product/${this.props.data.id}`} style={{padding: '10px'}}>
            <div>
              <img src={this.props.data.gallery[0]} alt='prod' className='product-card-img'/>
              {this.props.data.inStock ? (
                <div className='hover'>
                  <div onClick={(e) => this.addItem(e, this.props.data)} className='add-to-cart-icon'>
                    <img src={cart} alt='cart'/>
                  </div>
                </div>
              ) : ''}
            </div>
            <div style={{margin: '10px 0'}}>
              <span className='product-element-name'>{this.props.data.name}</span>
              <CurrencyDisplay prices={this.props.data.prices}/>
            </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { addItemToCart })(ProductElement);
