import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { Interweave } from 'interweave';
import { connect } from 'react-redux';
import CurrencyDisplay from '../currencyDisplay/currencyDisplay';
import './PDP.sass';
import { addItemToCart } from '../../redux/actions/cart';

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      activeImg: 0,
      activeAttributes: {}
    }
    this.setActiveImg = this.setActiveImg.bind(this);
    this.setActiveAttribute = this.setActiveAttribute.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    const PRODUCT = gql`{
      product(id: "${window.location.pathname.substring(9,50)}") {
        __typename @skip(if: true)
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          __typename @skip(if: true)
          id
          name
          type
          items {
            __typename @skip(if: true)
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
  }`;
  this.setState({product: PRODUCT})
  }

  setActiveImg(number) {
    this.setState({activeImg: number})
  }

  setActiveAttribute(attribute, value) {
    this.setState({activeAttributes: {...this.state.activeAttributes, [attribute]: value}});
  }

  addItem(product) {
    this.props.addItemToCart(product, this.state.activeAttributes);
    this.setState({activeAttributes: {}})
  }

  render() {
    if(!this.state.product) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>

      <Query query={this.state.product}>
        {( { loading, data} ) => {
          if(loading) return 'loading...';
          const { product } = data;

          return (
            <div className='container'>
              <div className='d-flex'>
                <div className='gallery-PDP'>
                  {product.gallery.map( (img, i) => <img key={img} src={img} alt='img' className='gallery-img' onClick={() => this.setActiveImg(i)}/>)}
                </div>
                <div className='full-img-DPD'>
                  <img src={product.gallery[this.state.activeImg]} alt='PRODUCT'/>
                </div>
                <div className='description-DPD'>
                  <div>
                    <div className='brand-name'>
                      {product.brand}
                    </div>
                    <div className='product-name'>
                      {product.name}
                    </div>
                    <div style={{marginBottom: '15px'}}>
                      {product.attributes.map( attribute => (
                        <div key={attribute.id}>
                          <div className='attribute-name'>
                            {attribute.name}:
                          </div>
                          <div className='d-flex'>
                            {attribute.items.map( item => (
                              attribute.type === 'swatch' ?
                              <div key={item.id} className={`attribute-item ${this.state.activeAttributes[attribute.id] === item.value ? 'active-attribute-color-item' : ''}`} style={{backgroundColor: item.value}} onClick={() => this.setActiveAttribute(attribute.id, item.value)}></div>
                              :
                              <div key={item.id} className={`attribute-item ${this.state.activeAttributes[attribute.id] === item.value ? 'active-attribute-type-item' : ''}`} onClick={() => this.setActiveAttribute(attribute.id, item.value)}>{item.value}</div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className='price-text'>PRICE:</p>
                    <CurrencyDisplay prices={product.prices} styleType={'PDP'}/>
                  </div>
                  <div className='button-div-PDP'>
                    {
                      product.inStock ?
                      <button type='button' className='add-to-cart-btn' disabled={!(product.attributes.length === Object.keys(this.state.activeAttributes).length) || !product.inStock} onClick={() => this.addItem(product)}>add to cart</button>
                      : <div>Product is out of stock</div>
                    }
                  </div>
                  <div className='description'>
                    <Interweave content={product.description} />
                  </div>
                </div>
              </div>
            </div>
          )
        }}

      </Query>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {addItemToCart})(PDP);
