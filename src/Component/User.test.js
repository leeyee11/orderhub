import React from 'react';
import ReactDOM from 'react-dom';
import User from './User.js';
import store from '../lib/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<User store={store}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
