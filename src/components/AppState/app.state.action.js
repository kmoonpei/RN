'use strict'
import * as Types from '../ActionTypes/action.types';

export function singType(kind, data) {
    let kinds = kind.toUpperCase();
    switch (kinds) {
        case 'INIT':
            return ({
                type: Types.APP_STATE.INIT
            });
        case 'TAB':
            return ({
                type: Types.APP_STATE.TAB
            });
        case 'EXIT':
            return ({
                type: Types.APP_STATE.EXIT
            });
    }
}