import React from 'react';
import { Form, Row, Col, InputNumber, Button, Card } from 'antd';


class CardBindFilter extends React.Component {
  handleReset = () => {
    this.props.form.resetFields();
    this.props.onResetDate();
  }

  getFields() {
    const { filter } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Row gutter={20}>
        <Col span={5}>
          <Form.Item label='学校ID' >
            {getFieldDecorator('sid', { initialValue: filter.sid })(<InputNumber min={0} max={99999999999999} placeholder='请输入学校ID' />)}
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item label='班级ID'>
            {getFieldDecorator('cid', { initialValue: filter.cid })(<InputNumber min={0} max={99999999999999} placeholder='请输入班级ID' />)}
          </Form.Item>
        </Col>

        <Col span={8}>
          <Button style={{ marginRight: '50px', marginLeft: '50px' }} onClick={this.handleReset}>
            重置
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
          cid: fieldsValue.cid === null ? undefined : fieldsValue.cid,
          sid: fieldsValue.sid === null ? undefined : fieldsValue.sid, // 学校id
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
const CardBindFilterForm = Form.create({ name: 'card_bind_filter' })(CardBindFilter);
export default CardBindFilterForm;