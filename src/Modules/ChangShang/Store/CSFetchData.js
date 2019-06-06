import { URL_GET_FIRM_INFO } from 'Common/Urls';
import { queryDataFromNetwork } from 'ljbase';


/**获取厂商列表信息 */
export async function getChangShangList(params) {
  let studentStatis = await queryDataFromNetwork(URL_GET_FIRM_INFO, {...params});
  console.log('学生数据查询：',params, studentStatis)
  if (!studentStatis || studentStatis.code !== 0) {
    return { code: -1, msg: '查询数据异常,请稍后再试!', studentStatis }
  }
  return true;
}
