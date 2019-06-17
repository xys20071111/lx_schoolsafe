import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { Menu, Icon, Layout  } from 'antd';
import ChangShang from 'Modules/ChangShang';
import SheBeiContainer from 'Modules/SheBei';
import AnZhuangContainer from 'Modules/AnZhuang';
import CardBindContainer from 'Modules/CardBind';
import UseInfoContainer from 'Modules/UseInfo';
import AddHolidayContainer from 'Modules/AddHoliday';
const { Sider, Content } = Layout;

/* import CardRecord from 'Modules/CardRecord'; */
class AppHome extends Component {
  getMenuBody = () => {
    return (
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
      >
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <Link to="/changshang">厂商管理</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="desktop" />
          <Link to="/shebei">设备管理</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="inbox" />
          <Link to="/anzhuang">安装位置</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="car" />
          <Link to="/useinfo">设备使用信息</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="heart" />
          <Link to="/cardbind">一卡通绑定</Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="setting" />
          <Link to="/holiday">节假日设置</Link>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    return this.getMenuBody();
  }
}



class AppView extends Component {
  getChangShang = props => <ChangShang {...props} />

  getSheBeiContainer = props => <SheBeiContainer {...props} />

  getAnZhuangPostion = props => <AnZhuangContainer {...props} />

  render() {
    return (
      <div className = 'lx-school'>
        <Layout>
          <Sider>
            <Route path="/" component={AppHome} />
          </Sider>
          <Layout>
            <Content>
              <Route path="/changshang" component={this.getChangShang} />
              <Route path="/shebei" component={this.getSheBeiContainer} />
              <Route path="/anzhuang" component={this.getAnZhuangPostion} />
              <Route path="/cardbind" component={CardBindContainer} />
              <Route path="/useinfo" component={UseInfoContainer} />
              <Route path="/holiday" component={AddHolidayContainer} />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default AppView;