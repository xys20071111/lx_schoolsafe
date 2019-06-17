/********************ActionType**********************/
export const GET_HOLIDAY_LIST ='get/holiday/data';


/** 获取节假日数据 */
export const getHolidayData = (list) => ({
  type: GET_HOLIDAY_LIST, list
})
