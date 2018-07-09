/* The main app component - root component
 * =======================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React, { Component } from 'react';

/* Import components and containers
 * =======================================
 */
import Router from './Router';

/* Import CSS
 * =======================================
 */
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router />
    );
  }
}

export default App;
