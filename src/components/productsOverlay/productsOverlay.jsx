import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { connect } from 'react-redux';
import ProductElement from '../productElement/productElement';
import './productsOverlay.sass';

const GET_PRODUCTS = gql`
  {
    __typename @skip(if: true)
    categories {
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

class ProductsOverlay extends Component {

  render() {
    return (
      <div className='products-flex'>
        <Query query={GET_PRODUCTS}>
          {( { loading, data} ) => {
            if(loading) return 'loading...';
            const { categories } = data;
            let path = window.location.pathname.substring(10,50);

            return categories.filter(category => {
              if(!path) {
                return category.name[0]
              } else {
                return category.name === path
              }
            })[0].products
            .map( product => <ProductElement key={product.id} data={product} / > );
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.main.activeCategory
})

export default connect(mapStateToProps)(ProductsOverlay);
