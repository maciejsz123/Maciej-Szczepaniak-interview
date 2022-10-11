import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { connect } from 'react-redux';
import ProductElement from '../productElement/productElement';
import './productsOverlay.sass';

class ProductsOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null
    }
  }

  componentDidMount() {
    const PRODUCTS = gql`
      {
        __typename @skip(if: true)
        category(input: {title: "${this.props.activeCategory}"}) {
          __typename @skip(if: true)
          name
          products {
            id
            __typename @skip(if: true)
            name
            inStock
            gallery
            description
            category
            attributes {
              id
              __typename @skip(if: true)
              name
              type
              items {
                value
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
        }
      }
    `;
  this.setState({products: PRODUCTS})
  }

  componentDidUpdate(prevProps) {
    if(this.props.activeCategory !== prevProps.activeCategory) {
      const PRODUCTS = gql`
        {
          __typename @skip(if: true)
          category(input: {title: "${this.props.activeCategory}"}) {
            __typename @skip(if: true)
            name
            products {
              id
              __typename @skip(if: true)
              name
              inStock
              gallery
              description
              category
              attributes {
                id
                __typename @skip(if: true)
                name
                type
                items {
                  value
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
          }
        }
      `;
      this.setState({products: PRODUCTS})
    }

  }

  render() {
    if(!this.props.activeCategory || !this.state.products) {
      return (<div>loading...</div>)
    }
    return (
      <div className='products-flex'>
        <Query query={this.state.products}>
          {( { loading, data} ) => {
            if(loading) return 'loading...';

            return data.category.products.map( product => <ProductElement key={product.id} data={product} / > );
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCategory: state.main.activeCategory
})

export default connect(mapStateToProps)(ProductsOverlay);
