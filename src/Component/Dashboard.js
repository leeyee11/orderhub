import React, { Component } from 'react';
import {Card,Row,Col,Layout,Icon, Tooltip} from 'antd';
import numeral from 'numeral';
import { ChartCard, yuan, Field,MiniArea,MiniBar,Pie,TagCloud } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import 'ant-design-pro/dist/ant-design-pro.css';
import ReactEcharts from 'echarts-for-react';
import options from '../config/charts.json';
import moment from 'moment';

const {Content} = Layout;


const visitData=[];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}
const salesPieData = [
  {x: 'AAPL',y: 4544},
  {x: 'C',y: 3321},
  {x: 'GS',y: 3113},
  {x: 'WMT',y: 2341},
  {x: 'BIDU',y: 1231}];
const tags = [];
for (let i = 0; i < 50; i += 1) {
  tags.push({
    name: `TagClout-Title-${i}`,
    value: Math.floor((Math.random() * 50)) + 20,
  });
}


class DashBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render() {
    return (
        <Layout className="DashBoard" style={{height:'100%',overflow:'auto'}}>
            <Content style={{padding:24}}>
            <Row gutter={24}>
              <Col span={6}>
                <ChartCard style={{height:180}} title="Bid" align="left"
                total={() => (<span dangerouslySetInnerHTML={{ __html: 122 }} />)}
                footer={<Field label="Total" value={numeral(12423).format("0,0")} />} contentHeight={46}>
                <span>
                  Last Week<Trend flag="up" style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>12%</Trend>
                 </span>
                <span style={{ marginLeft: 16 }}>
                  Yestoay<Trend flag="down" style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>11%</Trend>
                </span>
                </ChartCard>
              </Col>
              <Col span={6}>
               <ChartCard style={{height:180}} title="Ask" align="left"
                total={() => (<span dangerouslySetInnerHTML={{ __html: 78 }} />)}
                footer={<Field label="Total" value={numeral(11325).format("0,0")} />} contentHeight={46}>
                <span>
                  Last Week<Trend flag="up" style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>15%</Trend>
                 </span>
                <span style={{ marginLeft: 16 }}>
                  Yestoay<Trend flag="down" style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>8%</Trend>
                </span>
                </ChartCard>
              </Col>
              <Col span={6}>
                <ChartCard style={{height:180}} title="Completed" align="left"
                total={() => (<span dangerouslySetInnerHTML={{ __html: 128 }} />)}
                footer={<Field label="Today" value={numeral(13).format("0,0")} />} contentHeight={46}>
                <MiniArea line color="#cceafe"height={45} data={visitData} />
                </ChartCard>
              </Col>
              <Col span={6}>
                <ChartCard style={{height:180}} title="Canceled" align="left"
                total={() => (<span dangerouslySetInnerHTML={{ __html: 53 }} />)}
                footer={<Field label="Today" value={numeral(2).format("0,0")} />} contentHeight={46}>
                <MiniBar color="#cceafe"height={45} data={visitData} />
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
                      title="Stock"
                      subTitle="Stock"
                      total={() => (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: (salesPieData.reduce((pre, now) => now.y + pre, 0))
                          }}
                        />
                      )}
                      data={salesPieData}
                      valueFormat={val => <span dangerouslySetInnerHTML={{ __html: (val) }} />}
                      height={230}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bodyStyle={{height:230,padding:0}}>
                  <TagCloud
                  data={tags}
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