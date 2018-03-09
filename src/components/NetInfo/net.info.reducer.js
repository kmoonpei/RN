'use strict';
import * as Types from '../ActionTypes/action.types';
let init_state = { status: 'init' };
export default function netInfo(state = init_state, action) {
    switch (action.type) {
        case Types.NET_INFO.NONE:
            return Object.assign(...state, {
                status: 'none',
            });
        case Types.NET_INFO.CELL:
            return Object.assign(...state, {
                status: 'cell',
            });
        case Types.NET_INFO.WIFI:
            return Object.assign(...state, {
                status: 'wifi',
            });
        case Types.NET_INFO.UNKNOWN:
            return Object.assign(...state, {
                status: 'unknown',
            });
        case Types.NET_INFO.AUTO:
            return Object.assign(...state, {
                status: 'auto',
            });
        default:
            return state;
    }
} 