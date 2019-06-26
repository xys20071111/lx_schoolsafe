import React, { Component } from 'react';
import { PostFetch } from 'Common/Helpers';
import CardHeader from 'Modules/Components/CardHeader';
import { Form, Input, Button, Card, Row, Col, Icon, message, Select } from 'antd';
import { URL_GET_FIRM_UPDATE } from 'Common/Urls';
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

class CardBindUpdateInputForm extends Component {
  getFileds = () => {
    const { editData } = this.props;
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );



    return (
      <Card>
        <Form.Item {...formItemLayout} label='厂商名称' >
          {getFieldDecorator('name', {
            initialValue: editData.name,
            rules: [
              {
                required: true,
                message: '请输入厂商名称',
              },
            ],
          })(<Input placeholder='输入厂商名称' />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label='厂商地址'>
          {getFieldDecorator('address', { initialValue: editData.address })(<Input placeholder='输入地址,详细到门牌号' />)}
        </Form.Item>

        <Form.Item label='联系人' {...formItemLayout}>
          {getFieldDecorator('contact', { initialValue: editData.contact })(<Input />)}
        </Form.Item>

        <Form.Item label='联系电话' {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: editData.phone,
            rules: [
              {
                message:'只能输入数字',
                pattern: /^[0-9]+$/
              },
              {
                len: 11,
                message: '长度需11个数字',
              }
            ]
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
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
          name: fieldsValue['name'],
          address: fieldsValue['address'],
          contact: fieldsValue['contact'],
          phone: fieldsValue['phone'],
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

const CardBindUpdateForm = Form.create({ name: 'chang_shang_add_form' })(CardBindUpdateInputForm)

export default class CardBindUpdate extends Component {
  /** save */
  onHandleSubmit = (vals) => {
    PostFetch(URL_GET_FIRM_UPDATE, { ...vals }).then(rs => message.info('更新绑卡成功')).catch(err => {
      message.info('更新绑卡失败')
      console.log('更新绑卡失败',err)
    })
  }

  render() {
    const { history } = this.props;
    console.log('dddddddddddddd', this.props)
    return (
      <div className='lx-school-action'>
        <CardHeader
          leftTitle='一卡通绑定'
          leftTitleChildren={[ '一卡通修改' ]}
        />
        <CardBindUpdateForm
          editData={this.props.location.record}
          goBackPage={() => history.go(-1)}
          onHandleSearch={vals => this.onHandleSubmit(vals)}
        />
      </div>
    );
  }
}