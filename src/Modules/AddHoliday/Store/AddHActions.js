/********************ActionType**********************/
export const GET_HOLIDAY_LIST ='get/holiday/data';
export const SET_HOLIDAY_RANGE ='set/holiday/range';
export const RESET_HOLIDAY_DATE = 'reset/holiday/data';


/** 获取节假日数据 */
export const getHolidayData = (list) => ({
  type: GET_HOLIDAY_LIST, list
})

/** 设置过滤时间范围 */
export const setHolidayRange = (start, end) => ({
  type: SET_HOLIDAY_RANGE, start, end
})

/** reset data */
export const resetHolidayData = () => ({
  type: RESET_HOLIDAY_DATE
})