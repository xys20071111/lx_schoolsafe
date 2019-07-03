import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { PostFetch } from 'Common/Helpers';
import appStr from 'Styles/JS/lxschoolsafe';
import CardHeader from 'Modules/Components/CardHeader';
import { createStructuredSelector } from 'reselect';
import { formItemLayout } from 'Modules/ChangShang/Store/CSContants';
import { AZ_POSITION_NUMBER_OPTIONS } from 'Modules/AnZhuang/Store/AZContants';
import { makeSelectVendors, makeSelectDevices } from '../Store/SchoolUseContants';
import { Form, Input, Button, Card, Row, Col, Icon, message, Select, InputNumber } from 'antd';
import { URL_GET_SCHOOL_USE_ADD, URL_GET_SCHOOL_USE_UPDATE, URL_GET_LOCATIONS_INFO, URL_GET_SCHOOL_USE_INFO } from 'Common/Urls';
const { Option } = Select;
const { TextArea } = Input;

class SchoolUseInputForm extends Component {
  /**学校字段 */
  getSchoolFiled = () => {
    const { editData, type, form, searchSchoolLocation } = this.props;
    if (_.isEqual(type, 'update')) {
      return [<Form.Item {...formItemLayout} label='学校' key='school_name'>
        {form.getFieldDecorator('school_name', {
          initialValue: editData && editData.school_name ? editData.school_name : '',
        })(<Input disabled={true} />)}
      </Form.Item>,
      <Form.Item {...formItemLayout} label='学校ID' key='school'>
      {form.getFieldDecorator('school', {
        initialValue: editData && editData.school ? editData.school : '',
      })(<Input disabled={true} />)}
    </Form.Item>]
    }
    return <Form.Item {...formItemLayout} label='学校ID' >
      {form.getFieldDecorator('school', {
        rules: [{ required: true, message: '请输入学校ID'}],
        initialValue: editData && editData.school ? editData.school : '',
      })(<InputNumber min={0} max={99999999999999} placeholder='请输入学校ID' />)}
      &nbsp;&nbsp;&nbsp;
      <Button onClick={() => searchSchoolLocation(form.getFieldValue('school'))}>查询安装位置</Button>
    </Form.Item>
  }
  /**选择厂商 */
  getChangShang = () => {
    const { vendors = [], editData } = this.props;
    const allOptions = vendors.map(option => <Option key={option.id} value={option.id}>{option.name}</Option>);
    return <Form.Item {...formItemLayout} label='厂商名称'>
      {this.props.form.getFieldDecorator('vendor', {
        rules: [{ required: true, message: '请选择厂商' }],
        initialValue: editData && editData.vendor
      })(<Select placeholder='请选择厂商'>{allOptions}</Select>)}
    </Form.Item>
  }
  /**选择设备 */
  getSheBei = () => {
    const { devices, editData, form } = this.props;
    const vendorId = form.getFieldValue('vendor'); // 需要根据厂商名称来过滤设备名称   厂商id
    const disabled = (_.isEqual(vendorId) || !vendorId) ? true : false;
    const placeholder = disabled ? '请先选择厂商' : '请选择设备';
    const allOptions = [];
    for (let x = 0; x < devices.length; x++) {
      if (vendorId && !_.isEqual(vendorId) && _.isEqual(devices[x].vendor, vendorId)) {
        allOptions.push(<Option key={devices[x].id} value={devices[x].id}>
          {`(设备型号/设备序列号): [${_.isEmpty(devices[x].model) ? '--' : devices[x].model} / ${devices[x].serial}]`}
        </Option>)
      }
    }

    return <Form.Item {...formItemLayout} label='设备名称'>
      {this.props.form.getFieldDecorator('device', {
        rules: [{ required: true, message: placeholder }],
        initialValue: editData && editData.device
      })(<Select placeholder={placeholder} disabled={disabled}>{allOptions}</Select>)}
    </Form.Item>
  }
  /**获取安装位置 */
  getLocationFiled = () => {
    const { location, editData } = this.props;
    const allOptions = location.map(option => {
      const locaType = _.find(AZ_POSITION_NUMBER_OPTIONS, loca => _.isEqual(loca.id, option.type));
      return <Option key={option.id} value={option.id}>
        {`(位置类型/位置编号): ${locaType.name} / ${option.number}`}
      </Option>
    });

    return <Form.Item {...formItemLayout} label='安装位置'>
      {this.props.form.getFieldDecorator('location', {
        rules: [{ required: true, message: '请选择位置类型'}],
        initialValue: editData && editData.location
      })(<Select placeholder='请输入学校ID以查询学校位置'>{allOptions}</Select>)}
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
    return (
      <Card>
        {this.getChangShang()}
        {this.getSheBei()}
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
          brief: fieldsValue['brief'] ? fieldsValue['brief'] : ''
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
    this.state = {
      editDataId: props.type === 'update' ? parseInt(props.match.params.id) : undefined,
      location: [],
      editData: {}
    }
    if (_.isEqual(props.type, 'update') && props.location.record) {
      this.searchLocation(props.location.record.school);
    }
  }
  componentDidMount() {
    if (this.state.editDataId) {
      PostFetch(URL_GET_SCHOOL_USE_INFO, { id: this.state.editDataId }).then(rs => {
        if (rs.result === 0 && rs.data && rs.data.length > 0) {
          this.setState({ editData: rs.data[0] })
        }
      })
    }
  }
  /** save */
  onHandleSubmit = (vals) => {
    let [urls,msg] = [URL_GET_SCHOOL_USE_ADD, '添加'];
    if (this.props.type === 'update') {
      urls = URL_GET_SCHOOL_USE_UPDATE;
      msg = '更新'
    }

    PostFetch(urls, { devices: [vals] }).then(rs => {
      if (rs.data && rs.data[0].state) {
        message.info(`${msg}成功`);
        this.props.history.goBack();
      } else {
        throw(rs.data[0].msg);
      }
    }).catch(err => {
      message.error(`${msg}设备信息失败`);
      console.log(`${msg}设备信息失败`,err)
    })
  }
  /** search school location */
  searchLocation = (id) => {
    if (!id || id === undefined) {
      message.error('学校ID不能为空');
      return;
    }
    PostFetch(URL_GET_LOCATIONS_INFO, { school: id }).then(rs => {
      if (_.isEqual(rs.result, 0) && rs.data && rs.data.length > 0) {
        this.setState({ location: rs.data });
      }
    }).catch(err => message.error(err.msg))
  }


  render() {
    const { history, type = 'add' } = this.props;
    const headerTitle = type === 'update' ? '修改设备' : '添加设备';
    return (
      <div className='lx-school-action'>
        <CardHeader
          leftTitle={appStr.menutext.useinfo}
          leftTitleChildren={[ headerTitle ]}
        />
        <SchoolUseForm
          {...this.props}
          location={this.state.location}
          editData={this.state.editData}
          goBackPage={() => history.goBack()}
          onHandleSearch={vals => this.onHandleSubmit(vals)}
          searchSchoolLocation={schoolId => this.searchLocation(schoolId)}
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