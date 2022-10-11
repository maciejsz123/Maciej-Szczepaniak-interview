import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { Link } from 'react-router-dom';
import './navigation.sass';
import { setCategory } from '../../../redux/actions/setActiveCategory';

const GET_DATA = gql`
  {
    categories{
      name
    }
  }
`;

class Navigation extends Component {

  render() {
    return (

      <div className='header-navigation'>
        <Query query={GET_DATA}>
          {( { loading, data} ) => {
            if(loading) return 'loading...';
            const { categories } = data;

            if(!this.props.activeCategory) {
              this.props.setCategory(window.location.pathname.substring(10, 50) || categories[0].name)
            }

            return categories.map( (category, i) => (
              <Link key={i} to={`/category/${category.name}`} onClick={this.props.setCategory}>
                <button className={`navigation-element nav-elem-${this.props.activeCategory === category.name ? 'active' : 'inactive'}`}>
                  {category.name}
                </button>
              </Link>
          ));
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCategory: state.main.activeCategory
})

export default connect(mapStateToProps, { setCategory })(Navigation);
