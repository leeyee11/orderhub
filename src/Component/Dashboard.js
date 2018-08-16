import React, { Component } from 'react';
import {Card,Row,Col,Layout,Icon, Tooltip} from 'antd';
import numeral from 'numeral';
import { ChartCard, yuan, Field,MiniArea,MiniBar,Pie,TagCloud } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import 'ant-design-pro/dist/ant-design-pro.css';
import ReactEcharts from 'echarts-for-react';
import options from '../config/charts';
import Mock from 'mockjs';
import axios from 'axios';
import md5 from 'md5';
import api from '../config/api'
import data from '../config/test'
import moment from 'moment';

const {Content} = Layout;

Mock.mock(api.getDashboard/*+"?hash="+md5(2)*/,data);

class DashBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      interval:null,
      bidOrderIndex:{total:0,today:0,history:[]},
      askOrderIndex:{total:0,today:0,history:[]},
      completedOrderIndex:{total:0,today:0,history:[]},
      canceledOrderIndex:{total:0,today:0,history:[]},
      symbolProportion:[],
      symbolNumber:[]
    }
  }
  componentDidMount(){
    this.setState({interval:setInterval(()=>this.loop(),1000)});
  }
  componentWillUnmount(){
    clearInterval(this.state.interval);
  }
  loop(){
    axios.get(api.getDashboard,{params:{hash:this.props.store.getState().hash}})
    // axios.get(api.getDashboard/*,{params:{hash:this.props.store.getState().hash}}*/)
    .then((res)=>{
      this.setState({
        bidOrderIndex:{
          today:res.data.bidOrderIndex.today,
          total:res.data.bidOrderIndex.total,
          history:res.data.bidOrderIndex.history.map(i=>{return {x:i[0],y:i[1]}})
        },
        askOrderIndex:{
          today:res.data.askOrderIndex.today,
          total:res.data.askOrderIndex.total,
          history:res.data.askOrderIndex.history.map(i=>{return {x:i[0],y:i[1]}})
        },
        completedOrderIndex:{
          today:res.data.completedOrderIndex.today,
          total:res.data.completedOrderIndex.total,
          history:res.data.completedOrderIndex.history.map(i=>{return {x:i[0],y:i[1]}})
        },
        canceledOrderIndex:{
          today:res.data.canceledOrderIndex.today,
          total:res.data.canceledOrderIndex.total,
          history:res.data.canceledOrderIndex.history.map(i=>{return {x:i[0],y:i[1]}})
        },
        symbolProportion:res.data.symbolProportion,
        symbolNumber:res.data.symbolNumber
      });
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  render() {
    return (
        <Layout className="DashBoard" style={{height:'100%',overflow:'auto'}}>
            <Content style={{padding:24}}>
            <Row gutter={24}>
              <Col span={6}>
                <ChartCard style={{height:180}} title="Bid" align="left"
                total={() => (<span dangerouslySetInnerHTML={{ __html: this.state.bidOrderIndex.today }} />)}
                footer={<Field label="Total" value={this.state.bidOrderIndex.total} />} contentHeight={46}>
                <MiniBar color="#cceafe"height={45} data={this.state.bidOrderIndex.history} />
                </ChartCard>
              </Col>
              <Col span={6}>
               <ChartCard style={{height:180}} title="Ask" align="left"
                total={() => (<span dangerouslySetInnerHTML={{ __html: this.state.askOrderIndex.today }} />)}
                footer={<Field label="Total" value={this.state.askOrderIndex.total} />} contentHeight={46}>
                <MiniBar color="#cceafe"height={45} data={this.state.askOrderIndex.history} />
                </ChartCard>
              </Col>
              <Col span={6}>
                <ChartCard style={{height:180}} title="Completed" align="left"
                total={() => (<span dangerouslySetInnerHTML={{ __html: this.state.completedOrderIndex.today }} />)}
                footer={<Field label="Total" value={this.state.completedOrderIndex.total} />} contentHeight={46}>
                <MiniArea line color="#cceafe"height={45} data={this.state.completedOrderIndex.history} />
                </ChartCard>
              </Col>
              <Col span={6}>
                <ChartCard style={{height:180}} title="Canceled" align="left"
                total={() => (<span dangerouslySetInnerHTML={{ __html: this.state.canceledOrderIndex.today }} />)}
                footer={<Field label="Total" value={this.state.canceledOrderIndex.total} />} contentHeight={46}>
                <MiniArea line color="#cceafe"height={45} data={this.state.canceledOrderIndex.history} />
                </ChartCard>
              </Col>
            </Row>
            <Row style={{marginTop:24}}>
              <Col span={24}>
                <Card style={{padding:0}}>
                  <ReactEcharts
                    ReactEcharts
                    style={{width:'100%',height:200}}
                    option={options.balance}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    onChartReady={this.onChartReadyCallback}
                    onEvents={null}
                    opts={null}/>
                  </Card>
              </Col>
            </Row>
            <Row gutter={24} style={{marginTop:24}}>
              <Col span={12}>
                <Card bodyStyle={{height:230,padding:0}}>
                  <Pie
                      hasLegend
                      title="Completed"
                      subTitle="Amount of money"
                      total={() => (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: (this.state.symbolProportion.reduce((pre, now) => now.y + pre, 0))
                          }}
                        />
                      )}
                      data={this.state.symbolProportion}
                      valueFormat={val => <span dangerouslySetInnerHTML={{ __html: (val) }} />}
                      height={230}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bodyStyle={{height:230,padding:0}}>
                  <TagCloud
                  data={this.state.symbolNumber}
                  height={230}/>
                </Card>
              </Col>
            </Row>
            </Content>
        </Layout>
    );
  }
}

export default DashBoard;