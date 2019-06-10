/********************ActionType**********************/
export const GET_CHANG_SHANG_LIST ='changshang/getlist';


/********************动作分发************************/
/** 获取数据 */
export const getChangShangData = (list) => ({
  type: GET_CHANG_SHANG_LIST, list
})

