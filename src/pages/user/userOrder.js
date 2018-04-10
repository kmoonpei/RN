import React, { Component } from 'react'
import {
    View, Text, Button, Image, StyleSheet,TouchableOpacity

} from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'
import DeviceRn from '../../components/Tools/device'
import { Variable } from '../../variables'
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import MyChildItem  from '../../components/details/myChildItem'
let DevWH = DeviceRn().getWidHig();
const tabNamesArray = ['全部', '待支付','进行中','已结清','已完成'];
class UserOrder extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
            const params = navigation.state.params || {};
            return HeaderBar(screenProps, {
                title: '我的订单',
                header_right: (<TouchableOpacity style={[styles.search_btn]} onPress={() => { }}>
                        <Text style={styles.topSize} >我的订单</Text>{params && params.navigatePress=='0'? <Image  style={[styles.chouse]} source={require('../../assets/details/typeTop.png')} />:<Image  style={[styles.chouse]} source={require('../../assets/details/typeBottom.png')} />}
                    </TouchableOpacity>)
            });
    }

    constructor(props) {
        super(props);
        this.state = {
            count: '3',
            orderType: '0'
        }
        this.theme = Variable.Default;
    }

    componentWillMount() {
        this.props.navigation.setParams({navigatePress:this.state.orderType})
    }


    render() {
        return (
            <View>
                <ScrollableTabView
                    style={{height: 30,lineHeight:30 }}
                    tabBarUnderlineStyle={{backgroundColor:'#ed452d',height:2}}
                    tabBarBackgroundColor='#FFFFFF'
                    tabBarActiveTextColor='#333333'
                    tabBarInactiveTextColor='#b6b5b5'
                    tabBarTextStyle={{fontSize: 12}}
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar />}
                  >
                    {this._getChildItem()}
                </ScrollableTabView>
                <View style={styles.options}>
                    <Text style={styles.topSize} >我的订单</Text>
                    <Text style={styles.topSize} >我的商品</Text>
                </View>
            </View>
        )
    }
    _getChildItem = () => {
        let array = new Array();
        for (let i = 0; i < tabNamesArray.length; i++) {
            array.push(<MyChildItem  key={i} tabLabel={tabNamesArray[i]}/>)
        }
        return array;
    }
    _showOrderType  = () => {

    }
    _changeOrderType = () => {

    }
    _getOrderType = () => {
        // if(this.state.orderType == '0'){
        //     return(
        //         <Text style={styles.topSize}>我的接单</Text>
        //     )
        // }else{
        //     return(
        //         <Text style={styles.topSize}>我的商品</Text>
        //     )
        // }
    }
}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(UserOrder);

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
        width: DevWH.sW,
        height: DevWH.sH,
    },
    options:{
        position:'absolute',
        top:0,
        right:0
    },
    search_btn:{
        marginRight:20,
        flexDirection: 'row',
        justifyContent:'flex-start'
    },
    detailsHeader:{
        height:30,
        flexDirection: 'row',
        backgroundColor: '#efefef',
    },
    detailsTop:{
        flex:.125,
    },
    detailsCenter:{
        flex:.675,
        flexDirection:'column',
    },
    detailsFooter:{
        flex:.2
    },
    detailsLogo:{
        width:20,
        height:20,
        marginLeft:10,
        marginTop:5
    },
    detailsTitle:{
        color:'#666666',
        fontSize:12,
        marginTop:5
    },
    topSize:{
        color:'#ffffff',
        fontSize:16,
        marginRight:20,

    },
    chouse:{
        width:5,
        height:5,
        marginTop:5,
    }
})