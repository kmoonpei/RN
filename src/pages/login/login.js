import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Alert, NetInfo,
    Button, Image, TextInput, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'
import { Variable } from '../../variables'
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'

let DevWH = DeviceRn().getWidHig();

class LoginScreen extends Component {
    static pars = {
        header: null
    }
    static navigationOptions = ({ navigation, screenProps }) => HeaderBar(screenProps, LoginScreen.pars)
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            pwd: '',
        };
        this.pnv = this.props.navigation;
    }

    render() {
        return (
            <View style={styles.bg}>
                <Image style={[styles.bg_img]} source={require('../../assets/login/bg.png')} />
                <Image style={styles.logo} source={require('../../assets/login/logo.png')} />
                <View style={styles.txt_input_wrap}>
                    <Image style={styles.left_icon} source={require('../../assets/login/phone.png')} />
                    <TextInput
                        style={styles.txt_input}
                        underlineColorAndroid="transparent"
                        maxLength={11}
                        placeholder={'请输入手机号码'}
                        keyboardType={'phone-pad'}
                        onChangeText={(text) => this.setState({ phone: parseInt(text) })}
                    />
                </View>
                <View style={styles.txt_input_wrap}>
                    <Image style={styles.left_icon} source={require('../../assets/login/pwd.png')} />
                    <TextInput
                        style={styles.txt_input}
                        underlineColorAndroid="transparent"
                        placeholder={'请输入您的密码'}
                        onChangeText={(text) => this.setState({ pwd: parseInt(text) })}
                    />
                </View>
                <TouchableOpacity onPress={this._onFindpwd}>
                    <View style={styles.txt_forget_wrap}>
                        <Text style={styles.txt_forget_pwd}>忘记密码?</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._onLogin}>
                    <View style={[styles.login, { backgroundColor: Variable.Default.themeColor }]}>
                        <Text style={styles.txt_login}>登录</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._onRegister}>
                    <View style={styles.login}>
                        <Text >没有账号?马上注册</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _onLogin = () => {
        this.pnv.navigate('details');
    }
    _onFindpwd = () => {
        this.pnv.navigate('findpwd');
    }
    _onRegister = () => {
        this.pnv.navigate('register');
    }
}
mapStoreState = (store) => ({

});
export default connect(mapStoreState)(LoginScreen);

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        alignItems: 'center',
    },
    bg_img: {
        position: 'absolute',
        width: DevWH.sW,
        height: DevWH.sH,
    },
    logo: {
        width: 60,
        height: 100,
        margin: 40,
    },
    txt_input_wrap: {
        width: 250,
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        marginTop: 10,
    },
    left_icon: {
        width: 22,
        height: 22,
        marginRight: 20,
    },
    txt_input: {
        width: 250,
        height: 30,
        padding: 0,
    },
    txt_forget_wrap: {
        width: 250,
        height: 30,
        marginTop: 10,
    },
    txt_forget_pwd: {
        position: 'absolute',
        right: 0,
    },
    login: {
        width: 250,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt_login: {
        fontSize: 16 / Tools.Font(),
        color: '#fff',
    },
    
})