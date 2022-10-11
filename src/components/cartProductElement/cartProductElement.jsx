import React, { Component } from 'react';
import { connect } from 'react-redux';
import CurrencyDisplay from '../currencyDisplay/currencyDisplay';
import './cartProductElement.sass';
import leftArrow from '../../images/left-arrow.png';
import { changeItemAttributes, increaseCounter, decreaseCounter } from '../../redux/actions/cart';

class CartProductElement extends Component {
  constructor() {
    super();
    this.state = {
      activeImg: 0
    }
    this.slide = this.slide.bind(this)
  }

  slide(direction, moveBy = 1) {
    let carousel = document.getElementById(`carousel-${this.props.cartElem.id}`);
    carousel.style.transition = '0.6s all';
    if(direction === 'left') {
      if(carousel.style.justifyContent === 'flex-end') {
        carousel.prepend(carousel.lastElementChild);
      }
      carousel.style.justifyContent = 'flex-start';
      if(this.state.activeImg === 0) {
        this.setState({activeImg: this.props.cartElem.item.gallery.length - 1 * moveBy})
      } else {
        this.setState({activeImg: this.state.activeImg - 1 * moveBy});
      }
        for(let i = 0; i < moveBy; i++) {
          carousel.prepend(carousel.lastElementChild);
        }
        carousel.style.transition = 'none';
        carousel.style.transform = `translate(${-100 * moveBy}%)`;

        setTimeout( () => {
          carousel.style.transition = '0.6s all';
          carousel.style.transform = `translate(0%)`;
        }, 20);


    } else {
      if(carousel.style.justifyContent === 'flex-start' || !carousel.style.justifyContent) {
        carousel.appendChild(carousel.firstElementChild);
      }
      carousel.style.justifyContent = 'flex-end';
      if(this.state.activeImg === this.props.cartElem.item.gallery.length - 1 * moveBy) {
        this.setState({activeImg: 0});
      } else {
        this.setState({activeImg: this.props.cartElem.item.gallery.length + 1 * moveBy});
      }
        carousel.style.transition = 'none';
        carousel.style.transform = `translate(${100 * moveBy}%)`;
        for(let i = 0; i < moveBy; i++) {
          carousel.appendChild(carousel.firstElementChild);
        }
        setTimeout( () => {
          carousel.style.transition = '0.6s all';
          carousel.style.transform = `translate(0%)`;
        }, 20);

    }
  }

  render() {    
    let gallery = <div></div>
    if(this.props.overlay) {
      gallery = (
        <div>
          <img src={this.props.cartElem.item.gallery[0]} alt="img" className='carousel-img overlay-img-size'/>
        </div>
      )
    } else {
      gallery = (
        <div className='d-flex-row'>
          <div className='carousel'>
            <div className='slider'>
              <div className='carousel-images' id={`carousel-${this.props.cartElem.id}`}>
                {this.props.cartElem.item.gallery.map( (item, i) => (
                  <div key={i} className='carousel-elem'>
                    <img src={item} alt={i} className='carousel-img'/>
                  </div>
                ))}
              </div>
              {this.props.cartElem.item.gallery.length === 1 ? '' :
                <div className='arrows'>
                  <div className='left-arrow'>
                    <img src={leftArrow} name='left' alt='<' onClick={() => this.slide('left')} />
                  </div>
                  <div className='right-arrow'>
                    <img src={leftArrow} name='right' alt='>' onClick={() => this.slide('right')} />
                  </div>
                </div>
              }

            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='d-flex-row space-between' style={{margin: '10px 0'}}>
        <div className='d-flex-column space-between'>
          <div className={this.props.overlay ? 'overlay-title' : 'cart-title'}>{this.props.cartElem.item.brand}</div>
          <div className={this.props.overlay ? 'overlay-title' : 'cart-item-name'}>{this.props.cartElem.item.name}</div>
          <CurrencyDisplay prices={this.props.cartElem.item.prices} style='cart' />
          <div>
            {
              this.props.cartElem.item.attributes.map( (attribute, i) => (
                <div key={i}>
                  <span className={this.props.overlay ? 'overlay-attribute-title' : 'cart-attribute-title'}>{attribute.name}:</span>
                  <div className='d-flex'>
                    {attribute.items.map( (item, i) => (
                      attribute.type === 'swatch' ?
                      <div key={i} className={`${this.props.cartElem.attributes[attribute.id] === item.value ? 'active-attribute-color-item' : ''} ${this.props.overlay ? 'overlay-attribute-color overlay-attribute' : 'cart-attribute'}`} style={{backgroundColor: item.value}}></div>
                      :
                      <div key={i} className={`${this.props.cartElem.attributes[attribute.id] === item.value ? 'active-attribute-type-item' : ''} ${this.props.overlay ? 'overlay-attribute' : 'cart-attribute'}`}>{item.value}</div>
                    ))}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='d-flex-row'>
          <div className='d-flex-column space-between align-items-center m-1'>
            <div className='counter-button' onClick={() => this.props.increaseCounter(this.props.cartElem)}>+</div>
            <div className={this.props.overlay ? 'overlay-counter' : 'cart-counter'}>{this.props.cartElem.counter}</div>
            <div className='counter-button' onClick={() => this.props.decreaseCounter(this.props.cartElem)}>-</div>
          </div>

          {gallery}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.main.currency,
  cart: state.main.cart
})

export default connect(mapStateToProps, { changeItemAttributes, increaseCounter, decreaseCounter })(CartProductElement);
