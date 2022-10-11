import { SET_ACTIVE_CURRENCY } from './types';

export const setActiveCurrency = (currency) => {
  return dispatch => {
    dispatch({
      type: SET_ACTIVE_CURRENCY,
      payload: currency
    })
  };
};
