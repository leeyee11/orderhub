import React, { Component } from 'react';
import { Card } from 'antd';
import Market from './Market'
import Dashboard from './Dashboard'
import User from './User'
import './Home.css'
class Home extends Component {
  constructor(props){
    super(props);
  }
  onTabChange(key, type){
    this.props.store.dispatch({type:'SWITCHTAB',tab:key})
  }
  render() {
    if(this.props.store.getState().hash){
      this.tabs=[{
        key: 'Market',
        tab: 'Market',
      }, {
        key: 'Dashboard',
        tab: 'Dashboard',
      }, {
        key: 'User',
        tab: 'User',
      }];
    }else{
      this.tabs=[{
        key: 'Market',
        tab: 'Market',
      }, {
        key: 'User',
        tab: 'User',
      }];
    }
    this.contents = {
      Market: <Market store={this.props.store}/>,
      Dashboard: <Dashboard store={this.props.store}/>,
      User: <User store={this.props.store}/>
    }
    
    
    return (
        <Card
          className="TabsCard"
          style={{ width: '100%',height:'100%'}}
          bodyStyle={{padding:0,height:'calc( 100% - 53px )'}}
          tabList={this.tabs}
          activeTabKey={this.props.store.getState().tab}
          onTabChange={(key) => { this.onTabChange(key,'active'); }}
          extra={this.props.store.getState().hash==null?<span></span>:<a onClick={()=>this.props.store.dispatch({type:'SIGNOUT'})}>Sign Out</a>}
        >
          {this.contents[this.props.store.getState().tab]}
        </Card>
    );
  }
}

export default Home;