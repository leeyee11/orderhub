import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './Component/Home';
import Manage from './Component/Manage';
import axios from 'axios';
import Mock from 'mockjs';
import api from './config/api.json'
import { Button } from 'antd';
import { Card } from 'antd';
import './App.css';

// Mock.mock(api.getAll, {
// 	"bid|10-30":[
// 		{
// 			"key|+1":0,
// 			"price|100-200.2":1,
// 			"size|1-50":1,
// 		}
// 	],
// 	"ask|10-30":[
// 		{
// 			"key|+1":0,
// 			"price|100-200.2":1,
// 			"size|1-50":1,
// 		}
// 	]
// });



class App extends Component {
  constructor(){
  	super();
  	this.state={
  		username:null,
  		marketData:{bid:[],ask:[]}
  	}
  	setInterval(()=>this.loop(),1000);
  }
  loop(){
	axios.get(api.getAll)
  	.then((res)=>{
    	this.setState({marketData:res.data})
  	})
  	.catch((err)=>{
    	console.log(err);
  	});
  }
  render() {
    return (
      <div className="App">
        <Home marketData={this.state.marketData}/>
      </div>
    );
  }
}

export default App;
