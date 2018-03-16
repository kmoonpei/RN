import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import navReducer from '../app/app.reducer';//导航
import netInfo from '../components/NetInfo/net.info.reducer'; //网络
import appState from '../components/AppState/app.state.reducer'; //app状态

let middlewarex = createReactNavigationReduxMiddleware('root', state => state.nav);
let middleware = [thunkMiddleware];
if (__DEV__) {
    let loggerMiddleware = createLogger();
    // middleware=[...middleware,loggerMiddleware];
    middleware = [...middleware, middlewarex];
} else {
    middleware = [...middleware, middlewarex];
}

const todoStore = combineReducers({
    nav: navReducer,
    appState,
    netInfo,
});

export const store = createStore(
    todoStore,
    applyMiddleware(...middleware)
);