import _ from 'lodash';
import moment from 'moment';
import classname from 'classnames';
import React, { Component } from 'react';
import { PostFetch } from 'Common/Helpers';
import { URL_ADD_HOLIDAY } from 'Common/Urls';
import CardHeader from 'Modules/Components/CardHeader';
import { getYearAndMonthAndDay } from '../Store/AddHContants';
import { Form, Button, Card, Row, Col, Icon, message, DatePicker, Input, Empty  } from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 15 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 15 },
    sm: { span: 14 },
  },
};


class AddHolidayInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: [],
      dates: [],
      textAreaText: ''
    }
  }

  /**reset data */
  resetData = () => {
    this.setState({
      moment: [],
      dates: [],
      textAreaText: ''
    })
  }

  /**日期范围选择 */
  rangeHandle = (dates) => {
    const { textAreaText = ''} = this.state;
    let dateState = [];
    if (dates && dates.length !== 0) {
      const start = moment(dates[0]).format('YYYY-MM-DD');
      const end = moment(dates[1]).format('YYYY-MM-DD');
      const allDate = getYearAndMonthAndDay(start, end);
      for (let x = 0; x < allDate.length; x++) {
        dateState.push({
          date: allDate[x],
          brief: textAreaText !== '' ? textAreaText : '',
          key: x
        })
      }
    }
    this.setState({ dates: dateState, moment: dates });
  }

  /**将获取到的日期赋值到TextArea上面 */
  getAllSelectDateToTextArea = () => {
    const { dates = [] } = this.state;
    if (dates.length !== 0) {
      return dates.map((date) => {
        return (
          <div className='select_date' key={`add_holiday_selected_date_${date.key}`}>
            <div className='left'>{date.date}</div>
            <div className='content'>{date.brief}</div>
            <div className='right'><Icon type='delete' /></div>
          </div>
        )
      })
    } else {
      return (
        <div className='select_no_date'>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )
    }
  }

  /** 操作按钮DOM */
  getActionsButton = () => {
    const { dates } = this.state;
    return (
      <Row gutter={16}>
        <Col span={2} offset={8}>
          <Form.Item >
            <Button onClick={() => this.props.goBackPage()}>
              <Icon type="left" />
              返回
            </Button>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item >
            <Button onClick={() => this.resetData()}>
              重置
            </Button>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={() => this.props.onHandleSearch(dates)}>
              <Icon type="check" />
              确定
            </Button>
          </Form.Item>
        </Col>
      </Row>
    )
  }

  /**修改已选日期的描述 */
  updateSelectedDateDesc = (val) => {
    const { dates } = this.state;
    let newDates = [];
    if (dates.length !== 0) {
      newDates = _.map(dates, item => {
        item.brief = val;
        return item;
      })
    }
    this.setState({ textAreaText: val, dates: newDates })
  }

  getFileds = () => {
    const { textAreaText, dates = [] } = this.state;
    return (
      <Card>
        <Form.Item label='设置日期' {...formItemLayout} className='select_date_title'>
          <div className='select_date_header'>
            <RangePicker onChange={moment => this.rangeHandle(moment)} value={this.state.moment}/>
            <TextArea
              rows={1}
              autosize={true}
              value={textAreaText}
              placeholder='请输入日期描述'
              onChange={e => this.updateSelectedDateDesc(e.target.value)}
            />
          </div>
        </Form.Item>

        <Form.Item label='已选日期' {...formItemLayout} className='select_date_title'>
          <Card className={classname({ 'select_date_title_card': true, 'nodate': dates.length === 0 })}>
            {this.getAllSelectDateToTextArea()}
          </Card>
        </Form.Item>

        {this.getActionsButton()}
      </Card>
    )
  }

  render() {
    return this.getFileds();
  }
}
const AddHolidayForm = Form.create({ name: 'add_holiday_form' })(AddHolidayInputForm)



class AddHoliday extends Component {
  /** save */
  onHandleSubmit = (dates) => {
    PostFetch(URL_ADD_HOLIDAY, { dates }).then(rs => {
      message.success('添加成功');
    }).catch(err => {
      message.error('添加失败')
    })
  }

  render() {
    const { history } = this.props;
    return (
      <div className='lx-school-action'>
        <CardHeader
          leftTitle='节假日设置'
          leftTitleChildren={['添加节假日']}
        />
        <AddHolidayForm
          goBackPage={() => history.goBack()}
          onHandleSearch={vals => this.onHandleSubmit(vals)}
        />
      </div>
    );
  }
}
export default AddHoliday;