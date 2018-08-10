import React, { Component } from 'react';
import { Card } from 'antd';
import Market from './Market'
import Dashboard from './Dashboard'
import User from './User'

import  './Home.css';

class TabsCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      key: 'Market',
      active: 'Market',
    }
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
  }
  onTabChange(key, type){
    console.log(key, type);
    this.setState({[type]: key });
  }
  render() {
    this.contents = {
      Market: <Market marketData={this.props.marketData}/>,
      Dashboard: <Dashboard/>,
      User: <User/>,
    };
    return (

        <Card
          className="TabsCard"
          style={{ width: '100%',height:'100%'}}
          bodyStyle={{padding:0,height:'100%'}}
          tabList={this.tabs}
          activeTabKey={this.state.active}
          onTabChange={(key) => { this.onTabChange(key,'active'); }}
        >
          {this.contents[this.state.active]}
        </Card>
    );
  }
}

export default TabsCard;