import React, { Component } from 'react';
import {Layout,Table,Divider,Icon,Card,Form, Input, Button, Checkbox,Row,Col,message} from 'antd';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import axios from "axios";
import Mock from 'mockjs';
import md5 from 'md5'
import api from '../config/api.json';
const {Content} = Layout;
const {Column}=Table;
const FormItem = Form.Item;

const symbols=["AAPL","C","GS","BIDU","WMT","SNE","DDAIF","VLKAY","GE","TSLA"];

// Mock.mock(api.postSignIn,{
//   "hash":md5("admin"+"12345")
// });

// Mock.mock(api.postCancel,{
//   "result":{
//     "status|1":["success","failed"],
//     "info|1":["error network","no permittion"]
//   }
// });

// Mock.mock(api.getOrders+"?hash="+md5("admin"+"12345"),{
//   "orders|20-50":[
//     {
//       "key|+1":1,
//       "symbol|1":symbols,
//       "orderType|1":["MKT","LMT","STP","STPL","STPLMT","MIT","LIT"],
//       "action|1":["Buy","Sell"],
//       "price|100-200.2":1,
//       "quantity|1-50":1,
//       "status|1":["Processing","Canceled","Completed"],
//       "datetime":"@date('yyyy-MM-dd')"
//     }
//   ]
// });

const links = [{
  key: 'Help',
  title: 'Help',
  href: '',
}, {
  key: 'github',
  title: <Icon type="github" />,
  href: 'https://github.com/leeyee11',
  blankTarget: true,
}, {
  key: 'About',
  title: 'Aout',
  href: '',
  blankTarget: true,
}];

const copyright = <div>Copyright <Icon type="copyright" /> 2018 Produced by Phoenix</div>;

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      orders:[]
    }
  }
  componentDidMount(){
    if(this.props.store.getState().hash){
      this.getOrders(this.props.store.getState().hash);
    }
  }
  postSignIn(){
    const userid=this.refs.userid.input.value;
    const password=this.refs.password.input.value;
    if(Number.isNaN(userid)||Number.isNaN(password)){
      message.warning("userid or password is wrong");
      return;
    }
    axios
    .post(api.postSignIn,JSON.stringify({"userid":userid,"password":password}))
    .then((res)=>{
      this.props.store.dispatch({type: 'SIGNIN',hash:res.data.hash})
      this.getOrders(this.props.store.getState().hash)
    })
    .catch((err)=>{console.log(err)})
  }
  getOrders(hash){
    axios
    .get(api.getOrders,{params:{'hash':hash}})
    .then((res)=>{this.setState({orders:res.data.orders})})
    .catch((err)=>{console.log(err)})
  }
  handleChange(pagination, filters, sorter){
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }
  viewOrder(id){

  }
  cancelOrder(id){
    axios
    .post(api.postCancel,JSON.stringify({orderid:id,hash:this.props.store.getState().hash}))
    .then((res)=>{
      if(res.data.result.status=="success"){
        message.info("success");
        this.getOrders(this.props.store.getState().hash);
      }else{
        message.error("failed: "+res.data.result.info);
      }
    })
    .catch((err)=>{console.log(err)})
  }
  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    let content;
    if(this.props.store.getState().hash){
      content=(
        <Content style={{height:'100%',padding:24}}>
          <Card bodyStyle={{border:'none',paddingBottom:0}}>
            <Table 
            dataSource={this.state.orders} 
            onChange={(p,f,s)=>this.setState({filteredInfo: f,sortedInfo: s})}>
                <Column
                  title="Order ID"
                  dataIndex="key"
                  key="key"
                  sorter={(a, b) => a.price - b.price}
                  />
                <Column
                  title="Symbol"
                  dataIndex="symbol"
                  key="symbol"
                  onFilter={(value, record) => record.symbol.includes(value)}
                  />
                <Column
                  title="Order Type"
                  dataIndex="orderType"
                  key="orderType"
                  filters={[
                    { text: 'MKT', value: 'MKT' },
                    { text: 'LMT', value: 'LMT' },
                    { text: 'STP', value: 'STP' },
                    { text: 'STPL', value: 'STPL' },
                    { text: 'STPLMT', value: 'STPLMT' },
                    { text: 'MIT', value: 'MIT' },
                    { text: 'LIT', value: 'LIT' }
                  ]}
                  filteredValue={filteredInfo.orderType || null}
                  onFilter={(value, record) => record.orderType.includes(value)}
                  />
                <Column
                  title="Action"
                  dataIndex="action"
                  key="action"
                  filters={[
                    { text: 'Buy', value: 'Buy' },
                    { text: 'Sell', value: 'Sell' },
                  ]}
                  filteredValue={filteredInfo.action || null}
                  onFilter={(value, record) => record.action.includes(value)}
                  />
                <Column
                  title="Price"
                  dataIndex="price"
                  key="price"
                  sorter={(a, b) => a.price - b.price}
                  />
                <Column
                  title="Quantity"
                  dataIndex="quantity"
                  sorter={(a, b) => a.quantity - b.quantity}
                  key="quantity"/>
                <Column
                  title="Datetime"
                  dataIndex="datetime"
                  key="datetime"/>
                <Column
                  title="Status"
                  dataIndex="status"
                  key="status"
                  filters={[
                    { text: 'Processing', value: 'Processing' },
                    { text: 'Canceled', value: 'Canceled' },
                    { text: 'Completed', value: 'Completed' }
                  ]}
                  filteredValue={filteredInfo.status || null}
                  onFilter={(value, record) => record.status.includes(value)}
                  />
                <Column
                  title="Operation"
                  key="operation"
                  render={(text, record) => (
                <span>
                  <a 
                  href="javascript:;" 
                  onClick={()=>{this.viewOrder(record.key)}}>
                    View
                  </a>
                <Divider type="vertical" style={{display:(record.status=='Processing')?'inline':'none'}}/>
                  <a 
                  href="javascript:;" 
                  style={{display:(record.status=='Processing')?'inline':'none'}}
                  onClick={()=>{this.cancelOrder(record.key)}}>
                  Cancel
                  </a>
                </span>
                )}/>
              </Table>
          </Card>
        </Content>)
    }else{
      content=(
      <div style={{height:'100%'}}>
      <Card style={{padding:120,backgroundImage:"url(/img/finance.jpeg)",backgroundSize:'cover',backgroundPosition:'center'}} bordered={false} align="center">
        <Row gutter={160}>
          <Col md={12} sm={24}>
            <Card style={{width:360,height:320,padding:0,backgroundColor:'inherit',color:'#fff'}} bordered={false}>
              <h1 style={{color:'#fff'}}>Order Matching for You</h1>
              <h2 style={{color:'#fff'}}>Quick Safe Smart</h2>
              <p>Support kinds of orders.
                <br/>Beautiful data charts.
                <br/>Suitable for everyone to use.
              </p>
              <h2 style={{color:'#fff'}}><strong>Try now!</strong></h2>
            </Card>
          </Col>
          <Col md={12} sm={24}>
            <Card style={{width:360,height:320,boxShadow:'1px 1px 10px 1px rgba(0,0,0,0.5)'}} align="center" bordered={false}>
              <Form className="login-form">
                <h1>Order Hub</h1>
                <FormItem>
                  <Input ref="userid" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                </FormItem>
                <FormItem>
                  <Input ref="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                </FormItem>
                <FormItem >
                  <Checkbox align="right">Remember me</Checkbox>
                  <br/>
                  <Button type="primary" block onClick={()=>this.postSignIn()}>
                  Sign in
                  </Button>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      </Card>
      <Card style={{height:'calc(100% - 560px - 48px)',minHeight:180,backgroundColor:'#f5f5f5',border:'none'}}>
            <GlobalFooter links={links} copyright={copyright}/>
      </Card>
      </div>
      );
    }
    return (
       <Layout className="User" style={{height:'100%',overflow:'auto'}}>
          {content}
        </Layout>
    );
  }
}

export default User;