import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './Component/Home';
import Manage from './Component/Manage';
import { Button } from 'antd';
import { Card } from 'antd';
import './App.css';

class App extends Component {
  constructor(){
  	super();
  	this.state={
  		username:null,
  	}
  }

  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }
}

export default App;
