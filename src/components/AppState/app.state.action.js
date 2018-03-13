'use strict'
import * as Types from '../ActionTypes/action.types';

export function signType(kind, data) {
    let kinds = kind.toUpperCase();
    switch (kinds) {
        case 'INIT':
            return ({
                type: Types.APP_STATE.INIT
            });
        case 'TAB':
            return ({
                type: Types.APP_STATE.TAB,
                data: data
            });
        case 'EXIT':
            return ({
                type: Types.APP_STATE.EXIT
            })
    }
}