import React, {
    Component
} from 'react'
import {
    View, Text, Button, StatusBar, Image,
    StyleSheet, TouchableOpacity, TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'
import { Variable } from '../../variables'
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'
import Circle from '../../components/Circle/circle.circle'
import Market from '../../components/Circle/circle.market'

let DevWH = DeviceRn().getWidHig();
const types = ['设计', '装修', '材料', '其他'];
class CircleScreen extends Component {
    static params = {
        Image: require('../../assets/tabs/circle.png'),
        msg: '圈子',
        header: null
    }
    static navigationOptions = ({ navigation, screenProps }) => HeaderBar(screenProps, CircleScreen.params)
    constructor(props) {
        super(props);
        this.state = {
            tag: '圈子',
            market_type: '设计',
            recommend_data: [{ head_img: require('../../assets/publish/dongtai.png'), user_name: '书里的花' },
            { head_img: require('../../assets/publish/xuqiu.png'), user_name: '书里的花' },
            { head_img: require('../../assets/publish/dongtai.png'), user_name: '书里的花' },
            { head_img: require('../../assets/publish/xuqiu.png'), user_name: '书里的花' }],
        };
        this.pnv = this.props.navigation;
        this.theme = Variable.Default;
    }
    _ongetColor(tag) {
        return this.state.tag == tag ? true : false;
    }
    _onToggle(tag) {
        this.setState({ tag: tag });
    }
    _onChangeMaerketType(type) {
        this.setState({ market_type: type });
    }
    _goTrendDetail() {
        this.pnv.navigate('trendDtl');
    }
    _goOthersHomePage() {
        this.pnv.navigate('othersHP');
    }
    render() {
        return (
            <View style={styles.bg}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={this.theme.themeColor} />
                <View style={styles.toggle_wrap}>
                    {this._renderToggle('圈子', this._ongetColor('圈子'))}
                    {this._renderToggle('集市', this._ongetColor('集市'))}
                </View>
                <View style={[styles.header, { alignItems: 'center' }]}>
                    <TouchableOpacity style={[styles.local_city, styles.center]} onPress={() => { }}>
                        <Text style={styles.local_city_txt}>成都市</Text>
                    </TouchableOpacity>
                    <View style={[styles.search_wrap, { alignItems: 'center' }]}>
                        <TextInput
                            style={styles.serach_input}
                            underlineColorAndroid="transparent"
                            placeholder={'输入您想要搜索的内容'}
                            placeholderTextColor="#888"
                            onChangeText={(text) => { }} />
                        <TouchableOpacity style={[styles.search_btn, styles.center]} onPress={() => { }}>
                            <Image style={styles.search_img} source={require('../../assets/circle/search.png')} />
                        </TouchableOpacity>
                    </View >
                </View>
                {this.state.tag == '集市' ? <View style={[styles.market_type_wrap, styles.center]}>
                    <View style={styles.market_type}>
                        {types.map((item, i) => {
                            return <View key={i} style={[styles.type_wrap, styles.center]}>
                                <TouchableOpacity onPress={() => { this._onChangeMaerketType(item) }}>
                                    <Text style={{ color: this.state.market_type == item ? '#fff' : '#9c2211' }}>{item}</Text>
                                </TouchableOpacity>
                                <View style={styles.triangle_wrap}>
                                    {this.state.market_type == item ? <View style={styles.triangle}></View> : null}
                                </View>
                            </View>
                        })}
                    </View>
                </View> : null}
                <View style={styles.box}>
                    <Text style={styles.title_txt}>推荐用户</Text>
                    <Text style={styles.hint_txt}>根据您的喜好，推荐的近期热门用户</Text>
                    <View style={styles.content}>
                        {this.state.recommend_data.map((item, i) => {
                            return <TouchableOpacity key={i} style={styles.head_img_wrap} onPress={() => { this._goOthersHomePage() }}>
                                <Image style={styles.head_img} source={item.head_img} />
                                <Text style={styles.username_txt}>{item.user_name}</Text>
                            </TouchableOpacity>
                        })}
                    </View>
                </View >
                {this.state.tag == '圈子' ?
                    <Circle goTrendDetail={this._goTrendDetail.bind(this)} goOthersHomePage={this._goOthersHomePage.bind(this)} /> :
                    <Market market_type={this.state.market_type} goOthersHomePage={this._goOthersHomePage.bind(this)} />}
            </View >
        )
    }

    _renderToggle(txt, tag) {
        return (
            <TouchableOpacity
                style={[styles.cirlce_wrap, styles.center, { backgroundColor: tag ? Variable.Default.themeColor : '#f39d17' }]}
                onPress={() => { this._onToggle(txt) }}>
                <Text style={styles.cirl_txt}>{txt}</Text>
            </TouchableOpacity>
        )
    }


}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(CircleScreen);

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggle_wrap: {
        width: 60,
        position: 'absolute',
        right: 0,
        top: 160,
        alignItems: 'center',
        zIndex: 10,
    },
    cirlce_wrap: {
        width: 60,
        height: 30,
        marginTop: 4,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    cirl_txt: {
        color: '#fff',
        fontWeight: '300',
    },
    header: {
        flexDirection: 'row',
        width: DevWH.sW,
        height: 50,
        backgroundColor: Variable.Default.themeColor,
    },
    local_city: {
        flex: .2,
    },
    local_city_txt: {
        color: '#fff',
    },
    search_wrap: {
        flex: .7,
        height: 30,
        flexDirection: 'row',
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    serach_input: {
        flex: .85,
        height: 40,
        marginLeft: 10,
    },
    search_btn: {
        flex: .2,
    },
    share_wrap: {
        flex: .15,
    },
    search_img: {
        width: 18,
        height: 19,
    },
    market_type_wrap: {
        width: DevWH.sW,
        backgroundColor: Variable.Default.themeColor,
    },
    market_type: {
        width: DevWH.sW - 80,
        flexDirection: 'row',
    },
    type_wrap: {
        flex: 1,

    },
    triangle_wrap: {
        height: 8,
    },
    triangle: {
        borderColor: '#fff',
        borderWidth: 4,
        transform: [{ rotate: '45deg' }],
        bottom: -6,
    },
    box: {
        width: DevWH.sW,
        backgroundColor: '#fff',
        marginTop: 3,
        marginBottom: 6,
    },
    title_txt: {
        color: '#333',
        marginTop: 6,
        marginLeft: 15,
    },
    hint_txt: {
        color: '#888',
        fontSize: 11 / Tools.Font(),
        marginLeft: 15,
    },
    content: {
        flexDirection: 'row',
        padding: 10,
    },
    head_img_wrap: {
        flex: 1,
        alignItems: 'center',
        borderColor: '#eee',
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        paddingBottom: 4,
    },
    head_img: {
        width: 30,
        height: 30,
        margin: 5,
    },
    username_txt: {
        color: '#666',
        fontSize: 12 / Tools.Font(),
    },
})