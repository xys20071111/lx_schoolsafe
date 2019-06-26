/********************ActionType**********************/
export const GET_CARD_BIND_LIST ='card/bind/getlist';
export const SET_PAGE_INDEX ='card/bind/set/pageindex';
export const SET_PAGE_SIZE ='card/bind/set/pagesize';
export const SET_FILTER_VALUE ='card/bind/set/filtervalue';
export const RESET_DATA ='card/bind/reset/data';


/** 获取安装位置数据 */
export const getCardBindData = (list,count) => ({
  type: GET_CARD_BIND_LIST, list, count
})

/** 赋值当前第几页 */
export const changePageIndex = (index) => ({
  type: SET_PAGE_INDEX, index
})

/** 赋值每页多少条 */
export const changePageSize = (size) => ({
  type: SET_PAGE_SIZE, size
})

export const changeFilterValue = (cid,sid, callback) => ({
  type: SET_FILTER_VALUE, cid, sid, callback
})

export const resetDate = (callback) => ({
  type: RESET_DATA, callback
})