import React from 'react';
import { SB_SELECT_OPTIONS } from 'Modules/SheBei/Store/SBContants';
import { Form, Row, Col, Input, Button, Select, Card } from 'antd';
const { Option } = Select;


class SheBeiFilter extends React.Component {
  getAllVendors = () => {
    const { vendors = [] } = this.props;
    const allOptions = vendors.map(option => <Option key={option.id} value={option.id}>{option.name}</Option>);
    return <Select placeholder='请选择厂商'>{allOptions}</Select>;
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  getFields() {
    const { getFieldDecorator } = this.props.form;
    const options = SB_SELECT_OPTIONS.map(option => <Option key={option.id} value={option.id}>{option.name}</Option>);

    return (
      <Row gutter={25}>
        <Col span={5}>
          <Form.Item label='厂商名称'>
            {getFieldDecorator('vendor')(this.getAllVendors())}
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item label='设备类型' >
            {getFieldDecorator('type')(<Select placeholder='请选择设备类型'>{options}</Select>)}
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label='设备型号' >
            {getFieldDecorator('model')(<Input />)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Button style={{ marginRight: '50px', marginLeft: '50px' }} onClick={this.handleReset}>
            重置
          </Button>
          <Button style={{ marginRight: '50px' }}  icon="plus-circle" onClick={() => this.props.onHandleAction()}>
            添加设备
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
        const params = {
          vendor: fieldsValue.vendor,
          type: fieldsValue.type,
          model: fieldsValue.model === '' ? undefined : fieldsValue.model
        }
        this.props.onHandleSearch(params);
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
const SheBeiFilterForm = Form.create({ name: 'shebei_filter' })(SheBeiFilter);
export default SheBeiFilterForm;