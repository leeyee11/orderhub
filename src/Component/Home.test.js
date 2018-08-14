import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home.js';
import store from '../lib/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home store={store}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
