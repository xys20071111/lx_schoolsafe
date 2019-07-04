import React from 'react';
import moment from 'moment';
import { Form, Row, Col, Button, Card, DatePicker } from 'antd';
import { formItemLayout3 } from 'Modules/ChangShang/Store/CSContants';
const { RangePicker } = DatePicker;
const DATE_FORMAT = 'YYYY-MM-DD';


class AddHolidayFilter extends React.Component {
  handleReset = () => {
    this.props.form.resetFields();
    this.props.resetFields();
  }

  getFields() {
    const { filter, onHandleRange } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Row gutter={25}>
        <Col span={8}>
          <Form.Item label='选择区间日期' {...formItemLayout3}>
            {getFieldDecorator('rangePicker', {
              rules: [{ required: true, message: '请选择日期' }],
              initialValue: [moment(filter.begin), moment(filter.end)]
            })(<RangePicker format={DATE_FORMAT} onChange={range => onHandleRange(moment(range[0]).format(DATE_FORMAT), moment(range[1]).format(DATE_FORMAT))} />)}
          </Form.Item>
        </Col>

        <Col span={8}>
          <Button style={{ marginRight: '50px', marginLeft: '50px' }} onClick={this.handleReset}>
            重置
          </Button>
          <Button style={{ marginRight: '50px' }}  icon="plus-circle" onClick={() => this.props.onHandleAddHoliday()}>
            添加节假日
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
          begin: moment(fieldsValue.rangePicker[0]).format('YYYY-MM-DD'),
          end: moment(fieldsValue.rangePicker[1]).format('YYYY-MM-DD'),
        }
        this.props.onHandleSearch(params);
      }
    });
  }

  render() {
    return (
      <Card>
        <Form className="holiday-search-form" onSubmit={this.handleSearch} >
          {this.getFields()}
        </Form>
      </Card>
    );
  }
}
const AddHolidayFilterForm = Form.create({ name: 'holiday_filter' })(AddHolidayFilter);
export default AddHolidayFilterForm;