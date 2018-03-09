'use strict';
import * as Types from '../ActionTypes/action.types';

export function NetType(kind) {
    let kinds = kind.toUpperCase();
    switch (kinds) {
        case 'UNKNOWN':
        case 'NONE':
            return ({
                type: Types.NET_INFO.NONE,
            });
            break;
        case 'CELL':
        case 'MOBILE' || 'MOBILE_DUN' || 'MOBILE_HIPRI' || 'MOBILE_MMS' || 'MOBILE_SUPL':
            return ({
                type: Types.NET_INFO.CELL,
            });
            break;
        case 'WIFI' || 'WIMAX':
            return ({
                type: Types.NET_INFO.WIFI,
            });
            break;
        case 'AUTO':
            return ({
                type: Types.NET_INFO.AUTO,
            });
            break;
        default:
            return ({
                type: Types.NET_INFO.WIFI,
            });
            break;
    }
}

/* //未链接
export function nonefn() {
    return ({
        type: Types.NET_INFO.NONE,
    });
}
//手机网络
export function cellfn() {
    return ({
        type: Types.NET_INFO.CELL,
    });
}
//Wi-Fi
export function wififn() {
    return ({
        type: Types.NET_INFO.WIFI,
    });
}
//错误类型
export function unknownfn() {
    return ({
        type: Types.NET_INFO.UN_KNOWN,
    });
} */