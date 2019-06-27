import React from 'react';
import { AZ_POSITION_NUMBER_OPTIONS } from 'Modules/AnZhuang/Store/AZContants';
import { Form, Row, Col, Input, Button, Select, Card } from 'antd';
const { Option } = Select;


class LocationsFilter extends React.Component {
  getAllVendors = () => {
    const { vendors = [] } = this.props;
    const allOptions = vendors.map(option => <Option key={option.id} value={option.id}>{option.name}</Option>);
    return <Select placeholder='请选择厂商'>{allOptions}</Select>;
  }

  handleReset = () => {
    this.props.form.resetFields();
    this.props.onResetDate();
  }

  getFields() {
    const { getFieldDecorator } = this.props.form;
    const options = AZ_POSITION_NUMBER_OPTIONS.map(option => <Option key={`anzhuang_type_${option.id}`} value={option.id}>{option.name}</Option>);

    return (
      <Row gutter={25}>
        <Col span={5}>
          <Form.Item label='学校id'>
            {getFieldDecorator('school')(<Input placeholder='请输入学校Id'/>)}
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item label='位置类型' >
            {getFieldDecorator('type')(<Select placeholder='请选择位置类型'>
              <Option value={-1}>全部</Option>
              {options}
            </Select>)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='厂商名称'>
            {getFieldDecorator('vendor')(this.getAllVendors())}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Button style={{ marginRight: '50px', marginLeft: '50px' }} onClick={this.handleReset}>
            重置
          </Button>
          <Button style={{ marginRight: '50px' }}  icon="plus-circle" onClick={() => this.props.onHandleAction()}>
            设备添加
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
          school: (fieldsValue.school === null || !fieldsValue.school) ? undefined : parseInt(fieldsValue.school),
          vendor: (fieldsValue.vendor === null || !fieldsValue.vendor) ? undefined : parseInt(fieldsValue.vendor),
          types: (fieldsValue.type === -1 || !fieldsValue.type) ? undefined : fieldsValue.type,
        }
        console.log('params:', params, fieldsValue)
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
const AnZhuangFilterForm = Form.create({ name: 'shebei_filter' })(LocationsFilter);
export default AnZhuangFilterForm;