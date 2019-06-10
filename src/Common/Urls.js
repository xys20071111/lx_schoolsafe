let URL_PREFIX = 'http://47.95.116.222';
if (process.env.NODE_ENV === 'development') {
    URL_PREFIX =  'http://47.95.116.222';
}
//获取厂商信息
export const URL_GET_FIRM_INFO       = URL_PREFIX + '/campus/admin/vendors';
export const URL_GET_FIRM_DELETE       = URL_PREFIX + '/campus/admin/delvendor';
export const URL_GET_FIRM_ADD       = URL_PREFIX + '/campus/admin/addvendor';
export const URL_GET_FIRM_UPDATE       = URL_PREFIX + '/campus/admin/updatevendor';
