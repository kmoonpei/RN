import React, {
    Component
} from 'react'
import {
    View, Text, Button, Image,
    StyleSheet, TouchableOpacity, TextInput, FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import HeadrBar from '../../common/headerBar'
import { Variable } from '../../variables'
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'

let DevWH = DeviceRn().getWidHig();
let roles = ['业主', '设计工作室', '装修公司', '施工队', '材料商'];
const themeC = Variable.Default.themeColor;
let list = [1, 1, 1, 1, 1, 1, 1, 1, 1];
class NearbyScreen extends Component {
    static params = {
        Image: require('../../assets/tabs/nearby.png'),
        msg: '附近',
        header: null
    }
    static navigationOptions = ({ navigation, screenProps }) => HeadrBar(screenProps, NearbyScreen.params)
    constructor(props) {
        super(props);
        this.state = {
            role_selected: '业主',
            order_first: '最近交易',
            order_selected: '最近交易',
        };
        this.pnv = this.props.navigation;

    }

    _onChangeRole(role) {
        this.setState({ role_selected: role });
        this.setState({ order_first: role == '业主' ? '最近交易' : '业绩' });
        if (this.state.order_selected !== '距离') {
            this.setState({ order_selected: role == '业主' ? '最近交易' : '业绩' })
        } else {
            this.setState({ order_selected: '距离' })
        }
    }
    _onChangeOrder(item) {
        this.setState({ order_selected: item });
    }
    _keyExtractor = (item, index) => index.toString();
    _goOtherHomePage(){
        this.pnv.navigate('othersHP');
    }

    render() {
        return (
            <View style={styles.bg}>
                <View style={[styles.header, { alignItems: 'center' }]}>
                    <View style={[styles.local_city, styles.center]}>
                        <Image style={styles.local_city_img} source={require('../../assets/tabs/nearby.png')} />
                        <TouchableOpacity>
                            <Text style={styles.local_city_txt}>附近</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.search, { alignItems: 'center' }]}>
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
                <View style={[styles.market_type_wrap, styles.center]}>
                    {roles.map((item, i) => {
                        return <View key={i} style={[styles.type_wrap, styles.center]}>
                            <TouchableOpacity onPress={() => { this._onChangeRole(item) }}>
                                <Text style={{ color: this.state.role_selected == item ? '#fff' : '#9c2211' }}>{item}</Text>
                            </TouchableOpacity>
                            <View style={styles.triangle_wrap}>
                                {this.state.role_selected == item ? <View style={styles.triangle}></View> : null}
                            </View>
                        </View>
                    })}
                </View>
                <View style={styles.order}>
                    <View style={[styles.order_item, styles.center]}>
                        <View style={[styles.order_box, { borderColor: this.state.order_selected == this.state.order_first ? themeC : '#fff' }]}>
                            <TouchableOpacity onPress={() => { this._onChangeOrder(this.state.order_first) }}>
                                <Text style={[styles.order_item_txt, { color: this.state.order_selected == this.state.order_first ? '#555' : '#aaa' }]}>{this.state.order_first}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.order_item, styles.center]}>
                        <View style={[styles.order_box, { borderColor: this.state.order_selected == '距离' ? themeC : '#fff' }]}>
                            <TouchableOpacity onPress={() => { this._onChangeOrder('距离') }}>
                                <Text style={[styles.order_item_txt, { color: this.state.order_selected == '距离' ? '#555' : '#aaa' }]}>距离</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.address}>
                    <Image style={styles.address_img} source={require('../../assets/nearby/location1.png')} />
                    <Text style={styles.address_txt}>成都市高新区美年广场B座</Text>
                </View>
                <View style={styles.item_list_wrap}>
                    <FlatList
                        data={list}
                        extraData={this.state.role_selected}
                        keyExtractor={this._keyExtractor}
                        ItemSeparatorComponent={this._renderLine}
                        renderItem={this._renderItem} />
                </View>
            </View >
        )
    }
    _renderLine = () => {
        return (
            <View style={styles.line}></View>
        )
    }
    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item_wrap} onPress={()=>{this._goOtherHomePage()}}>
                <Image style={styles.header_img} source={require('../../assets/publish/xuqiu.png')} />
                <View style={styles.info_wrap}>
                    <Text style={styles.name}>厦门装甲兵装修公司</Text>
                    <Text style={styles.info_content_txt}>你家覅未批复精神可嘉佛教票据届世界顶级</Text>
                    <View style={styles.info_grade}>
                        <Image style={styles.order_img} source={this.state.role_selected == '业主' ? require('../../assets/nearby/deal.png') : require('../../assets/nearby/performance.png')} />
                        <Text style={[styles.info_grade_txt, { marginRight: 4, }]}>{this.state.role_selected == '业主' ?'最近成交':'业绩单'}</Text>
                        <Text style={styles.info_grade_txt}>{this.state.role_selected == '业主' ?'14:23 03.09':'2324笔'}</Text>
                    </View>
                </View>
                <View style={[styles.item_location_wrap, styles.center]}>
                    <View style={styles.point}></View>
                    <Text style={styles.location_txt}>500m</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(NearbyScreen);

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        width: DevWH.sW,
        height: 50,
        backgroundColor: themeC,
    },
    local_city: {
        flex: .2,
        flexDirection: 'row',
    },
    local_city_img: {
        width: 12,
        height: 14,
        tintColor: '#fff',
        marginRight: 6,
    },
    local_city_txt: {
        color: '#fff',
    },
    search: {
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
    search_wrap: {
        flex: .15,
    },
    search_img: {
        width: 18,
        height: 19,
    },
    market_type_wrap: {
        flexDirection: 'row',
        width: DevWH.sW,
        height: 30,
        backgroundColor: themeC,
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
        bottom: -7,
    },
    order: {
        flexDirection: 'row',
        width: DevWH.sW,
        height: 30,
        backgroundColor: '#fff',
    },
    order_item: {
        flex: 1,
    },
    order_box: {
        height: 30,
        justifyContent: 'center',
        borderColor: themeC,
        borderBottomWidth: 1,
    },
    order_item_txt: {
        fontSize: 12 / Tools.Font(),
    },
    address: {
        width: DevWH.sW,
        height: 30,
        flexDirection: 'row',
        marginTop: 6,
        borderColor:'#eee',
        borderBottomWidth:1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    address_img: {
        width: 14,
        height: 17,
        marginLeft: 20,
        marginRight: 15,
    },
    address_txt: {
        color: '#555',
        fontSize: 13 / Tools.Font(),
    },
    item_list_wrap: {
        width: DevWH.sW,
        flex: 1,
    },
    item_wrap: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    header_img: {
        flex: .18,
        height: 50,
        borderRadius: 3,
        marginRight: 10,
    },
    info_wrap: {
        flex: .72,
        height: 50,
    },
    name: {
        color: '#555',
        fontSize: 14 / Tools.Font(),
    },
    info_content_txt: {
        color: '#aaa',
        fontSize: 12 / Tools.Font(),
    },
    info_grade: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    order_img: {
        width: 10,
        height: 10,
        marginRight: 6,
    },
    info_grade_txt: {
        color: '#555',
        fontSize: 11 / Tools.Font(),
    },
    item_location_wrap: {
        flex: .1,
        flexDirection: 'row',
    },
    point: {
        width: 4,
        height: 4,
        borderRadius: 4,
        backgroundColor: themeC,
        marginRight: 4,
    },
    location_txt: {
        color: '#555',
        fontSize: 12 / Tools.Font(),
    },
    line: {
        borderColor: '#eee',
        borderBottomWidth: 1,
    },
})