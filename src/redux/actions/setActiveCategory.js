import { SET_ACTIVE_CATEGORY } from './types';

export const setCategory = (data) => {
  return dispatch => {
    let category = '';
    if(!data.length) {
      category = data.target.innerHTML;
    } else {
      category = data
    }

    dispatch({
      type: SET_ACTIVE_CATEGORY,
      payload: category
    })
  };
};
