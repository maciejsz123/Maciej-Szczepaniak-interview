import React, { Component } from 'react';
import CategoryName from '../categoryName/categoryName';
import ProductsOverlay from '../productsOverlay/productsOverlay';
import './mainPage.sass';

class MainPage extends Component {

  render() {
    return (
      <div className='main-page-container'>
        <CategoryName />
        <ProductsOverlay />
      </div>
    );
  }
}

export default MainPage;
