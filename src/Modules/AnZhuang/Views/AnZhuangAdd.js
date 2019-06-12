import React, { Component } from 'react';
import { PostFetch } from 'Common/Helpers';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CardHeader from 'Modules/Components/CardHeader';
import { makeSelectVendors, SB_SELECT_OPTIONS } from 'Modules/SheBei/Store/SBContants';
import { Form, Input, Button, Card, Row, Col, Icon, message, Select } from 'antd';
import { URL_GET_DEVICES_ADD, URL_GET_DEVICES_INFO, URL_GET_DEVICES_UPDATE } from 'Common/Urls';
const { Option } = Select;
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


class LocationsFormInputForm extends Component {
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
        <Form.Item {...formItemLayout} label='设备类型' >
          {getFieldDecorator('type')(<Select placeholder='请选择设备类型'>{options}</Select>)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='设备型号'>
          {getFieldDecorator('model', { initialValue: editData.model })(<Input placeholder='请输入设备型号' />)}
        </Form.Item>

        <Form.Item label='设备序列号' {...formItemLayout}>
          {getFieldDecorator('serial', { initialValue: editData.serial })(<Input />)}
        </Form.Item>

        <Form.Item label='设备厂商' {...formItemLayout}>
          {getFieldDecorator('vendor', { initialValue: editData.vendor })(this.getAllVendors())}
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
          type: fieldsValue['type'],
          model: fieldsValue['model'],
          serial: fieldsValue['serial'],
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

const LocationsForm = Form.create({ name: 'she_bei_add_form' })(LocationsFormInputForm)

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
      PostFetch(URL_GET_DEVICES_INFO, { ids: [this.state.editDataId] }).then(rs => {
        if (rs.result === 0 && rs.data && rs.data.length > 0) {
          this.setState({ editData: rs.data[0] })
        }
      })
    }
  }

  /** save */
  onHandleSubmit = (vals) => {
    const { type = 'add' } = this.props;
    let [urls,msg] = [URL_GET_DEVICES_ADD, '添加'];
    if (type === 'update') {
      urls = URL_GET_DEVICES_UPDATE;
      msg = '更新'
    }
    console.log('5555:', vals)
    PostFetch(urls, { ...vals }).then(rs => {
      console.log('位置：',rs)
      message.info(`${msg}成功`);
    }).catch(err => {
      message.info(`${msg}位置信息失败`)
      console.log(`${msg}位置信息失败`,err)
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

export default connect(mapStateToProps)(AnZhuangAdd);