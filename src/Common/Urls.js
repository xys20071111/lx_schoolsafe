let URL_PREFIX = 'http://47.95.116.222';
if (process.env.NODE_ENV === 'development') {
    URL_PREFIX =  'http://47.95.116.222';
}
//获取厂商信息
export const URL_GET_FIRM_INFO       = URL_PREFIX + '/campus/admin/vendors';
