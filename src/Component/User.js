import React, { Component } from 'react';
import {Layout,Table,Divider,Icon,Card,Form, Input, Button, Checkbox,Row,Col} from 'antd';
import axios from "axios";
import Mock from 'mockjs';
import md5 from 'md5'
import api from '../config/api.json';
const {Content} = Layout;
const {Column}=Table;
const FormItem = Form.Item;

const symbols=["AAPL","C","GS","BIDU","WMT","SNE","DDAIF","VLKAY","GE","TSLA"];

Mock.mock(api.postSignIn,{
  "hash":md5("admin"+"12345")
});

Mock.mock(api.getOrders+"?hash="+md5("admin"+"12345"),{
  "orders|20-50":[
    {
      "key|+1":1,
      "symbol|1":symbols,
      "type|1":["Buy","Sell"],
      "price|100-200.2":1,
      "quantity|1-50":1,
      "status|1":["Processing","Canceled","Completed"],
      "datetime":"@date('yyyy-MM-dd')"
    }
  ]
});


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
    const soeid=this.refs.soeid.input.value;
    const password=this.refs.password.input.value;
    axios
    .post(api.postSignIn,{"soeid":soeid,"password":password})
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
                  title="Type"
                  dataIndex="type"
                  key="type"
                  filters={[
                    { text: 'Buy', value: 'Buy' },
                    { text: 'Sell', value: 'Sell' },
                  ]}
                  filteredValue={filteredInfo.type || null}
                  onFilter={(value, record) => record.type.includes(value)}
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
                  title="Action"
                  key="action"
                  render={(text, record) => (
                <span>
                  <a href="javascript:;" onClick={()=>{this.viewOrder(record.key)}}>View</a>
                <Divider type="vertical" style={{display:(record.status=='Processing')?'inline':'none'}}/>
                  <a href="javascript:;" style={{display:(record.status=='Processing')?'inline':'none'}}>Cancel</a>
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
            <Card style={{width:360,height:320,boxShadow:'1px 1px 10px 1px rgba(0,0,0,0.5)'}} align="center">
              <Form className="login-form">
                <h1>Order Hub</h1>
                <FormItem>
                  <Input ref="soeid" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
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
      <Card style={{height:'calc(100% - 480px - 24px)',backgroundColor:'#666',border:'none'}}>
        
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