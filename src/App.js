import './App.sass';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import MainPage from './components/mainPage/mainPage';
import Navbar from './components/navbar/navbar';
import Cart from './components/cart/cart';
import PDP from './components/PDP/PDP';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Navbar />} >
            <Route index element={<MainPage /> } />
            <Route path='/category/:category' element={<MainPage />} />
            <Route path='/product/:id' element={<PDP />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}


window.addEventListener('click', (clicked) => {

  const cartElement = document.getElementById('cart-icon');
  const cartOverlay = document.getElementById('cart-overlay');
  const greyBackground = document.getElementById('grey-background');

  if((clicked.target.id === 'cart-icon' || clicked.target.closest('#cart-overlay')) && !clicked.target.classList.contains('cart-overlay-button')) {
    cartOverlay.classList.remove('inactive-cart-overlay')
    cartOverlay.classList.add('active-cart-overlay');
    greyBackground.classList.add('grey-background');
  } else if (clicked.target.classList.contains('currency-switcher-item')) {
    //do nothing
  } else {
    cartOverlay.classList.add('inactive-cart-overlay')
    cartOverlay.classList.remove('active-cart-overlay');
    greyBackground.classList.remove('grey-background');
  }

})

export default App;
