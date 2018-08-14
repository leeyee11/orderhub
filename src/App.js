import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './Component/Home';
import { Button } from 'antd';
import { Card } from 'antd';
import './App.css';

class App extends Component {
  constructor(props){
  	super(props);
  	this.state={
  		username:null,
  	}
  }

  render() {
    return (
      <div className="App">
        <Home store={this.props.store}/>
      </div>
    );
  }
}

export default App;
