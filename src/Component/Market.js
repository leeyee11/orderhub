import React, { Component } from 'react';
import { Select,Table,Card,Row, Col,InputNumber,Layout,Menu,Tag,Icon} from 'antd';
import ReactEcharts from 'echarts-for-react';
import options from '../config/charts.json';
import axios from 'axios';
import Mock from 'mockjs';
import api from '../config/api.json'
import './Market.css';

const Option = Select.Option;
const { Column } = Table;
const { Content,Sider } = Layout;

const symbols=["AAPL","C","GS","BIDU","WMT","SNE","DDAIF","VLKAY","GE","TSLA"];

Mock.mock(api.getLevelOne,{
  "market|10":[
    {
      "symbol|+1":symbols,
      "bidQty|1-50":1,
      "bidPrice|100-200.2":1,
      "askPrice|100-200.2":1,
      "askQty|1-50":1
    }
  ]
});

Mock.mock(api.getLevelTwo, {
  "bid|10-30":[
    {
      "key|+1":0,
      "bidPrice|100-200.2":1,
      "bidQty|1-50":1,
    }
  ],
  "ask|10-30":[
    {
      "key|+1":0,
      "askPrice|100-200.2":1,
      "askQty|1-50":1,
    }
  ]
});


class Market extends Component {
  constructor(props){
    super(props);
    this.state = {
      company:"AAPL",
      orderType:"MKT",
      market:[],
      bid:[],
      ask:[],
      interval:null,
      collapse:true
    };
  }
  componentDidMount(){
    this.setState({interval:setInterval(()=>this.loop(),1000)});
  }
  componentWillUnmount(){
    clearInterval(this.state.interval);
  }
  loop(){
    //LevelOne
    axios.get(api.getLevelOne)
    .then((res)=>{
      this.setState({market:res.data.market})
    })
    .catch((err)=>{
      console.log(err);
    })

    //LevelTwo
  axios.get(api.getLevelTwo)
    .then((res)=>{
      this.setState({bid:res.data.bid})
      this.setState({ask:res.data.ask})
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  collapse(){
    this.setState({"collapse":!this.state.collapse})
  }
  render() {
    const MenuItems=this.state.market.map(item=>{
      return (
        <Menu.Item key={item.symbol} style={{paddingLeft:0,paddingRight:0}}>
          <Row>
            <Col span={this.state.collapse?24:6} align="left">{item.symbol}</Col>
            <Col span={4} align="center" style={{display:this.state.collapse?'none':'inline-block'}}>{item.bidQty}</Col>
            <Col span={5} align="center" style={{display:this.state.collapse?'none':'inline-block'}}>{item.bidPrice}</Col>
            <Col span={5} align="center" style={{display:this.state.collapse?'none':'inline-block'}}>{item.askPrice}</Col>
            <Col span={4} align="center" style={{display:this.state.collapse?'none':'inline-block'}}>{item.askQty}</Col>
          </Row>
        </Menu.Item>);
    })
    return (
        <Layout className="Market" style={{height:'100%'}}>
          <Sider width={this.state.collapse?100:360} style={{overflow:"hidden"}}>
            <div style={{color:"#ffffff",height:'48px',lineHeight:'48px',paddingLeft:25,backgroundColor:'#234'}}>
              <Row>
                <Col span={this.state.collapse?24:6} align="left">
                <a style={{color:'#ffffff'}} onClick={()=>this.collapse()}>
                  <Icon type={this.state.collapse ? 'right' : 'left'} />
                </a></Col>
                <Col span={4} style={{display:this.state.collapse?'none':'inline-block'}} align="center">Bid Qty</Col>
                <Col span={5} style={{display:this.state.collapse?'none':'inline-block'}} align="center">Bid Price</Col>
                <Col span={5} style={{display:this.state.collapse?'none':'inline-block'}} align="center">Ask Price</Col>
                <Col span={4} style={{display:this.state.collapse?'none':'inline-block'}} align="center">Bid Qty</Col>
              </Row>
            </div>
            <Menu
            className="SymbolMenu"
            onClick={this.handleClick}
            mode="inline"
            theme="dark"
            style={{height: '100%',width:'100%'}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            >
              {MenuItems}
            </Menu>
          </Sider>
          <Content style={{height:'100%',padding:24}}>
          <Row gutter={24} style={{height:'100%'}}>
          <Col span={12}>
            <Card bodyStyle={{paddingBottom:0}}>
              <Row gutter={12}>
                <Col span={12}>
                <Table 
                pagination={{pageSize:10,simple:true}}
                size="middle" 
                dataSource={this.state.bid} >
                  <Column
                  title="Bid Qty"
                  dataIndex="bidQty"
                  key="bidQty"
                  />
                  <Column
                  title="BidPrice"
                  dataIndex="bidPrice"
                  key="bidPrice"
                  />
                </Table>
                </Col>
                <Col span={12}>
                <Table 
                pagination={{pageSize:10,simple:true}}
                size="middle" 
                dataSource={this.state.ask} >
                  <Column
                  title="Ask Price"
                  dataIndex="askPrice"
                  key="askPrice"
                  />
                  <Column
                  title="Ask Qty"
                  dataIndex="askQty"
                  key="askQty"
                  />
                </Table>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card bodyStyle={{padding:0}}>
              <ReactEcharts
              ReactEcharts
              style={{width:'100%',height:230}}
              option={options.market}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
              onChartReady={this.onChartReadyCallback}
              onEvents={null}
              opts={null}/>
            </Card>
            <Card style={{height:320,marginTop:24}}>
              <Select
              showSearch
              size="large"
              style={{ width: '100%' }}
              onChange={(value)=>{this.setState({orderType:value})}}
              defaultValue={this.state.orderType}>
              <Option value="MKT">Market Order</Option>
                <Option value="LMT">Limit Order</Option>
                <Option value="STP">Stop Order</Option>
                <Option value="STPL">Stop Loss Order</Option>
                <Option value="STPLMT">Stop Limit Order</Option>
                <Option value="MIT">Market If Touched</Option>
                <Option value="LIT">Limit If Touched</Option>
              </Select>
              <br/>
              <br/>
              <Row gutter={24}>
                <Col span={12}>
                  <InputNumber
                  style={{ width: '100%' }}
                  defaultValue={1000}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
                </Col>
                <Col span={12}>
                  <InputNumber
                  style={{ width: '100%' }}
                  defaultValue={1000}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          </Row>
          </Content>
          </Layout>    
    );
  }
}

export default Market;
