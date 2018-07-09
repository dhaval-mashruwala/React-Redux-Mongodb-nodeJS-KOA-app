 /* The main index file for bootstrapping the application. It configures store and provider
 * ========================================================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';

/* Import CSS
 * =======================================
 */
import 'bootstrap-css-only/css/bootstrap.min.css';
import './main.css';
import './index.css';

/* Import components and containers
 * =======================================
 */
 import App from './App';

/* Import services
 * =======================================
 */
import registerServiceWorker from './registerServiceWorker';

/* Create a store which contains all states/data of application normally just one big javascript object */
const store = createStore(allReducers,applyMiddleware(thunk));

/* Add provider which makes store available to all the components in the application bootstrap the application */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
