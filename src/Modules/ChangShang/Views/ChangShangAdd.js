import React, { Component } from 'react';
import { PostFetch } from 'Common/Helpers';
import CardHeader from 'Modules/Components/CardHeader';
import { Form, Input, Button, Card, Row, Col, Icon, message } from 'antd';
import { URL_GET_FIRM_ADD, URL_GET_FIRM_INFO, URL_GET_FIRM_UPDATE } from 'Common/Urls';
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

class ChangShangInputForm extends Component {
  getFileds = () => {
    const { editData } = this.props;
    const { getFieldDecorator } = this.props.form;
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
          {getFieldDecorator('phone', { initialValue: editData.phone })(<Input />)}
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

const ChangShangForm = Form.create({ name: 'chang_shang_add_form' })(ChangShangInputForm)

export default class ChangShangAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDataId: props.type === 'update' ? props.match.params.id : undefined,
      editData: {}
    }
  }

  componentDidMount() {
    if (this.state.editDataId) {
      PostFetch(URL_GET_FIRM_INFO, { ids: [this.state.editDataId] }).then(rs => {
        if (rs.result === 0 && rs.data && rs.data.length > 0) {
          this.setState({ editData: rs.data[0] })
        }
      })
    }
  }

  /** save */
  onHandleSubmit = (vals) => {
    const { type = 'add' } = this.props;
    let [urls,msg] = [URL_GET_FIRM_ADD, '添加'];
    if (type === 'update') {
      urls = URL_GET_FIRM_UPDATE;
      msg = '更新'
    }
    PostFetch(urls, { ...vals }).then(rs => message.info(`${msg}成功`)).catch(err => {
      message.info(`${msg}厂商信息失败`)
      console.log(`${msg}厂商信息失败`,err)
    })
  }

  render() {
    const { editData } = this.state;
    const { history, type = 'add' } = this.props;
    const headerTitle = type === 'update' ? '厂商修改' : '添加厂商';
    return (
      <div className='lx-school-action'>
        <CardHeader
          leftTitle='厂商管理'
          leftTitleChildren={[ headerTitle ]}
        />
        <ChangShangForm
          editData={editData}
          goBackPage={() => history.goBack()}
          onHandleSearch={vals => this.onHandleSubmit(vals)}
        />
      </div>
    );
  }
}