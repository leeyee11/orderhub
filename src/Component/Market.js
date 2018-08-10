import React, { Component } from 'react';
import { Select,Table,Card,Row, Col,InputNumber,Layout } from 'antd';
import ReactEcharts from 'echarts-for-react';
import options from '../config/charts.json';
import SymbolMenu from './SymbolMenu.js';
const Option = Select.Option;
const { Column } = Table;
const { Content } = Layout;


class Market extends Component {
  constructor(props){
    super(props);
    this.state = {
      company:"AAPL",
      orderType:"MKT"
    };
  }
  render() {
    return (
        <div className="Market" style={{height:'100%'}}>
        <Layout style={{height:'100%'}}>
          <SymbolMenu/>
          <Content style={{height:'100%'}}>
          <Card.Grid
          hoverable
          style={{height:'100%',width:'100%'}}
          bodyStyle={{}}
          headStyle={{border:'none',backgroundColor:'#efefef'}}
          >
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
          <Card.Grid style={{width:'33.3%',backgroundColor:'white',height:560}}>
                <Table 
                bordered 
                style={{height:500}}
                pagination={{pageSize:9,simple:true}}
                size="middle" 
                dataSource={this.props.marketData.bid} >
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
          </Card.Grid>
          <Card.Grid style={{width:'33.3%',backgroundColor:'white',height:560}}>
                <Table 
                bordered 
                style={{height:500}}
                pagination={{pageSize:9,simple:true}}
                size="middle" 
                dataSource={this.props.marketData.ask} >
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
            </Card.Grid>
            <Card.Grid style={{width:'33.3%',backgroundColor:'white',height:560}}>
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
            </Card.Grid>
            </Card.Grid>
          </Content>
          </Layout>

          
        </div>
    );
  }
}

export default Market;
