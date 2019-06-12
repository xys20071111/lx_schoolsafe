/********************ActionType**********************/
export const GET_AN_ZHUANG_LIST ='anzhuang/getlist';


/** 获取安装位置数据 */
export const getAnZhuangPositionData = (list) => ({
  type: GET_AN_ZHUANG_LIST, list
})
