import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Alert, NetInfo, Modal,
    Button, Image, TextInput, TouchableOpacity, TouchableHighlight,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'
import { Variable } from '../../variables'
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'

let DevWH = DeviceRn().getWidHig();
const options = ['取消', '业主', '设计工作室', '装修公司', '施工队', '材料商'];
const CANCEL_INDEX = 0;
class RegisterScreen extends Component {
    static pars = {
        header: null
    }
    static navigationOptions = ({ navigation, screenProps }) => HeaderBar(screenProps, RegisterScreen.pars)
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            pwd: '',
            type: '',
            isChecked: true,
            modalVisible: false,
        };
        this.pnv = this.props.navigation;
    }

    render() {
        return (
            <View style={styles.bg}>
                <Image style={[styles.bg_img]} source={require('../../assets/login/bg.png')} />
                <Image style={styles.logo} source={require('../../assets/login/logo.png')} />
                <View style={[styles.txt_input_wrap, { marginTop: -20 }]}>
                    <Image style={styles.left_icon} source={require('../../assets/login/phone.png')} />
                    <TextInput
                        style={styles.txt_input}
                        underlineColorAndroid="transparent"
                        maxLength={11}
                        placeholder={'请输入您的手机号码'}
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
                <View style={styles.txt_input_wrap}>
                    <Image style={styles.left_icon} source={require('../../assets/login/verifCode.png')} />
                    <TextInput
                        style={styles.txt_input}
                        underlineColorAndroid="transparent"
                        placeholder={'请输入验证码'}
                        onChangeText={(text) => this.setState({ pwd: parseInt(text) })}
                    />
                    <View style={styles.code}>
                        <TouchableOpacity onPress={this._ongetIdentifyingCode}>
                            <Text style={styles.txt_code}>获取验证码</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.txt_input_wrap}>
                    <Image style={styles.left_icon} source={require('../../assets/login/identity.png')} />
                    <TouchableOpacity style={{ flex: 1 }} onPress={this._onSelectID}>
                        <View style={styles.selected}>
                            <Text style={{ color: this.state.type != '' ? '#222' : '#aaa' }}>{this.state.type != '' ? this.state.type : '请选择您的身份'}</Text>
                            <Image style={styles.arrow_icon} source={require('../../assets/login/arrows.png')} />
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={styles.xieyi}>
                    <TouchableOpacity onPress={this._onAgree} >
                        <Image style={styles.checked} source={this.state.isChecked ? require('../../assets/login/checked.png') : require('../../assets/login/unchecked.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._openProtocol} >
                        <Text style={[{ color: this.state.isChecked ? Variable.Default.themeColor : '#aaa' }]}>我已同意装甲兵注册协议</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this._onRegister} disabled={this.state.isChecked && this.state.type != '' ? false : true}>
                    <View style={[styles.register, { backgroundColor: this.state.isChecked && this.state.type != '' ? Variable.Default.themeColor : '#aaa' }]}>
                        <Text style={styles.txt_register}>注册</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._onToLogin}>
                    <View style={styles.login}>
                        <Text >已有账号?马上登录</Text>
                    </View>
                </TouchableOpacity>
                {this._actionSheet()}
                {this._mode()}
            </View>
        )
    }

    _actionSheet() {
        return (
            <View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={this._handlePress.bind(this)}
                />
            </View>
        )
    }
    _handlePress(item) {
        switch (item) {
            case 1: this.setState({ type: '业主' }); break;
            case 2: this.setState({ type: '设计工作室' }); break;
            case 3: this.setState({ type: '装修公司' }); break;
            case 4: this.setState({ type: '施工队' }); break;
            case 5: this.setState({ type: '材料商' }); break;
        }
    }
    _mode() {
        return (
            <Modal
                // style={{ backgroundColor: '#222',alignItems:'center',justifyContent:'center'}}
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => { alert("Modal has been closed.") }}
            >
                <View style={styles.modal_wrap}>
                    <Image style={styles.modal_close} source={require('../../assets/login/close.png')} />
                    <View style={styles.modal_content}>
                        <Text style={{ color: '#f00' }}>《装甲兵用户协议》</Text>
                        <TouchableHighlight style={styles.modal_sure_wrap} onPress={() => {
                            this.setModalVisible(false)
                        }}>
                            <View style={[styles.modal_sure_btn, { backgroundColor: Variable.Default.themeColor }]}>
                                <Text style={{ color: '#fff' }}>确定</Text>
                            </View>
                        </TouchableHighlight>

                    </View>
                </View>
            </Modal>
        )
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    _onToLogin = () => {
        this.pnv.navigate('login');
    }

    _onAgree = () => {
        this.setState({ isChecked: !this.state.isChecked });
    }
    _ongetIdentifyingCode = () => {
        //获取验证码
    }
    _onSelectID = () => {
        this.ActionSheet.show();
    }
    _openProtocol = () => {
        this.setState({ modalVisible: true });
    }
}
mapStoreState = (store) => ({

});
export default connect(mapStoreState)(RegisterScreen);

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
        height: 32,
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
        flex: 1,
        width: 100,
        height: 30,
        padding: 0,

    },
    code: {
        marginLeft: 20,
        right: 0,
        borderColor: '#aaa',
        borderLeftWidth: 1,
        paddingLeft: 10,
    },
    txt_code: {
        color: '#3f97ff',
        fontSize: 12.2 / Tools.Font(),
    },
    selected: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    xieyi: {
        width: 250,
        height: 30,
        // marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checked: {
        width: 16,
        height: 16,
        marginRight: 10,
    },
    arrow_icon: {
        position: 'absolute',
        width: 8,
        height: 15,
        right: 0,
    },
    register: {
        width: 250,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    txt_register: {
        fontSize: 16 / Tools.Font(),
        color: '#fff',
    },
    login: {
        marginTop: 10,
    },
    modal_wrap: {
        width: 260,
        marginTop: 160,
        alignItems: 'center',
        justifyContent: 'center',
        //
        borderColor: '#f00',
        borderWidth: 1,
    },
    modal_content: {
        width: 260,
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 4,
        alignItems: 'center',
        //
        borderColor: '#aaa',
        borderWidth: 1,
    },
    modal_sure_wrap: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
    },
    modal_sure_btn: {
        flex: 1,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal_close:{
        width:24,
        height:24,
    },
})