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

class FindpwdScreen extends Component {
    static pars = {
        title: '手机找回密码'
    }
    static navigationOptions = ({ navigation, screenProps }) => HeaderBar(screenProps, FindpwdScreen.pars)
    constructor(props) {
        super(props);
        this.state = {
            new_pwd: '',
            pwd: '',
        };
        this.pnv = this.props.navigation;
    }

    render() {
        return (
            <View style={styles.bg}>
                <View style={styles.txt_input_wrap}>
                    <Image style={styles.left_icon} source={require('../../assets/login/phone.png')} />
                    <Text>手机号：</Text>
                    <TextInput
                        style={styles.txt_input}
                        underlineColorAndroid="transparent"
                        maxLength={11}
                        placeholder={'请输入您绑定的手机号码'}
                        placeholderTextColor="#aaa"
                        keyboardType={'phone-pad'}
                        onChangeText={(text) => this.setState({ phone: parseInt(text) })}
                    />
                </View>
                <View style={[styles.txt_input_wrap, { marginTop: 1, }]}>
                    <Image style={styles.left_icon} source={require('../../assets/login/verifCode.png')} />
                    <Text>验证码：</Text>
                    <TextInput
                        style={styles.txt_input}
                        underlineColorAndroid="transparent"
                        placeholder={'请输入您收到的验证码'}
                        placeholderTextColor="#aaa"
                        onChangeText={(text) => this.setState({ pwd: parseInt(text) })}
                    />
                    <TouchableOpacity onPress={this._ongetIdentifyingCode}>
                        <View style={styles.code}>
                            <Text style={styles.txt_code}>获取验证码</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this._onNext}>
                    <View style={[styles.next, { backgroundColor: Variable.Default.themeColor }]}>
                        <Text style={styles.txt_next}>下一步</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    _ongetIdentifyingCode = () => {
        //获取验证码
    }
    _onNext = () => {
        this.pnv.navigate('resetpwd');
    }
}
mapStoreState = (store) => ({

});
export default connect(mapStoreState)(FindpwdScreen);

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        alignItems: 'center',
    },

    txt_input_wrap: {
        width: DevWH.sW,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 10,
    },
    left_icon: {
        width: 22,
        height: 22,
        margin: 10,
        marginLeft: 20,
    },
    txt_input: {
        width: 180,
        height: 30,
        padding: 0,
        flex: 1,
    },
    code: {
        marginLeft: 10,
        right: 10,
    },
    txt_code: {
        color: '#3f97ff',
        fontSize: 12.2 / Tools.Font(),
    },
    next: {
        flex: .8,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 45,
    },
    txt_next: {
        color: '#fff',
    },
})