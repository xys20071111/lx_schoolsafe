let URL_PREFIX = 'http://47.95.116.222';
if (process.env.NODE_ENV === 'development') {
    URL_PREFIX =  'http://47.95.116.222';
}
//获取厂商信息
export const URL_GET_FIRM_INFO         = URL_PREFIX + '/campus/admin/vendors';
export const URL_GET_FIRM_DELETE       = URL_PREFIX + '/campus/admin/delvendor';
export const URL_GET_FIRM_ADD          = URL_PREFIX + '/campus/admin/addvendor';
export const URL_GET_FIRM_UPDATE       = URL_PREFIX + '/campus/admin/updatevendor';

//获取设备信息
export const URL_GET_DEVICES_INFO       = URL_PREFIX + '/campus/admin/devices';
export const URL_GET_DEVICES_DELETE     = URL_PREFIX + '/campus/admin/deldevice';
export const URL_GET_DEVICES_ADD        = URL_PREFIX + '/campus/admin/adddevice';
export const URL_GET_DEVICES_UPDATE     = URL_PREFIX + '/campus/admin/updatedevice';