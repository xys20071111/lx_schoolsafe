/********************ActionType**********************/
export const GET_USE_INFO_LIST ='useinfo/getlist';
export const SET_USE_INFO_VENDORS = 'useinfo/set/vendors';


/** 获取安装位置数据 */
export const getUseInfoData = (list) => ({
  type: GET_USE_INFO_LIST, list
})

/** 获取厂商列表 */
export const setAllVendors = (list) => ({
  type: SET_USE_INFO_VENDORS, list
})
