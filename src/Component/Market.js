import React, { Component } from 'react';
import { Select,Table,Card,Row, Col,Layout,Menu,Tag,Icon,Input,Button,message} from 'antd';
import ReactEcharts from 'echarts-for-react';
import options from '../config/charts';
import axios from 'axios';
import Mock from 'mockjs';
import api from '../config/api';
import orders from '../config/orders';
import data from '../config/test';
import './Market.css'

const Option = Select.Option;
const { Column } = Table;
const { Content,Sider } = Layout;
const ButtonGroup = Button.Group;
const { priceHistory } = data;

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

Mock.mock(api.getLevelTwo+"?symbol=AAPL", {
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


Mock.mock(api.postBid,{
  "result":{
    "status|1":["success","fail"],
    "info|1":["error network","no permittion"]
  }
})
Mock.mock(api.postAsk,{
  "result":{
    "status|1":["success","fail"],
    "info|1":["error network","no permittion"]
  }
})

Mock.mock(api.getPriceHistory+"?symbol=AAPL",priceHistory);

const nodeGen={
      input:(ref)=>{
        const placeholder=((name) =>name.replace(/([A-Z])/g," $1").toLowerCase())(ref);
        return (
          <Input style={{ width: '100%' }} type="number" ref={ref} placeholder={placeholder}/>
        );
      }
    }

const nodeLayout=(nodes)=>{
  let placeOrder;
  if(nodes.length==0){
      placeOrder=(<div></div>)
  }else if(nodes.length==1){
        placeOrder=(
          <div>
            <Row gutter={24} style={{marginTop:24}}>
              <Col span={24}>
                {nodes[0]}
              </Col>
            </Row>
          </div>
          )
  }else if(nodes.length==2){
        placeOrder=(
          <div>
            <Row gutter={24} style={{marginTop:24}}>
              <Col span={12}>
                {nodes[0]}
              </Col>
              <Col span={12}>
                {nodes[1]}
              </Col>
            </Row>
          </div>
          )
      }
    return placeOrder;
}

class Market extends Component {
  constructor(props){
    super(props);
    this.state = {
      symbol:"AAPL",
      orderType:"MKT",
      market:[],
      filter:null,
      bid:[],
      ask:[],
      interval:null,
      collapse:true,
      fillOrKill:"fill",
      durationType:"None",
      priceHistory:null,
    };
  }
  componentDidMount(){
    this.setState({interval:setInterval(()=>this.loop(),1000)});
    this.once(this.state.symbol);
  }
  componentWillUnmount(){
    clearInterval(this.state.interval);
  }
  handleSelect({item,key,selectedKey}){
    this.setState({symbol:key,priceHistory:null})
    this.once(key);
  }
  handleSubmit(type){
    if(this.props.store.getState().hash==null){
      message.warning("please sign in");
      this.props.store.dispatch({type:'SWITCHTAB',tab:'User'})
      return;
    }
    if(Number.isNaN(this.refs.qty.input.value)||this.refs.qty.input.value==""){
      message.warning("illegal input!");
      return ;
    }
    const data={
      "hash":this.props.store.getState().hash,
      "symbol":this.state.symbol,
      "orderType":this.state.orderType,
      "quantity":this.refs.qty.input.value,
    }
    if(this.state.orderType!='MKT'){
      data["fillOrKill"]=this.state.fillOrKill;
      data["durationType"]=this.state.durationType;
      orders[this.state.orderType].nodes.map(order=>{
        if(order.type=='input'&&!Number.isNaN(this.refs[order.ref].input.value)&&this.refs[order.ref].input.value!=""){
          data[order.ref]=this.refs[order.ref].input.value;
        }else{
          message.warning("illegal input!");
          return;
        }
      });
    } 
    const apiURL=(type=='bid')?api.postBid:api.postAsk;
    axios.post(apiURL,JSON.stringify(data))
    .then((res)=>{
      if(res.data.result.status=="success"){
        message.info(res.data.result.status);
      }else{
        message.error('Something wrong:'+res.data.result.info);
      }
    })
    .catch((err)=>{
      message.error('Something wrong');
      console.log(err);
    })
  }
  once(key){
    axios.get(api.getPriceHistory,{params:{'symbol':key}})
    .then((res)=>{
      const priceHistoryOption=options.priceHistory;
      const history=splitData(res.data.priceHistory);
      priceHistoryOption['xAxis']['data']=history.categoryData;
      priceHistoryOption['series'][0]['data']=history.values;
      priceHistoryOption['series'][1]['data']=calculateMA(5,history)
      priceHistoryOption['series'][2]['data']=calculateMA(10,history)
      priceHistoryOption['series'][3]['data']=calculateMA(20,history)
      priceHistoryOption['series'][4]['data']=calculateMA(30,history)
      console.log(priceHistoryOption)
      this.setState({priceHistory:priceHistoryOption});
    })
    .catch((err)=>{
      console.log(err);
    });
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
    axios.get(api.getLevelTwo,{params:{'symbol':this.state.symbol}})
    .then((res)=>{
      const sortByBidPrice=(p,n)=>{
        return n.bidPrice-p.bidPrice
      }
      const sortByAskPrice=(p,n)=>{
        return p.askPrice-n.askPrice
      }
      const bid=res.data.bid.sort(sortByBidPrice)
      const ask=res.data.ask.sort(sortByAskPrice)
      this.setState({bid:bid})
      this.setState({ask:ask})
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  collapse(){
    this.setState({"collapse":!this.state.collapse})
  }
  render() {
    let filteredMarket;
    if(this.state.filter!=null&&this.state.filter!=''){
      filteredMarket=this.state.market.filter(item=>{
        if(item.symbol.indexOf(this.state.filter)>=0){
          return true;
        }else{
          return false;
        }
      });
    }else{
      filteredMarket=this.state.market;
    }
    const MenuItems=filteredMarket.map(item=>{
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
    const priceHistoryChart=this.state.priceHistory==null
                          ?(<div/>)
                          :(<ReactEcharts
                            ReactEcharts
                            style={{width:'100%',height:210}}
                            option={this.state.priceHistory}
                            notMerge={true}
                            lazyUpdate={true}
                            theme={"theme_name"}
                            onChartReady={this.onChartReadyCallback}
                            onEvents={null}
                            opts={null}/>)


    const nodes=orders[this.state.orderType].nodes.map((o)=>{return (nodeGen[o.type](o.ref))});
    const placeOrder=nodeLayout(nodes);

    return (
        <Layout className="Market" style={{height:'100%'}}>
          <Sider className="SymbolSider" width={this.state.collapse?100:360} style={{overflow:"hidden"}}>
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
            style={{height: 'calc(100% - 36px - 48px - 1px)',width:'100%'}}
            defaultSelectedKeys={['AAPL']}
            onSelect={({item,key,selectedKey})=>this.handleSelect({item,key,selectedKey})}
            mode="inline"
            >
              {MenuItems}
            </Menu>
            <div style={{height:36,padding:3}}>
              <Input 
              placeholder="search"
              style={{height:30,backgroundColor:'inherit',outline:'none',border:'1px solid rgba(255,255,255,0.3)',color:'#fff'}} 
              onInput={(e)=>this.setState({filter:e.target.value.toUpperCase()})}/>
            </div>
          </Sider>
          <Content style={{height:'100%',padding:24}}>
          <Row gutter={24} style={{height:'100%'}}>
          <Col span={12}>
            <Card className="OrderBookDetail" bodyStyle={{paddingBottom:0}}>
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
                  className="BidPrice"
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
                  className="AskPrice"
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
            <Card className="OrderBookDetail" bodyStyle={{padding:10,height:230}}>
              {priceHistoryChart}
            </Card>
            <Card  className="OrderBookDetail" style={{marginTop:24}}>
              <Row>
              <Card.Grid style={{width:'100%',height:96}}>
                <h1>{this.state.symbol}</h1>
              </Card.Grid>
              </Row>
              <Row gutter={24} style={{marginTop:24}}>
                <Col span={12}>
                  <Select
                  showSearch
                  ref="orderType"
                  style={{width:'100%'}}
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
                </Col>
                <Col span={12}>
                  <Input style={{ width: '100%' }} type="number" ref="qty" placeholder="quantity"/>
                </Col>
              </Row>
              {placeOrder}
              <Row gutter={24} style={{marginTop:24,display:this.state.orderType=='MKT'?'none':'block'}}>
                <Col span={12}>
                  <Select style={{width:'100%'}} defaultValue="fill" onChange={(value)=>this.setState({fillOrKill:value})}>
                    <Option value="FILL">fill</Option>
                    <Option value="KILL">kill</Option>
                  </Select>
                </Col>
                <Col span={12}>
                  <Select style={{width:'100%'}} defaultValue="None" onChange={(value)=>this.setState({durationType :value})}>
                    <Option value="NONE">None</Option>
                    <Option value="DAY">Day</Option>
                    <Option value="GTC">Good Till Canceled</Option>
                    <Option value="GTD">Good Till Date</Option>
                    <Option value="IOC">Immediate Or Cancel</Option>
                    <Option value="AON">All or None</Option>
                    <Option value="ATO">At the Opening</Option>
                    <Option value="ATC">At the Close</Option>
                    <Option value="MIN">Minute</Option>
                  </Select>
                </Col>
              </Row>
              <Row style={{marginTop:24}}>
                <ButtonGroup>
                  <Button type="primary" style={{width:160}} onClick={()=>this.handleSubmit('bid')} >Buy</Button>
                  <Button style={{width:160,borderColor:'#40a9ff'}} onClick={()=>this.handleSubmit('ask')} >Sell</Button>
                </ButtonGroup>
              </Row>
            </Card>
          </Col>
          </Row>
          </Content>
          </Layout>    
    );
  }
}

function splitData(rawData) {
    var categoryData = [];
    var values = []
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i])
    }
    return {
        categoryData: categoryData,
        values: values
    };
}

function calculateMA(dayCount,data0) {
    var result = [];
    for (var i = 0, len = data0.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data0.values[i - j][1];
        }
        result.push(sum / dayCount);
    }
    return result;
}

export default Market;
