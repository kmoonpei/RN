import React, {
    Component
} from 'react'
import {
    View, Image, TouchableHighlight,
    Text, TouchableOpacity, FlatList,
    StyleSheet, ScrollView, TextInput, Modal,
} from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'
import { Variable } from '../../variables'
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'

const imgs = [1, 1, 1];
let DevWH = DeviceRn().getWidHig();
class SingleTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible_buy: false,
            modalVisible_quote: false,
        };
        this.pnv = this.props.navigation;
        this.theme = Variable.Default;
    }

    _keyExtractor = (item, index) => index.toString();
    _openBuyModal() {
        this.setState({ modalVisible_buy: true });
    }
    _openQuoteModal() {
        this.setState({ modalVisible_quote: true });
    }
    _pay() {
        this.setState({ modalVisible_buy: false });
    }
    render() {
        return (
            <View style={styles.bg}>
                <View style={styles.trends_bg}>
                    <View style={styles.trends_head}>
                        <TouchableOpacity onPress={() => { this.props.goOthersHomePage() }}>
                            <Image style={styles.trends_head_img} source={require('../../assets/publish/dongtai.png')} />
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity onPress={() => { this.props.goOthersHomePage() }}>
                                <Text style={styles.trends_username_txt}>在下版本达拉</Text>
                            </TouchableOpacity>
                            <View style={styles.tags}>
                                <Text style={styles.tags_txt}>材料商</Text>
                                <Text style={[styles.tags_txt, { backgroundColor: Variable.Default.themeColor, color: '#fff', }]}>粉丝数123</Text>
                            </View>
                        </View>
                        <View style={[styles.tags_sj, styles.center]}>
                            <Text style={styles.tags_sj_txt}>设计</Text>
                        </View>
                    </View>
                    <View style={[styles.trends_context, styles.center]}>
                        <Text style={styles.trends_context_txt}>执行该命令后，会自动在resources文件夹下创建已添加的平台名称的文件夹，如：android，其中会自动将图片进行缩放、裁剪，生成不同分辨率的图片，并在config.xml中添加相应内容。也可分开执行</Text>
                        <View style={styles.trends_imgs_wrap}>
                            {imgs.map((item, i) => { return <Image key={i} style={styles.trends_img} source={require('../../assets/publish/dongtai.png')} /> })}
                        </View>
                        {this.props.market_type == '材料' ? this._renderMaterialsFooter() : this._renderTaskFooter()}
                    </View>
                </View>
                {this._renderBuyModal()}
                {this._renderQuoteModal()}
            </View >
        )
    }

    _renderBuyModal() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible_buy}
                onRequestClose={() => { this.setState({ modalVisible_buy: false }) }}
            >
                <View style={styles.types_wrap}>
                    <View style={styles.types_box}>
                        <View style={[styles.modal_buy_title_wrap, styles.center]}>
                            <Text style={styles.modal_buy_title}>马可波罗瓷砖</Text>
                        </View>
                        {this._renderPrice('单价', 22)}
                        <View style={[styles.modal_buy_item, styles.center]}>
                            <Text>数量:</Text>
                            <View style={[styles.modal_buy_num, styles.center]}>
                                <TextInput
                                    style={styles.txt_input_buy}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#aaa"
                                    keyboardType={'phone-pad'}
                                    onChangeText={(text) => this.setState({ pwd: parseInt(text) })}
                                />
                            </View>
                            <Text>个</Text>
                        </View>
                        {this._renderPrice('总价', 2200, true)}
                        <View style={styles.modal_pay_box}>
                            <TouchableOpacity style={[styles.pay_type, styles.center, { backgroundColor: Variable.Default.themeColor }]} onPress={() => { this._pay() }}>
                                <Text style={[styles.pay_type_txt, { color: '#fff' }]}>微信支付</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.pay_type, styles.center]} onPress={() => { this._pay() }}>
                                <Text style={styles.pay_type_txt}>支付宝支付</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    _renderPrice(title, num, color) {
        return (
            <View style={[styles.modal_buy_item, styles.center]}>
                <Text>{title}:</Text>
                <View style={[styles.modal_buy_num, styles.center]}>
                    <Text style={{ color: color ? Variable.Default.themeColor : '#888' }}>{num}</Text>
                </View>
                <Text>元</Text>
            </View>
        )
    }
    _renderQuoteModal() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible_quote}
                onRequestClose={() => { this.setState({ modalVisible_quote: false }) }}
            >
                <View style={styles.types_wrap}>
                    <View style={styles.types_box}>
                        <View style={[styles.modal_buy_title_wrap, styles.center, { height: 60 }]}>
                            <Image style={styles.quote_img} source={require('../../assets/circle/quote_img.png')} />
                            <Text style={styles.modal_buy_title}>您的报价</Text>
                        </View>
                        <View style={[styles.modal_quote_price, styles.center]}>
                            <TextInput
                                style={styles.txt_input_quote}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#aaa"
                                placeholder={'请输入您的报价'}
                                keyboardType={'phone-pad'}
                                onChangeText={(text) => this.setState({ pwd: parseInt(text) })}
                            />
                            <Text>元</Text>
                        </View>
                        <Text style={styles.modal_high_price}>当前最高报价为2454元</Text>
                        <TouchableOpacity style={[styles.submit, styles.center]}>
                            <Text style={styles.submit_txt}>提交</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.submit, styles.center, { backgroundColor: '#fff' }]} onPress={() => { this.setState({ modalVisible_quote: false }) }}>
                            <Text style={[styles.submit_txt, { color: '#666' }]}>关闭</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    _renderMaterialsFooter() {
        return (
            <View style={styles.market_foot}>
                <Text style={styles.read_time_txt}>233阅读</Text>
                <View style={styles.buy_wrap}>
                    <Text style={styles.money_txt}>20000.00元</Text>
                    <TouchableOpacity style={[styles.buy_btn, styles.center]} onPress={() => { this._openBuyModal() }}>
                        <Text style={styles.buy_txt}>购买</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    _renderTaskFooter() {
        return (
            <View style={styles.market_foot}>
                <Text style={[styles.read_time_txt, { flex: .2 }]}>233阅读</Text>
                <View style={styles.buy_wrap}>
                    <Text style={[styles.money_txt, { marginRight: 120, color: '#555' }]}>4报价</Text>
                    <TouchableOpacity style={[styles.buy_btn, styles.center]} onPress={() => { this._openQuoteModal() }}>
                        <Text style={styles.buy_txt}>马上报价</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(SingleTask);

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    trends_bg: {
        width: DevWH.sW,
        marginBottom: 6,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    trends_head: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trends_head_img: {
        width: 40,
        height: 40,
        margin: 15,
        marginBottom: 8,
    },
    trends_username_txt: {
        color: '#333',
    },
    tags: {
        flexDirection: 'row',
    },
    tags_txt: {
        backgroundColor: '#eee',
        color: '#555',
        fontSize: 10 / Tools.Font(),
        padding: 2,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 20,
        margin: 5,
    },
    tags_sj: {
        position: 'absolute',
        width: 50,
        height: 20,
        right: 30,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderColor: Variable.Default.themeColor,
        borderWidth: 1,
    },
    tags_sj_txt: {
        color: Variable.Default.themeColor,
        fontSize: 11 / Tools.Font(),

    },
    trends_context: {
        padding: 15,
        paddingTop: 0,
    },
    trends_context_txt: {
        color: '#666',
        fontSize: 12 / Tools.Font(),
    },
    trends_imgs_wrap: {
        width: DevWH.sW - 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    trends_img: {
        width: 100,
        height: 90,
        margin: 5,
        borderRadius: 5,
    },
    market_foot: {
        width: DevWH.sW - 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    read_time_txt: {
        color: '#555',
        flex: .4,
    },
    buy_wrap: {
        flexDirection: 'row',
        flex: .6,
    },
    money_txt: {
        color: '#aaa',
        marginRight: 20,
    },
    buy_btn: {
        width: 80,
        height: 20,
        backgroundColor: Variable.Default.themeColor,
        borderRadius: 2,
    },
    buy_txt: {
        color: '#fff',
    },
    types_wrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    types_box: {
        position: 'absolute',
        width: DevWH.sW - 100,
        height: 220,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
    },
    modal_buy_title_wrap: {
        width: DevWH.sW - 100,
        height: 40,
        backgroundColor: Variable.Default.themeColor,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    modal_buy_title: {
        color: '#fff',
        fontSize: 14 / Tools.Font(),
    },
    modal_buy_item: {
        flexDirection: 'row',
        height: 40,
    },
    modal_buy_num: {
        flex: .5,
        borderColor: '#eee',
        borderBottomWidth: 1,
        marginLeft: 5,
        marginRight: 5,
    },
    modal_pay_box: {
        width: DevWH.sW,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pay_type: {
        // flex: 1,
        width: 95,
        height: 30,
        margin: 10,
        borderColor: Variable.Default.themeColor,
        borderWidth: 1,
        borderRadius: 3,
    },
    pay_type_txt: {
        fontSize: 12 / Tools.Font(),
    },
    quote_img: {
        position: 'absolute',
        width: 80,
        height: 60,
        top: 0,
        left: 0,
    },
    modal_quote_price: {
        width: DevWH.sW - 160,
        height: 35,
        borderColor: '#eee',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        margin: 10,
    },
    txt_input_quote: {
        flex: .8,
        height: 40,
    },
    modal_high_price: {
        color: Variable.Default.themeColor,
    },
    submit: {
        width: DevWH.sW - 160,
        height: 30,
        backgroundColor: Variable.Default.themeColor,
        borderRadius: 3,
        marginTop: 8,
    },
    submit_txt: {
        color: '#fff',
    },
})