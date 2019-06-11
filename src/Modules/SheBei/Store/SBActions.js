/********************ActionType**********************/
export const GET_SHE_BEI_LIST ='shebei/getlist';
export const SET_ALL_VENDORS_DATA = 'shebei/set/all/vendors';


/** 获取数据 */
export const getSheBeiData = (list) => ({
  type: GET_SHE_BEI_LIST, list
})
/** 获取厂商列表 */
export const setAllVendors = (list) => ({
  type: SET_ALL_VENDORS_DATA, list
})
