import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers';

function saveToLocalStorage(state) {
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch(e) {
    console.log(e);
  }
}
function loadLocalStorage() {
  try{
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) return undefined
    return JSON.parse(serializedState);
  } catch(e) {
    console.log(e);
    return undefined
  }
}

const initialState = loadLocalStorage();
let store = createStore(combineReducers, initialState, applyMiddleware(thunk));
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
