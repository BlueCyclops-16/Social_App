
import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert'
// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className='container'>
          <Alert />
          </section>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path='/register' element={<section className='container'><Register /> </section>} />
            <Route path='/login' element={<section className='container'><Login /> </section>} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
