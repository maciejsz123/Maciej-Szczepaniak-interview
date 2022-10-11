import React, { Component } from 'react';
import './categoryName.sass';
import { connect } from 'react-redux';

class CategoryName extends Component {

  render() {
    if(!this.props.activeCategory) {
      return <div>Loading...</div>
    }
    return (
      <div className='title-box'>
        <span>
          {this.props.activeCategory.charAt(0).toUpperCase() + this.props.activeCategory.slice(1)}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCategory: state.main.activeCategory
})

export default connect(mapStateToProps)(CategoryName);
