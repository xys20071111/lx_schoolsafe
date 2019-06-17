let URL_PREFIX = 'http://172.16.0.100:8080';
// let URL_PREFIX = 'http://47.95.116.222';
if (process.env.NODE_ENV === 'development') {
    // URL_PREFIX =  'http://47.95.116.222';
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

//获取位置信息
export const URL_GET_LOCATIONS_INFO     = URL_PREFIX + '/campus/admin/locations';
export const URL_GET_LOCATIONS_DELETE   = URL_PREFIX + '/campus/admin/dellocation';
export const URL_GET_LOCATIONS_UPDATE   = URL_PREFIX + '/campus/admin/updatelocation';
export const URL_GET_LOCATIONS_ADD      = URL_PREFIX + '/campus/admin/addlocation';


//绑卡信息查询
export const URL_GET_CARD_BIND_INFO     = URL_PREFIX + '/campus/admin/bindinfo';


//添加节假日
export const URL_GET_HOLIDAY_LIST       = URL_PREFIX + '/campus/admin/holiday';
export const URL_ADD_HOLIDAY            = URL_PREFIX + '/campus/admin/addholiday';
export const URL_DELETE_HOLIDAY            = URL_PREFIX + '/campus/admin/delholiday';