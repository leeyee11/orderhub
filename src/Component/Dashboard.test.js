import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard.js';
import store from '../lib/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dashboard store={store}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
