import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { Menu, Icon, Layout  } from 'antd';
import ChangShang from 'Modules/ChangShang';
import SheBeiContainer from 'Modules/SheBei';
import AnZhuangContainer from 'Modules/AnZhuang';
import CardBindContainer from 'Modules/CardBind';
import SchoolUseInfoContainer from 'Modules/SchoolUseInfo';
import AddHolidayContainer from 'Modules/AddHoliday';
import appStr from 'Styles/JS/lxschoolsafe';
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
          <Link to="/changshang">{appStr.menutext.changshang}</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="desktop" />
          <Link to="/shebei">{appStr.menutext.shebei}</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="inbox" />
          <Link to="/anzhuang">{appStr.menutext.anzhuang}</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="car" />
          <Link to="/useinfo">{appStr.menutext.useinfo}</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="heart" />
          <Link to="/cardbind">{appStr.menutext.cardbind}</Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="setting" />
          <Link to="/holiday">{appStr.menutext.holiday}</Link>
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

  getCardBind = props => <CardBindContainer {...props} />

  getHoliday = props => <AddHolidayContainer {...props} />

  getSchoolUseInfo = props => <SchoolUseInfoContainer {...props} />

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
              <Route path="/cardbind" component={this.getCardBind} />
              <Route path="/useinfo" component={this.getSchoolUseInfo} />
              <Route path="/holiday" component={this.getHoliday} />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default AppView;