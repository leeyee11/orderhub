import React from 'react';
import ReactDOM from 'react-dom';
import store from './lib/store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const render=()=>{
	ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}
store.subscribe(render);
render();

registerServiceWorker();
