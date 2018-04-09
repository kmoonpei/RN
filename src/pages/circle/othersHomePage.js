import React, {
    Component
} from 'react'
import {
    View, Text, Button, StatusBar, Image, ScrollView, FlatList,
    StyleSheet, TouchableOpacity, TextInput, Modal,
} from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'
import { Variable } from '../../variables'
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'
import SingleTrend from '../../components/Circle/single.trend'
import SingleTask from '../../components/Circle/single.task'

const themeC = Variable.Default.themeColor;
let DevWH = DeviceRn().getWidHig();
const types = ['他的圈子', '他的集市'];
class OthersHomePageScreen extends Component {
    static params = {
        header: null
    }
    static navigationOptions = ({ navigation, screenProps }) => HeaderBar(screenProps, OthersHomePageScreen.params)
    constructor(props) {
        super(props);
        this.state = {
            role: '装修队',
            gread_data: [234, 553, 88],
            type: '他的圈子',
            trends_data: [1, 1, 1]
        };
        this.pnv = this.props.navigation;
        this.theme = Variable.Default;
    }
    _onBack() {
        this.pnv.goBack();
    }
    _goTrendDetail() {
        this.pnv.navigate('trendDtl');
    }
    _goOthersHomePage() {
        this.pnv.navigate('othersHP');
    }
    _onToggleType(item) {
        this.setState({ type: item });
    }
    _keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View style={[{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }]}>
                <View style={[styles.header, { height: this.state.role == '业主' ? 110 : 130, borderBottomLeftRadius: this.state.role == '业主' ? 0 : 30, borderBottomRightRadius: this.state.role == '业主' ? 0 : 30 }]}></View>
                <View style={styles.header_back}>
                    <TouchableOpacity style={styles.back_wrap} onPress={() => { this._onBack() }}>
                        <Image style={styles.back} source={require('../../assets/publish/arrows_left.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.basic_info_wrap}>
                    <View style={[styles.basic_info]}>
                        <Image style={styles.head_img} source={require('../../assets/publish/dongtai.png')} />
                        <View style={styles.info_center_wrap}>
                            <Text style={styles.info_name_txt}>在下哈喽好</Text>
                            <View style={[styles.info_eare]}>
                                <Text style={styles.info_city}>厦门 集美区</Text>
                                <View style={styles.parting_line}></View>
                                <View style={styles.info_location}>
                                    <Image style={styles.location_img} source={require('../../assets/circle/location.png')} />
                                    <Text style={styles.info_city}>500M</Text>
                                </View>
                                {this.state.role == '业主' ? null : <View style={styles.parting_line}></View>}
                                {this.state.role == '业主' ? null : <Text style={styles.info_city}>材料商</Text>}
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.attention_wrap, styles.center]}>
                            <Text style={styles.attention_txt}>+关注</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.role == '业主' ? null : <View style={styles.gread_box}>
                    {this.state.gread_data.map((item, i) => {
                        let type = '';
                        switch (i) {
                            case 0: type = '成交'; break;
                            case 1: type = '业绩'; break;
                            case 2: type = '粉丝'; break;
                        }
                        return <View key={i} style={[styles.gread_item, styles.center]}>
                            <Text style={styles.gread_txt1}>{type}</Text>
                            <Text style={styles.gread_txt2}>{item}{i == 0 ? '笔' : ''}</Text>
                        </View>
                    })}
                </View>}
                <View style={styles.toggle_type_box}>
                    {types.map((item, i) => {
                        return <View key={i} style={styles.type_box}>
                            <TouchableOpacity onPress={() => { this._onToggleType(item) }}>
                                <Text style={[styles.type_txt, { color: this.state.type == item ? '#555' : '#aaa', fontSize: this.state.type == item ? 13 / Tools.Font() : 11 / Tools.Font() }]}>{item}</Text>
                            </TouchableOpacity>
                            {this.state.type == item ? <View style={styles.type_selected}></View> : <View></View>}
                        </View>
                    })}

                </View>
                <View style={styles.content}>
                    <FlatList
                        data={this.state.trends_data}
                        extraData={this.state.type}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem} />
                </View>
                <View style={[styles.consult, styles.center]}>
                    {this.state.role == '业主' ? <TouchableOpacity style={[styles.consult_wrap, styles.center]}>
                        <Image style={styles.consult_img} source={require('../../assets/circle/say.png')} />
                        <Text style={styles.consult_txt} >咨询他</Text>
                    </TouchableOpacity> : (
                            <View style={styles.consult_wrap1}>
                                <TouchableOpacity style={[styles.consult_wrap_l, styles.center]}>
                                    <Image style={[styles.consult_img, { tintColor: themeC, }]} source={require('../../assets/circle/say.png')} />
                                    <Text style={{ color: themeC }} >咨询他</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.consult_wrap_r, styles.center]}>
                                    <Image style={styles.consult_img1} source={require('../../assets/circle/hire.png')} />
                                    <Text style={styles.consult_txt} >雇佣他</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                </View>
            </View >
        )
    }
    _renderItem = ({ item }) => {
        return (this.state.type == '他的圈子' ? 
        <SingleTrend goTrendDetail={this._goTrendDetail.bind(this)} goOthersHomePage={this._goOthersHomePage.bind(this)}/> : 
        <SingleTask  market_type={'设计'} goOthersHomePage={this._goOthersHomePage.bind(this)}/>)
    }



}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(OthersHomePageScreen);

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: DevWH.sW,
        // height: 130,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'absolute',
        top: 0,
        backgroundColor: themeC,
    },
    header_back: {
        width: DevWH.sW,
        height: 50,
    },
    back_wrap: {
        position: 'absolute',
        margin: 20,
        zIndex: 1,
        width: 50,
        height: 20,
    },
    back: {
        width: 8,
        height: 16,
    },
    basic_info_wrap: {
        zIndex: 2,
        width: DevWH.sW,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    basic_info: {
        flex: .9,
        height: 50,
        flexDirection: 'row',
    },
    head_img: {
        width: 40,
        height: 40,
        borderRadius: 40,
        marginRight: 10,
    },
    info_center_wrap: {
        flex: .6,
    },
    info_name_txt: {
        color: '#fff',
        fontSize: 13 / Tools.Font(),
    },
    info_eare: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    info_city: {
        color: '#fff',
        fontSize: 11 / Tools.Font(),
    },
    parting_line: {
        width: 1,
        height: 10,
        backgroundColor: '#fff',
        marginLeft: 8,
        marginRight: 8,
    },
    info_location: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location_img: {
        width: 8,
        height: 10,
        marginRight: 4,
    },
    attention_wrap: {
        position: 'absolute',
        width: 50,
        height: 20,
        right: 0,
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    attention_txt: {
        color: '#555',
        fontSize: 12 / Tools.Font(),
    },
    gread_box: {
        width: DevWH.sW - 40,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        borderColor: '#eee',
        borderWidth: 1,
        elevation: 5,
    },
    gread_item: {
        flex: 1,
    },
    gread_txt1: {
        color: '#555',
    },
    gread_txt2: {
        color: '#999',
        fontSize: 11 / Tools.Font(),
        marginTop: 6,
    },
    toggle_type_box: {
        flexDirection: 'row',
        width: DevWH.sW,
        height: 50,
        borderColor: '#eee',
        borderBottomWidth: 3,
    },
    type_box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    type_txt: {
        marginBottom: 8,
    },
    type_selected: {
        width: 35,
        borderColor: themeC,
        borderWidth: 1,
    },
    content: {
        width: DevWH.sW,
        flex: 1,
        marginBottom: 40,
    },
    consult: {
        position: 'absolute',
        bottom: 0,
        width: DevWH.sW,
        height: 40,
        flexDirection: 'row',
        borderColor: '#eee',
        borderTopWidth: 1,
        backgroundColor: '#fff',
    },
    consult_wrap: {
        flex: .85,
        height: 30,
        backgroundColor: themeC,
        flexDirection: 'row',
        borderRadius: 4,
    },
    consult_img: {
        width: 16,
        height: 14,
        marginRight: 8,
        tintColor: '#fff',
    },
    consult_txt: {
        color: '#fff',
    },
    consult_wrap1: {
        flex: .85,
        height: 30,
        flexDirection: 'row',
    },
    consult_wrap_l: {
        flexDirection: 'row',
        flex: .4,
        borderColor: themeC,
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 10,
    },
    consult_wrap_r: {
        flexDirection: 'row',
        flex: .6,
        backgroundColor: themeC,
        borderRadius: 4,
    },
    consult_img1: {
        tintColor: '#fff',
        width: 13,
        height: 14,
        marginRight: 8,
    },
})