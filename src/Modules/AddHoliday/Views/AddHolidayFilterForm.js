import React from 'react';
import { Form, Row, Col, Button, Card, DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const DATE_FORMAT = 'YYYY-MM-DD';
const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 14 },
    sm: { span: 14 },
  },
};


class AddHolidayFilter extends React.Component {
  handleReset = () => {
    this.props.form.resetFields();
  }

  /**获取指定月份的开始日期和结束日期 */
  getMonthDateRange = (n = 0) => {
    const startDate = moment().month(moment().month() + n).startOf('month').format(DATE_FORMAT);
    const endDate = moment().month(moment().month() + n).endOf('month').format(DATE_FORMAT);
    return [startDate, endDate];
  }

  getFields() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row gutter={25}>
        <Col span={8}>
          <Form.Item label='选择区间日期' {...formItemLayout}>
            {getFieldDecorator('rangePicker', {
              rules: [{ required: true, message: '请选择日期' }],
              initialValue: [moment(this.getMonthDateRange()[0], DATE_FORMAT), moment(this.getMonthDateRange()[1],DATE_FORMAT)]
            })(<RangePicker format={DATE_FORMAT}  />)}
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