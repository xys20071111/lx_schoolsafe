/********************ActionType**********************/
export const GET_CARD_BIND_LIST ='card/bind/getlist';


/** 获取安装位置数据 */
export const getCardBindData = (list) => ({
  type: GET_CARD_BIND_LIST, list
})
