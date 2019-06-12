import React from 'react';
import { SB_SELECT_OPTIONS } from 'Modules/SheBei/Store/SBContants';
import { Form, Row, Col, Input, Button, Select, Card } from 'antd';
const { Option } = Select;


class LocationsFilter extends React.Component {
  handleReset = () => {
    this.props.form.resetFields();
  }

  getFields() {
    const { getFieldDecorator } = this.props.form;
    const options = SB_SELECT_OPTIONS.map(option => <Option key={option.id} value={option.id}>{option.name}</Option>);

    return (
      <Row gutter={25}>
        <Col span={5}>
          <Form.Item label='学校id'>
            {getFieldDecorator('school')(<Input />)}
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item label='位置类型' >
            {getFieldDecorator('type')(<Select placeholder='请选择设备类型'>{options}</Select>)}
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label='安装位置' >
            {getFieldDecorator('number')(<Input />)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Button style={{ marginRight: '50px', marginLeft: '50px' }} onClick={this.handleReset}>
            重置
          </Button>
          <Button style={{ marginRight: '50px' }}  icon="plus-circle" onClick={() => this.props.onHandleAction()}>
            添加位置
          </Button>
          <Button type="primary" htmlType="submit" icon='search'>
            搜索
          </Button>
        </Col>
      </Row>
    )
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        console.log('Received values of form: ', fieldsValue);
      }
    });
  }

  render() {
    return (
      <Card>
        <Form className="shebei-search-form" onSubmit={this.handleSearch} >
          {this.getFields()}
        </Form>
      </Card>
    );
  }
}
const AnZhuangFilterForm = Form.create({ name: 'shebei_filter' })(LocationsFilter);
export default AnZhuangFilterForm;