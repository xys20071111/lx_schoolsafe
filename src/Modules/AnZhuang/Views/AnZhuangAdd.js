import React, { Component } from 'react';
import moment from 'moment';
import { PostFetch } from 'Common/Helpers';
import CardHeader from 'Modules/Components/CardHeader';
import { formItemLayout, formItemLayout2 } from 'Modules/ChangShang/Store/CSContants';
import { AZ_POSITION_NUMBER_OPTIONS } from 'Modules/AnZhuang/Store/AZContants';
import { Form, Input, Button, Card, Row, Col, Icon, message, Select, InputNumber, TimePicker } from 'antd';
import { URL_GET_LOCATIONS_ADD, URL_GET_LOCATIONS_INFO, URL_GET_LOCATIONS_UPDATE } from 'Common/Urls';
const { Option } = Select;
const { TextArea } = Input;


class LocationsFormInputForm extends Component {
  getAllTypes = () => {
    const allOptions = AZ_POSITION_NUMBER_OPTIONS.map(option => <Option key={option.id} value={option.id}>{option.name}</Option>);
    return <Select placeholder='请选择位置类型'>{allOptions}</Select>;
  }

  getFileds = () => {
    const { editData, type } = this.props;
    const { getFieldDecorator } = this.props.form;
    const disabled = (type === 'update') ? true : false;
    const openTime = editData.open_time ? new Date(editData.open_time) : undefined;
    const closeTime = editData.close_time ? new Date(editData.close_time) : undefined;
console.log('editData:',editData)
    return (
      <Card>
        <Form.Item {...formItemLayout} label='学校ID' >
          {getFieldDecorator('school', {
            rules: [{ required: true, message: '请输入学校ID' }],
            initialValue: editData.school
          })(<InputNumber min={0} max={99999999999999} placeholder='请输入学校ID' disabled={disabled}/>)}
        </Form.Item>

        {disabled && <Form.Item {...formItemLayout} label='学校名称' >
          {getFieldDecorator('school_name', {
            initialValue: editData.school_name
          })(<Input disabled={disabled} />)}
        </Form.Item>}

        <Form.Item label='位置编号' {...formItemLayout}>
          {getFieldDecorator('number', {
            rules: [{ required: true, message: '请输入位置编号' }],
            initialValue: editData.number
          })(<InputNumber min={0} max={99999999999999} placeholder='请输入位置编号' />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='位置类型'>
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择位置类型' }],
            initialValue: editData.type
          })(this.getAllTypes())}
        </Form.Item>

        <Row gutter={24}>
          <Col span={6} offset={6}>
            <Form.Item label='开门时间' {...formItemLayout}>
              {getFieldDecorator('open_time', {
                initialValue: openTime ? moment({
                  hour: openTime.getHours(),
                  minute: openTime.getMinutes(),
                  seconds: openTime.getSeconds()
                }) : moment({ hour: 24, minute: 0 })
              })(<TimePicker format={'HH:mm:ss'} />)}
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label='关门时间' {...formItemLayout2}>
              {getFieldDecorator('close_time', {
                initialValue: closeTime ? moment({
                  hour: closeTime.getHours(),
                  minute: closeTime.getMinutes(),
                  seconds: closeTime.getSeconds()
                }) : moment({ hour: 23, minute: 0 })
              })(<TimePicker format={'HH:mm:ss'} />)}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label='位置描述' {...formItemLayout}>
          {getFieldDecorator('brief', { initialValue: editData.brief })(<TextArea rows={5} placeholder='请输入位置描述'/>)}
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
          school: fieldsValue.school,
          type: fieldsValue['type'],
          number: fieldsValue['number'],
          brief: fieldsValue['brief'],
          open_time: fieldsValue['open_time'].format('HH:mm:ss'),
          close_time: fieldsValue['close_time'].format('HH:mm:ss'),
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

const LocationsForm = Form.create({ name: 'an_zhuang_add_form' })(LocationsFormInputForm)

class AnZhuangAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDataId: props.type === 'update' ? props.match.params.id : undefined,
      editData: {}
    }
  }

  componentDidMount() {
    if (this.state.editDataId) {
      PostFetch(URL_GET_LOCATIONS_INFO, { ids: [this.state.editDataId] }).then(rs => {
        if (rs.result === 0 && rs.data && rs.data.length > 0) {
          this.setState({ editData: rs.data[0] })
        }
      })
    }
  }

  /** save */
  onHandleSubmit = (vals) => {
    const { type = 'add', history } = this.props;
    let [urls,msg] = [URL_GET_LOCATIONS_ADD, '添加'];
    if (type === 'update') {
      urls = URL_GET_LOCATIONS_UPDATE;
      msg = '更新'
    }
    console.log('5555555555555:',vals)
    PostFetch(urls, { ...vals }).then(rs => {
      console.log('6666666666666:',rs)
      if (rs.result === 0) {
        message.info(`${msg}成功`);
        history.goBack();
      } else {
        throw(rs.msg);
      }
    }).catch(err => {
      message.error(`${msg}位置信息失败`);
      console.log(`${msg}位置信息失败`,err);
    })
  }

  render() {
    const { editData } = this.state;
    const { history, type = 'add', vendors } = this.props;
    const headerTitle = type === 'update' ? '位置修改' : '添加位置';
    return (
      <div className='lx-school-action'>
        <CardHeader
          leftTitle='安装位置'
          leftTitleChildren={[ headerTitle ]}
        />
        <LocationsForm
          type={type}
          vendors={vendors}
          editData={editData}
          goBackPage={() => history.goBack()}
          onHandleSearch={vals => this.onHandleSubmit(vals)}
        />
      </div>
    );
  }
}

export default AnZhuangAdd;