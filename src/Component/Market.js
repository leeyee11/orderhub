import React, { Component } from 'react';
import { Select,Table,Card,Row, Col,InputNumber,Layout,Menu,Tag} from 'antd';
import ReactEcharts from 'echarts-for-react';
import options from '../config/charts.json';
import axios from 'axios';
import Mock from 'mockjs';
import api from '../config/api.json'

const Option = Select.Option;
const { Column } = Table;
const { Content,Sider } = Layout;

const symbols=["AAPL","C","GS","BIDU","WMT","SNE","DDAIF","VLKAY","GE","TSLA"];

Mock.mock(api.getAll, {
  "bid|10-30":[
    {
      "key|+1":0,
      "price|100-200.2":1,
      "size|1-50":1,
    }
  ],
  "ask|10-30":[
    {
      "key|+1":0,
      "price|100-200.2":1,
      "size|1-50":1,
    }
  ]
});
Mock.mock(api.getLevelOne,{
  "market|10":[
    {
      "symbol|+1":symbols,
      "bid|100-200.2":1,
      "ask|100-200.2":1
    }
  ]
});

Mock.mock(api.getLevelTwo, {
  "bid|10-30":[
    {
      "key|+1":0,
      "price|100-200.2":1,
      "size|1-50":1,
    }
  ],
  "ask|10-30":[
    {
      "key|+1":0,
      "price|100-200.2":1,
      "size|1-50":1,
    }
  ]
});


class Market extends Component {
  constructor(props){
    super(props);
    this.state = {
      company:"AAPL",
      orderType:"MKT",
      levelOne:{market:[]},
      levelTwo:{bid:[],ask:[]},
      interval:null
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
      console.log(res.data)
      this.setState({levelOne:res.data})
    })
    .catch((err)=>{
      console.log(err);
    })

    //LevelTwo
  axios.get(api.getLevelTwo)
    .then((res)=>{
      this.setState({levelTwo:res.data})
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  render() {
    const MenuItems=this.state.levelOne.market.map(item=>{
      return (
        <Menu.Item key={item.symbol}>
          <Row>
            <Col span={8} align="left"><Tag color="#2db7f5">{item.symbol}</Tag></Col>
            <Col span={8} align="left">{item.bid}</Col>
            <Col span={8} align="left">{item.ask}</Col>
          </Row>
        </Menu.Item>);
    })
    return (
        <div className="Market" style={{height:'100%'}}>
        <Layout style={{height:'100%'}}>
          <Sider style={{minWidth:280}}>
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
          <Card
            bodyStyle={{padding:0}}>
            <ReactEcharts
                  ReactEcharts
                  style={{width:'100%',height:120}}
                  option={options.market}
                  notMerge={true}
                  lazyUpdate={true}
                  theme={"theme_name"}
                  onChartReady={this.onChartReadyCallback}
                  onEvents={null}
                  opts={null}/>
          </Card>
          <Row gutter={24} style={{marginTop:24}}>
          <Col span={8} style={{height:560}}>
            <Card bodyStyle={{paddingBottom:0}}>
                <Table 
                style={{height:500}}
                pagination={{pageSize:9,simple:true}}
                size="middle" 
                dataSource={this.state.levelTwo.bid} >
                  <Column
                  title="BidSize"
                  dataIndex="size"
                  key="size"
                  />
                  <Column
                  title="BidPrice"
                  dataIndex="price"
                  key="price"
                  />
                </Table>
              </Card>
          </Col>
          <Col span={8} style={{height:560}}>
            <Card bodyStyle={{paddingBottom:0}}>
                <Table 
                style={{height:500}}
                pagination={{pageSize:9,simple:true}}
                size="middle" 
                dataSource={this.state.levelTwo.ask} >
                  <Column
                  title="AskSize"
                  dataIndex="size"
                  key="size"
                  />
                  <Column
                  title="AskPrice"
                  dataIndex="price"
                  key="price"
                  />
                </Table>
              </Card>
            </Col>
            <Col span={8} style={{height:560}}>
              <Card bodyStyle={{padding:0}}>
                  <Card.Grid style={{width:'50%',height:100,fontSize:28}}>206.34</Card.Grid>
                  <Card.Grid style={{width:'50%',height:100,fontSize:28}}>208.54</Card.Grid>
                 <Card.Grid style={{width:'100%',height:270}}>
                  <Select
                  showSearch
                  size="large"
                  style={{ width: '100%' }}
                  onChange={(value)=>{this.setState({orderType:value})}}
                  defaultValue={this.state.orderType}
                  >
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
                 </Card.Grid>
                </Card>
            </Col>
            </Row>
          </Content>
          </Layout>

          
        </div>
    );
  }
}

export default Market;
