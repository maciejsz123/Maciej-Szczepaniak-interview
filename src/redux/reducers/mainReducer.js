import { SET_ACTIVE_CATEGORY,
  ADD_ITEM_TO_CART, 
  DELETE_ITEM_FROM_CART,
  CHANGE_ITEM_ATTRIBUTES,
  SET_ACTIVE_CURRENCY,
  INCREASE_ITEM_COUNT,
  DECREASE_ITEM_COUNT,
  ORDER_ITEMS } from '../actions/types';

const initialState = {
  activeCategory: null,
  cart: [],
  itemsInBag: 0,
  currency: ''
};

export default function main(state = initialState, action) {
  switch(action.type) {
    case SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload
      }
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
        itemsInBag: state.itemsInBag + 1
      }
    case DELETE_ITEM_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter( cartElem => cartElem.id !== action.payload.id),
        itemsInBag: state.itemsInBag - action.payload.counter
      }
    case CHANGE_ITEM_ATTRIBUTES:
      var findItem = state.cart.find( elem => elem.id === action.payload.product.id)
      findItem.attributes[action.payload.attributeId] = action.payload.value

      return {
        ...state,
        cart: state.cart.map( cartElem => {
          if(cartElem.id === action.payload.product.id) {
            return findItem
          } else {
            return cartElem
          }
        })
      }
    case INCREASE_ITEM_COUNT:
      findItem = state.cart.find( elem => elem.id === action.payload.id)
      findItem.counter++;

      return {
        ...state,
        itemsInBag: state.itemsInBag + 1,
        cart: state.cart.map( cartElem => {
          if(cartElem.id === action.payload.id) {
            return findItem
          } else {
            return cartElem
          }
        })
      }
    case DECREASE_ITEM_COUNT:
      findItem = state.cart.find( elem => elem.id === action.payload.id)
      findItem.counter--;

      return {
        ...state,
        itemsInBag: state.itemsInBag - 1,
        cart: state.cart.map( cartElem => {
          if(cartElem.id === action.payload.id) {
            return findItem
          } else {
            return cartElem
          }
        })
      }
    case SET_ACTIVE_CURRENCY:
      return {
        ...state,
        currency: action.payload
      }
    case ORDER_ITEMS:
      return {
        ...state,
        cart: [],
        itemsInBag: 0
      }
    default:
      return {
        ...state
      }
  }
}
