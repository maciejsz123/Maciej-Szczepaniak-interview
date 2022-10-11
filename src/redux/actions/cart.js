import { ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  CHANGE_ITEM_ATTRIBUTES,
  INCREASE_ITEM_COUNT,
  DECREASE_ITEM_COUNT,
  ORDER_ITEMS } from './types';
import store from '../store';

export const addItemToCart = (item, attributes) => {
  return dispatch => {
    //if no attributes set
    if(!attributes || !Object.keys(attributes).length) {
      attributes = {}
      for(let x of item.attributes) {
        attributes[x.id] = x.items[0].value
      }
    }

    //if item with the same attributes as in cart is added increase counter of arleady existed
    let x = store.getState().main.cart.filter( elem => elem.item.id === item.id)

    let checkDuplicate = x.filter( elem => {
      let duplicate = true
      for(let x in elem.attributes) {
        if(elem.attributes[x] !== attributes[x]) {
          duplicate = false;
        }
      }
      if(duplicate) {
        return elem
      }
    })

    //increase counter of arleady existed
    if(checkDuplicate.length > 0) {
        dispatch({
          type: INCREASE_ITEM_COUNT,
          payload: checkDuplicate[0]
        })
        return ;
    }

    //add new item to cart
    dispatch({
      type: ADD_ITEM_TO_CART,
      payload: {id: item.id+""+Date.now(), item: item, attributes: attributes, counter: 1}
    })
  };
};

export const deleteItemFromCart = (product) => {
  return dispatch => {
    dispatch({
      type: DELETE_ITEM_FROM_CART,
      payload: product
    })
  };
};

export const changeItemAttributes = (product, value, attributeId) => {
  return dispatch => {
    dispatch({
      type: CHANGE_ITEM_ATTRIBUTES,
      payload: { product, value, attributeId }
    })
  };
};

export const increaseCounter = (product) => {
  return dispatch => {
    dispatch({
      type: INCREASE_ITEM_COUNT,
      payload: product
    })
  };
};

export const decreaseCounter = (product) => {
  if(product.counter === 1) {
    return dispatch => {
      dispatch({
        type: DELETE_ITEM_FROM_CART,
        payload: product
      })
    };
  } else {
    return dispatch => {
      dispatch({
        type: DECREASE_ITEM_COUNT,
        payload: product
      })
    };
  }
};

export const orderItems = () => {
  return dispatch => {
    dispatch({
      type: ORDER_ITEMS
    })
  };
};
