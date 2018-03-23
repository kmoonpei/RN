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
const options = ['业主', '设计工作室', '装修公司', '施工队', '材料商'];
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
            isChecked: false,
            modalVisible_protocol: false,
            modalVisible_types: false,

        };
        this.pnv = this.props.navigation;
    }

    render() {
        return (
            <View style={styles.bg}>
                <Image style={[styles.bg_img]} source={require('../../assets/login/bg.png')} />
                <Image style={styles.logo} source={require('../../assets/login/logo.png')} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.txt_input_wrap]}>
                        <Image style={styles.left_icon} source={require('../../assets/login/phone.png')} />
                        <TextInput
                            style={styles.txt_input}
                            underlineColorAndroid="transparent"
                            maxLength={11}
                            placeholder={'请输入您的手机号码'}
                            placeholderTextColor="#aaa"
                            keyboardType={'phone-pad'}
                            onChangeText={(text) => this.setState({ phone: parseInt(text) })}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.txt_input_wrap}>
                        <Image style={styles.left_icon} source={require('../../assets/login/pwd.png')} />
                        <TextInput
                            style={styles.txt_input}
                            underlineColorAndroid="transparent"
                            placeholder={'请输入您的密码'}
                            placeholderTextColor="#aaa"
                            onChangeText={(text) => this.setState({ pwd: parseInt(text) })}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.txt_input_wrap}>
                        <Image style={styles.left_icon} source={require('../../assets/login/verifCode.png')} />
                        <TextInput
                            style={styles.txt_input}
                            underlineColorAndroid="transparent"
                            placeholder={'请输入验证码'}
                            placeholderTextColor="#aaa"
                            onChangeText={(text) => this.setState({ pwd: parseInt(text) })}
                        />
                        <View style={styles.code}>
                            <TouchableOpacity onPress={this._ongetIdentifyingCode}>
                                <Text style={styles.txt_code}>获取验证码</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.txt_input_wrap}>
                        <Image style={styles.left_icon} source={require('../../assets/login/identity.png')} />
                        <TouchableOpacity style={{ flex: 1 }} onPress={this._openTypes}>
                            <View style={styles.selected}>
                                <Text style={{ color: this.state.type != '' ? '#222' : '#aaa' }}>{this.state.type != '' ? this.state.type : '请选择您的身份'}</Text>
                                <Image style={styles.arrow_icon} source={require('../../assets/login/arrows_right.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.xieyi}>
                        <TouchableOpacity onPress={this._onAgree} >
                            <Image style={styles.checked} source={this.state.isChecked ? require('../../assets/login/checked.png') : require('../../assets/login/unchecked.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._openProtocol} >
                            <Text style={[{ color: this.state.isChecked ? Variable.Default.themeColor : '#aaa' }]}>我已同意装甲兵注册协议</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.register, { backgroundColor: this.state.isChecked && this.state.type != '' ? Variable.Default.themeColor : '#aaa' }]}
                        onPress={this._onRegister}
                        disabled={this.state.isChecked && this.state.type != '' ? false : true}>
                        <Text style={styles.txt_register}>注册</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ flexDirection: 'row' }}> */}
                <TouchableOpacity style={styles.login} onPress={this._onToLogin}>
                    <Text >已有账号?马上登录</Text>
                </TouchableOpacity>
                {/* </View> */}
                {this._modalTypes()}
                {this._modalProtocol()}
            </View>
        )
    }

    _modalTypes() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible_types}
                onRequestClose={() => { alert("Modal has been closed.") }}
            >
                <View style={styles.types_wrap}>
                    <View style={styles.types_box}>
                        <View style={styles.types_title_wrap}>
                            <View style={styles.types_title}>
                                <Text style={styles.types_title_txt}>请选择您的身份</Text>
                            </View>
                            <TouchableOpacity style={styles.type_sure} onPress={() => {
                                this.setModalVisible_types(false)
                            }}>
                                <Text style={styles.type_sure_txt} >确定</Text>
                            </TouchableOpacity>
                        </View>
                        {options.map((item, i) => {
                            return <TouchableOpacity key={i} style={styles.types_options} onPress={() => this.setState({ type: item })}>
                                <Text style={{ fontSize: this.state.type == item ? 16 / Tools.Font() : 14 / Tools.Font(), color: this.state.type == item ? '#222' : '#aaa' }} >{item}</Text>
                            </TouchableOpacity>
                        })}
                    </View>
                </View>
            </Modal>
        )
    }

    _modalProtocol() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible_protocol}
                onRequestClose={() => { alert("Modal has been closed.") }}
            >
                <View style={styles.modal_wrap}>
                    <View style={styles.close_wrap}>
                        <TouchableOpacity style={styles.modal_close} onPress={() => {
                            this.setModalVisible_Protocol(false)
                        }}>
                            <Image style={styles.modal_close_img} source={require('../../assets/login/close.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modal_content}>
                        <Text style={{ color: '#f00', padding: 10, }}>《装甲兵用户协议》</Text>
                        <Text style={{ padding: 10, }}>一般来说，使用Chocolatey来安装软件的时候，需要以管理员的身份来运行命令提示符窗口。译注：chocolatey的网站可能在国内访问困难，导致上述安装命令无法正常完成。请使用稳定的翻墙工具。 如果你实在装不上这个工具，也不要紧。下面所需的python2和nodejs你可以分别单独去对应的官方网站下载安装即可。</Text>
                        <TouchableOpacity style={styles.modal_sure_wrap} onPress={() => {
                            this.setModalVisible_Protocol(false)
                        }}>
                            <Text style={{ color: '#fff' }}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
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
    _openTypes = () => {
        this.setState({ modalVisible_types: true });
    }
    setModalVisible_types(tag) {
        this.setState({ modalVisible_types: tag });
    }
    _openProtocol = () => {
        this.setState({ modalVisible_protocol: true });
    }
    setModalVisible_Protocol(visible) {
        this.setState({ modalVisible_protocol: visible });
    }

    _onRegister = () => {

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
        marginBottom: 20,
    },
    txt_input_wrap: {
        flex: .7,
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
    types_wrap: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    types_box: {
        position: 'absolute',
        width: DevWH.sW,
        height: 260,
        bottom: 0,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
    },
    types_title_wrap: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    types_title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    types_title_txt: {
        color: '#333',
        fontSize: 15 / Tools.Font(),
    },
    type_sure: {
        width: 55,
        height: 25,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Variable.Default.themeColor,
        borderRadius: 2,
        right: 0,
    },
    type_sure_txt: {
        color: '#fff',
        fontSize: 12 / Tools.Font(),

    },
    types_options: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal_wrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal_content: {
        width: 260,
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 4,
        alignItems: 'center',
    },
    modal_sure_wrap: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: Variable.Default.themeColor,
        flex: 1,
        width: 260,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    close_wrap: {
        width: 260,
        height: 35,
    },
    modal_close: {
        position: 'absolute',
        right: 0,
    },
    modal_close_img: {
        width: 24,
        height: 24,
    }
})