import React, { Component } from 'react';
import {
    StyleSheet, BackHandler, ToastAndroid,
    Text, View, Alert, NetInfo
} from 'react-native';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';
import { AppNavigator } from './app.router';
import SplashScreen from 'react-native-splash-screen';
import { Variable } from '../variables';
import JPushModule from 'jpush-react-native';
//引入 redux
import { Provider, connect } from 'react-redux';
import { store } from '../store/router.redux';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
//引入 action
import * as NetInfoAction from '../components/NetInfo/net.info.action';
import * as AppState from '../components/AppState/app.state.action';
const addListener = createReduxBoundAddListener("root");
class App extends Component {
    constructor(props) {
        super(props);
        this.stamp = 0;
        this.index = 0;
    }

    componentWillReceiveProps(nextProps) {

    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            let newStamp = new Date().getTime();
            if (this.index == 0) {
                ToastAndroid.showWithGravity('再按一次退出应用', ToastAndroid.SHORT, ToastAndroid.CENTER, )
                this.stamp = new Date().getTime();
                this.index++;
            } else {
                (newStamp - this.stamp) / 1000 < 2 ? BackHandler.exitApp() : this.index = 0, this.stamp = 0;
            }
            return true;
        }
        dispatch(NavigationActions.back());
        return true;
    };


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
    nav: store.navReducer,
});

const AppComponent = connect(mapStateToProps)(App);

export default class Root extends Component {

    render() {
        return (
            <Provider store={store}>
                <AppComponent />
            </Provider>
        );
    }
}
