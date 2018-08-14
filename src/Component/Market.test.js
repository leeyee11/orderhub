import React from 'react';
import ReactDOM from 'react-dom';
import Market from './Market.js';
import store from '../lib/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Market store={store}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
