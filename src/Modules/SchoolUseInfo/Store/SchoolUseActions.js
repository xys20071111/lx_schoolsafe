/********************ActionType**********************/
export const GET_SCHOOL_USE_INFO_LIST ='school/useinfo/getlist';
export const SET_SCHOOL_USE_INFO_VENDORS = 'school/useinfo/set/vendors';
export const SET_SCHOOL_PAGE_INDEX ='school/use/set/pageindex';
export const SET_SCHOOL_PAGE_SIZE ='school/use/set/pagesize';
export const SET_SCHOOL_FILTER_VALUE ='school/use/set/filtervalue';
export const RESET_SCHOOL_DATA ='school/use/reset/data';


/** 获取安装位置数据 */
export const getSchoolUseInfoData = (list, count) => ({
  type: GET_SCHOOL_USE_INFO_LIST, list, count
})

/** 获取厂商列表 */
export const setAllVendors = (list) => ({
  type: SET_SCHOOL_USE_INFO_VENDORS, list
})


/** 赋值当前第几页 */
export const changePageIndex = (index) => ({
  type: SET_SCHOOL_PAGE_INDEX, index
})

/** 赋值每页多少条 */
export const changePageSize = (size) => ({
  type: SET_SCHOOL_PAGE_SIZE, size
})

export const changeFilterValue = (school,vendor, types, callback) => ({
  type: SET_SCHOOL_FILTER_VALUE, school, vendor, types, callback
})

export const resetDate = (callback) => ({
  type: RESET_SCHOOL_DATA, callback
})