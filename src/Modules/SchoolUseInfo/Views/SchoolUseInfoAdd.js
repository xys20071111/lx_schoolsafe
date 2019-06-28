import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { PostFetch } from 'Common/Helpers';
import CardHeader from 'Modules/Components/CardHeader';
import { createStructuredSelector } from 'reselect';
import { AZ_POSITION_NUMBER_OPTIONS } from 'Modules/AnZhuang/Store/AZContants';
import { makeSelectVendors, makeSelectDevices } from '../Store/SchoolUseContants';
import { Form, Input, Button, Card, Row, Col, Icon, message, Select, InputNumber } from 'antd';
import { URL_GET_SCHOOL_USE_ADD, URL_GET_SCHOOL_USE_UPDATE } from 'Common/Urls';
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
};

class SchoolUseInputForm extends Component {
  /**学校字段 */
  getSchoolFiled = () => {
    const { editData, types, form } = this.props;
    if (_.isEqual(types, 'update')) {
      return <Form.Item {...formItemLayout} label='学校' >
        {form.getFieldDecorator('school_name', {
          initialValue: editData && editData.school_name ? editData.school_name : '',
        })(<Input />)}
      </Form.Item>
    }
    return <Form.Item {...formItemLayout} label='学校ID' >
      {form.getFieldDecorator('school', {
        initialValue: editData && editData.school ? editData.school : '',
      })(<InputNumber min={0} max={99999999999999} placeholder='请输入学校ID' />)}
    </Form.Item>
  }
  /**选择厂商 */
  getChangShang = () => {
    const { vendors = [], editData } = this.props;
    const allOptions = vendors.map(option => <Option key={option.id} value={option.id}>{option.name}</Option>);
    return <Form.Item {...formItemLayout} label='厂商名称'>
      {this.props.form.getFieldDecorator('vendor', {
        rules: [{ required: true, message: '请选择厂商' }],
        initialValue: editData.vendor
      })(<Select placeholder='请选择厂商'>{allOptions}</Select>)}
    </Form.Item>
  }
  /**选择设备 */
  getSheBei = () => {
    const { devices, editData } = this.props;
    const allOptions = devices.map(option => {
      return <Option key={option.id} value={option.id}>
        {`(设备型号/设备序列号): [${_.isEmpty(option.model) ? '--' : option.model} / ${option.serial}]`}
      </Option>
    });
    return <Form.Item {...formItemLayout} label='设备名称'>
      {this.props.form.getFieldDecorator('device', {
        rules: [{ required: true, message: '请选择设备' }],
        initialValue: editData.device
      })(<Select placeholder='请选择设备'>{allOptions}</Select>)}
    </Form.Item>
  }

  /**获取学校位置 */
  getLocationFiled = () => {
    const { devices } = this.props;
    const allOptions = devices.map(option => {
      return <Option key={option.id} value={option.id}>
        {`(设备型号/设备序列号): ${_.isEmpty(option.model) ? '--' : option.model}`}
      </Option>
    });
    return <Form.Item {...formItemLayout} label='安装位置'>
      {this.props.form.getFieldDecorator('location')(<Select placeholder='请输入学校ID以查询学校位置'>{allOptions}</Select>)}
    </Form.Item>
  }

  /**位置类型 */
  getLocationType = () => {
    const options = AZ_POSITION_NUMBER_OPTIONS.map(option => <Option key={`location_type_${option.id}`} value={option.id}>{option.name}</Option>);
    return <Form.Item {...formItemLayout} label='位置类型'>
      {this.props.form.getFieldDecorator('loc_type', {
        rules: [{ required: true, message: '请选择位置类型'}],
        initialValue: this.props.editData.loc_type
      })(<Select placeholder='请选择位置类型'>{options}</Select>)}
    </Form.Item>
  }

  /**获取位置描述 */
  getLocationDesc = () => {
    const { editData } = this.props;
    const { getFieldDecorator } = this.props.form;

    return <Form.Item label='位置描述' {...formItemLayout}>
      {getFieldDecorator('brief', { initialValue: editData && editData.loc_brief })(<TextArea rows={5} placeholder='请输入位置描述'/>)}
    </Form.Item>
  }

  /**操作按钮 */
  getFormButton = () => {
    return <Row gutter={16}>
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
  }


  getFileds = () => {
    const { editData } = this.props;
    const { getFieldDecorator } = this.props.form;
console.log('66666666666', this.props)
    return (
      <Card>
        {this.getChangShang()}
        {this.getSheBei()}
        {this.getLocationType()}
        {this.getSchoolFiled()}
        {this.getLocationFiled()}
        {this.getLocationDesc()}
        {this.getFormButton()}
      </Card>
    )
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const values = {
          id: this.props.editData.id,
          vendor: fieldsValue['vendor'],
          device: fieldsValue['device'],
          school: fieldsValue['school'],
          location: fieldsValue['location'],
          brief: fieldsValue['brief'],
          loc_brief: fieldsValue['brief'],
          loc_type: fieldsValue['loc_type']
        };
        const newObject = Object.assign(this.props.editData, values);
        this.props.onHandleSearch(newObject);
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

const SchoolUseForm = Form.create({ name: 'chool_useinfo_add_form' })(SchoolUseInputForm)

class SchoolUseInfoAdd extends Component {
  constructor(props) {
    super(props);
    this.editData = props.type === 'update' ? props.location.record : {};
  }

  /** save */
  onHandleSubmit = (vals) => {
    let [urls,msg] = [URL_GET_SCHOOL_USE_ADD, '添加'];
    if (this.props.type === 'update') {
      urls = URL_GET_SCHOOL_USE_UPDATE;
      msg = '更新'
    }
    console.log('fanzhengbiap:',vals)
    PostFetch(urls, { devices: [vals] }).then(rs => {
      console.log('ttttttttttttttttt:',rs);
      message.info(`${msg}成功`)
    }).catch(err => {
      message.info(`${msg}设备信息失败`)
      console.log(`${msg}设备信息失败`,err)
    })
  }

  render() {
    const { history, type = 'add' } = this.props;
    const headerTitle = type === 'update' ? '修改设备' : '添加设备';
    return (
      <div className='lx-school-action'>
        <CardHeader
          leftTitle='学校设备使用信息'
          leftTitleChildren={[ headerTitle ]}
        />
        <SchoolUseForm
          {...this.props}
          editData={this.editData}
          goBackPage={() => history.goBack()}
          onHandleSearch={vals => this.onHandleSubmit(vals)}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  vendors: makeSelectVendors,
  devices: makeSelectDevices
})
export default connect(mapStateToProps)(SchoolUseInfoAdd);