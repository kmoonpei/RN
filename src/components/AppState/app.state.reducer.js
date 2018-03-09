'use strict'

import * as Types from '../ActionTypes/action.types';

let init_state = { status: 'null' };
export default function appState(state = init_state, action) {
    switch (action.type) {
        case Types.APP_STATE.INIT:
            return Object.assign(...state, {
                status: 'init',
            });
        case Types.APP_STATE.TAB:
            return Object.assign(...state, {
                status: 'tab',
            });
        case Types.APP_STATE.EXIT:
            return Object.assign(...state, {
                status: 'exit',
            });
        default:
            return state;
    }
}