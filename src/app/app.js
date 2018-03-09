import React, { Component } from 'react';
import {
    StyleSheet, BackHandler, ToastAndroid,
    Text,
    View, Alert, NetInfo
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
        this.state = { params: {} };
        this.isInit = true;
        this.platForm = false;
        this.index = 0;
        this.timers = "";
    }

    componentWillUnmount() {
        //console.log('test');
        this.platForm ? BackHandler.removeEventListener('hardwareBackPress', this.androidBack) : null;
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        if (this.isInit == true) {
            // SplashScreen.hide();
            this.isInit = false;
            // nextProps.apps == 'tab' ? (BackHandler.addEventListener('hardwareBackPress', this.androidBack.bind(this)), this.platForm = true) : null;
            // nextProps.apps == 'web' ? this.setState({ params: { url: nextProps.user.url } }) : null;
            (BackHandler.addEventListener('hardwareBackPress', this.androidBack.bind(this)), this.platForm = true)
        }
        //    nextProps.user && nextProps.sign != 'logOut' && nextProps.apps == 'tab' ? this.setState({ params: { user: nextProps.user } }) : null;
        // nextProps.user && nextProps.sign == 'logOut' ? this.props.dispatch(AppState.signType('tab')) : null;
        // this.props.dispatch(AppState.signType('tab'))
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

    //获取登陆状态
    // getExpire(props) {
    //     let payload = {
    //         do: 'user',
    //         uid: props.user.id,
    //         token: props.user.token
    //     };
    //     Http.httpPost(payload).then(data => {
    //         //  console.log(data);
    //         if (data.status == 0) {
    //             this.setState({ params: { user: null } })
    //             ToastAndroid.showWithGravity('账号已在别地登陆', ToastAndroid.SHORT, ToastAndroid.CENTER)
    //             Tools.storageRemove(Variable.Sign_Key)
    //         } else {
    //             this.setState({ params: { user: props.user } })
    //             return false;
    //         }
    //     }).catch(err => {
    //     })
    // }

    render() {
        return (
            <AppNavigator screenProps={this.state.params} navigation={addNavigationHelpers({
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
    // user: store.appState.data
});

const AppComponent = connect(mapStateToProps)(App);

export default class Router extends Component {
    componentWillMount() {
        //初始化
        // this._initDispatch();
        this.changeNetInfo();

        //获取
        // this.getGHttp();

        //初始化极光推送
        // JPushModule.notifyJSDidLoad((resultCode) => {
        //     if (resultCode === 0) {
        //     }
        // });
        // JPushModule.addReceiveNotificationListener((map) => {
        // });
    }

    _initDispatch() {
        store.dispatch(AppState.signType('init'))
    }

    componentWillUnmount() {
        this.removeNetInfo();
    }

    getYHttp() {
        HttpPost.urlRequest().then(data => {
            if (data.code == 1) {
                Tools.storageSave(Variable.Http_Key, JSON.stringify({ url: data.url }));
                // store.dispatch(AppState.signType('web', { url: data.url }));
                // store.dispatch(this.resetWeb());
            } else {
                this.getThemKey();
            }
        }).catch(err => {
            this.getThemKey();
        })
    }

    getGHttp() {
        HttpGet.urlRequest().then(data => {
            // store.dispatch(AppState.signType('web', { url: 'http://www.szssc888.com/index.html' }));
            // store.dispatch(this.resetWeb());
            if (data._bodyInit != 'null') {
                Tools.storageSave(Variable.Http_Key, JSON.stringify({ url: data._bodyInit }));
                // store.dispatch(AppState.signType('web', { url: data._bodyInit }));
                // store.dispatch(this.resetWeb());
            } else {
                this.getThemKey();
            }
        }).catch(err => {
            // console.log(err);
            this.getThemKey();
        })
    }

    getThemKey() {
        Tools.storageGet(Variable.Sign_Key).then(data => {
            // console.log(data);
            if (data != null) {
                let user = JSON.parse(data);
                store.dispatch(AppState.signType('tab', user))
            } else {
                store.dispatch(AppState.signType('tab'))
            }
        }).catch(err => {
            // console.log(err)
            store.dispatch(AppState.signType('tab'))
        })
    }

    resetWeb() {
        return (NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Web',
                })
            ]
        }));
    }


    removeNetInfo() {
        NetInfo.removeEventListener(
            'connectionChange',
            this._handleConnectionInfoChange
        );
    }

    changeNetInfo() {
        NetInfo.addEventListener(
            'connectionChange',
            this._handleConnectionInfoChange
        );
    }

    _handleConnectionInfoChange(e) {
        store.dispatch(NetInfoAction.NetType(e.type));
    }

    render() {
        return (
            <Provider store={store}>
                <AppComponent />
            </Provider>
        );
    }
}
