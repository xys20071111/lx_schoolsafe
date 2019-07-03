import React, { Component } from 'react';
import _ from 'lodash';
import { PostFetch } from 'Common/Helpers';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CardHeader from 'Modules/Components/CardHeader';
import { formItemLayout } from 'Modules/ChangShang/Store/CSContants';
import { makeSelectVendors, SB_SELECT_OPTIONS } from 'Modules/SheBei/Store/SBContants';
import { Form, Input, Button, Card, Row, Col, Icon, message, Select } from 'antd';
import { URL_GET_DEVICES_ADD, URL_GET_DEVICES_INFO, URL_GET_DEVICES_UPDATE } from 'Common/Urls';
const { Option } = Select;

class SheBeiInputForm extends Component {
  getAllVendors = () => {
    const { vendors = [] } = this.props;
    const allOptions = vendors.map(option => <Option key={option.id} value={option.id}>{option.name}</Option>);
    return <Select placeholder='请选择厂商'>{allOptions}</Select>;
  }
  getFileds = () => {
    const { editData } = this.props;
    const { getFieldDecorator } = this.props.form;
    const options = SB_SELECT_OPTIONS.map(option => <Option key={option.id} value={option.id}>{option.name}</Option>);
    return (
      <Card>
        <Form.Item label='设备序列号' {...formItemLayout}>
          {getFieldDecorator('serial', {
            initialValue: editData.serial,
            rules: [{ required: true, message: '请输入设备序列号' }]
          })(<Input placeholder='请输入序列号' />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='设备型号'>
          {getFieldDecorator('model', {
            initialValue: editData.model,
            rules: [{ required: true, message: '请输入设备型号' }]
          })(<Input placeholder='请输入设备型号' />)}
        </Form.Item>

        <Form.Item label='设备厂商' {...formItemLayout}>
          {getFieldDecorator('vendor', {
            initialValue: editData.vendor,
            rules: [{ required: true, message: '请选择厂商' }]
          })(this.getAllVendors())}
        </Form.Item>

        <Form.Item {...formItemLayout} label='设备类型' >
          {getFieldDecorator('type', { initialValue: 0 })(<Select placeholder='请选择设备类型'>{options}</Select>)}
        </Form.Item>

        <Row gutter={16}>
          <Col span={2} offset={10}>
            <Form.Item >
              <Button onClick={() => this.props.goBackPage()}>
                <Icon type="left" />
                返回
              </Button>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <Icon type="check" />
                确定
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    )
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const values = {
          id: this.props.editData.id,
          type: (!_.isNull(fieldsValue['type']) && fieldsValue['type']) ? fieldsValue['type'] : 0,
          model: (!_.isNull(fieldsValue['model']) && fieldsValue['model']) ? fieldsValue['model'] : '',
          serial: (!_.isNull(fieldsValue['serial']) && fieldsValue['serial']) ? fieldsValue['serial'] : '',
          vendor: parseInt(fieldsValue['vendor']),
        };
        this.props.onHandleSearch(values);
      }
    });
  }
  render() {
    return (
      <Form onSubmit={this.handleSearch}>
        {this.getFileds()}
      </Form>
    )
  }
}
const SheBeiForm = Form.create({ name: 'she_bei_add_form' })(SheBeiInputForm)


class SheBeiAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDataId: props.type === 'update' ? props.match.params.id : undefined,
      editData: {}
    }
  }
  componentDidMount() {
    if (this.state.editDataId) {
      PostFetch(URL_GET_DEVICES_INFO, { ids: [this.state.editDataId] }).then(rs => {
        if (rs.result === 0 && rs.data && rs.data.length > 0) {
          this.setState({ editData: rs.data[0] })
        }
      })
    }
  }
  /** save */
  onHandleSubmit = (vals) => {
    const { type = 'add', history } = this.props;
    let [urls,msg] = [URL_GET_DEVICES_ADD, '添加'];
    if (type === 'update') {
      urls = URL_GET_DEVICES_UPDATE;
      msg = '更新'
    }
    PostFetch(urls, { ...vals }).then(rs => {
      console.log('4444',rs);
      if (rs.result === 0) {
        message.info(`${msg}成功`);
        history.goBack();
      } else {
        throw(rs.msg);
      }
    }).catch(err => {
      message.info(`${msg}设备信息失败`);
      console.log(`${msg}设备信息失败`,err);
    })
  }
  render() {
    const { editData } = this.state;
    const { history, type = 'add', vendors } = this.props;
    const headerTitle = type === 'update' ? '设备修改' : '添加设备';
    return (
      <div className='lx-school-action'>
        <CardHeader
          leftTitle='设备管理'
          leftTitleChildren={[ headerTitle ]}
        />
        <SheBeiForm
          vendors={vendors}
          editData={editData}
          goBackPage={() => history.goBack()}
          onHandleSearch={vals => this.onHandleSubmit(vals)}
        />
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  vendors: makeSelectVendors
})
export default connect(mapStateToProps)(SheBeiAdd);