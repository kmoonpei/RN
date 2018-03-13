import React, { Component } from 'react';
import {
    StyleSheet, BackHandler, ToastAndroid,
    Text, View, Alert, NetInfo
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { addNavigationHelpers } from 'react-navigation';
import { AppNavigator } from './app.router';
import SplashScreen from 'react-native-splash-screen';
// import Http from '../components/Tools/http.unite';
// import Tools from '../components/Tools/tools';
// import HttpGet from '../components/Tools/http.get';
// import HttpPost from '../components/Tools/http.post';
// import { ThemeC } from '../components/Theme/theme';
import { Variable } from '../variables';
import JPushModule from 'jpush-react-native';
//引入 redux
import { Provider, connect } from 'react-redux';
import { store } from '../store/router.redux';
import {
    createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
//引入 action
import * as NetInfoAction from '../components/NetInfo/net.info.action';
// import * as Sign from '../components/Sign/sign.action';
import * as AppState from '../components/AppState/app.state.action';
const addListener = createReduxBoundAddListener("root");
class App extends Component {
    constructor(props) {
        super(props);
        // this.state = { params: {} };
        // this.isInit = true;
        // this.platForm = false;
        // this.index = 0;
        // this.timers = "";
    }

    componentWillUnmount() {
        this.platForm ? BackHandler.removeEventListener('hardwareBackPress', this.androidBack) : null;
    }

    componentWillReceiveProps(nextProps) {
        // // console.log(nextProps)
        // if (this.isInit == true) {
        //     // SplashScreen.hide();
        //     this.isInit = false;
        //     // nextProps.apps == 'tab' ? (BackHandler.addEventListener('hardwareBackPress', this.androidBack.bind(this)), this.platForm = true) : null;
        //     // nextProps.apps == 'web' ? this.setState({ params: { url: nextProps.user.url } }) : null;
        //     (BackHandler.addEventListener('hardwareBackPress', this.androidBack.bind(this)), this.platForm = true)
        // }
        // //    nextProps.user && nextProps.sign != 'logOut' && nextProps.apps == 'tab' ? this.setState({ params: { user: nextProps.user } }) : null;
        // // nextProps.user && nextProps.sign == 'logOut' ? this.props.dispatch(AppState.signType('tab')) : null;
        //    nextProps.user && nextProps.apps == 'tab' ? this.setState({ params: { user: nextProps.user } }) : null;
        //    nextProps.user && nextProps.sign == 'logOut' ? this.props.dispatch(AppState.signType('tab')) : null;
    }

    androidBack() {
        if (this.props.nav.index < 1) {
            let timer = new Date().getTime();
            if (this.index == 0) {
                ToastAndroid.showWithGravity('再按一次退出应用', ToastAndroid.SHORT, ToastAndroid.CENTER, )
                this.timers = new Date().getTime();
                this.index++;
            } else {
                (timer - this.timers) / 1000 < 2.5 ? BackHandler.exitApp() : this.index = 0, this.timers = "";
            }
            return true;
        } else {
            this.props.dispatch(NavigationActions.back());
            return true;
        }
    }

    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
                addListener,
            })} />
        );
    }
}

mapStateToProps = (store) => ({
    apps: store.appState.status,
    // sign: store.Sign.status,
    nav: store.navReducer,
    user: store.appState.data
});

const AppComponent = connect(mapStateToProps)(App);

export default class Root extends Component {
    componentWillMount() {
        //初始化
        // this._initDispatch();
    }

    _initDispatch() {
        store.dispatch(AppState.signType('init'))
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Provider store={store}>
                <AppComponent />
            </Provider>
        );
    }
}
