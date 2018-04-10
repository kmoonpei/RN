import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Alert, NetInfo,
    Button, Image, TextInput, TouchableOpacity,ScrollView
} from 'react-native';
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'
import { Variable } from '../../variables'
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'
import DetailsBePay from '../../components/details/details.bePay'
let DevWH = DeviceRn().getWidHig();

class OrderDetails extends Component {
    static pars = {
        title: '订单详情'
    }
    static navigationOptions = ({ navigation, screenProps }) => HeaderBar(screenProps, OrderDetails.pars)
    constructor(props) {
        super(props);
        this.state = {
            state:'0',//订单状态（待支付为0，待结清为1（服务型），待发货为2（商品型），已发货为3（商品型），已结清等待确认为4，交易完成为5）
            detailsType:'1',//订单类型（服务型为0,,商品型为1）
            userType:'1',//用户类型（卖家为0，买家为1）
        };
        this.pnv = this.props.navigation;
    }

    render() {
        return (
            <View style={styles.bg} >
                <Image style={[styles.bg_view]} source={require('../../assets/details/bg_view.png')} />
                    <View style={styles.titleBar}>
                        <Text style={[(styles.payState,this.state.state == '1' || this.state.state == '3' || this.state.state == '4')?((this.state.state == '1')?styles.blue:styles.green):styles.red]}> 待支付 </Text>
                        <Text style={styles.payStateTitle}> 订单状态 </Text>
                    </View>
                    <Image style={[styles.line]} source={require('../../assets/details/line.png')} />
                    <View style={styles.detailsBox}>
                        <View style={styles.detailsHeader} >
                            <View style={styles.detailsTop} >
                                <Image style={[styles.detailsLogo]} source={require('../../assets/details/logo.png')} />
                            </View>
                            <View style={styles.detailsCenter} >
                                <Text style={styles.detailsTitle} >易客网络科技有限公司</Text>
                            </View>
                            <View style={styles.detailsFooter} >
                                <TouchableOpacity style={[styles.search_btn]} onPress={() => { }}>
                                    <Image  style={[styles.load]} source={require('../../assets/details/loadMore.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this._showDetailsType()}
                        {/*订单类型*/}
                    </View>
                    <Image style={[styles.line]} source={require('../../assets/details/line.png')} />
                    <ScrollView>
                        <DetailsBePay />
                        {/*订单信息组件*/}
                        
                        {this.state.state == 5? <Text style={styles.yeJiDan}> 已自动生成业绩单 </Text>:null}
                    </ScrollView>
                    {this._showThePayBtn()}
                    {/*显示的跳转按钮*/}
            </View >
        )
    }
    //订单显示的类型（服务还是商品类型）    
    _showDetailsType(){
        if(this.state.detailsType == '0'){
            return(
                <View style={styles.pad}>
                    <Text  style={styles.payDetailsMessage,styles.font}>如果你无法简洁的表达你的想法，那只能说明你还不够了解它 －阿尔伯特·爱因斯坦</Text>
                    <Image style={styles.payDetailsImg}  source={require('../../assets/details/detailsImg.png')}/>
                </View>
            )
        }else{
            return(
                <View style={styles.pads}>
                    <View style={styles.payDetails}>
                        <Image style={styles.payDetailsComodity}  source={require('../../assets/details/detailsImg.png')}/>
                    </View>
                    <View style={styles.detailsText}>
                        <Text style={styles.font}> 马克菠萝瓷砖 </Text>
                        <Text style={styles.font}> 22.00元 </Text>
                        <Text style={styles.font}> *10 </Text>
                    </View>
                </View>
            )
        }
    }
    //支付跳转确定按钮
    _showThePayBtn(){
        
        if(this.state.state == '0'){
            return(
                <View style={styles.detailsBtn} >
                    <TouchableOpacity style={[styles.search_btn,styles.search_show]} onPress={() => { }}>
                        <Image  style={[styles.chouse]} source={require('../../assets/details/chouse.png')} /><Text style={styles.btn} >去支付</Text>
                    </TouchableOpacity>
                </View>
            )
        }else if(this.state.state == '4'){
            return(
                <View style={styles.chouseBtn} >
                    <TouchableOpacity style={[styles.search_btn,styles.search_show]} onPress={() => { }}>
                        <Image  style={[styles.chouse]} source={require('../../assets/details/chouse.png')} /><Text style={styles.btn} >确认完成</Text>
                    </TouchableOpacity>
                </View>
            )
        }else if(this.state.state == '2'){
            return(
                <View style={styles.sedBtn}>
                    <TouchableOpacity style={[styles.search_btn,styles.search_show]} onPress={() => { }}>
                        <Text style={styles.btn} >发货</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(OrderDetails);

const styles = StyleSheet.create({
    
    bg: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#d64037',
        marginBottom: 6,
        paddingBottom: 10,
    },
    bg_view:{
        flex: 1,
        position: 'absolute',
        resizeMode:'stretch',
        width: DevWH.sW,
        height: DevWH.sH,
    },
    titleBar:{
        marginTop:20
    },
    payState:{
        alignItems:'center',
        fontSize:20,
    },
    payStateTitle:{
        alignItems:'center',
        fontSize:10,
        color:'#bcbcbc',
        marginTop:5
    },
    red:{
        color:'#ed452d',
    },
    blue:{
        color:'#4272d7',
    },
    green:{
        color:'#40b765',
    },
    line:{
        width:DevWH.sW-30,
        height:1,
        alignItems:'center',
        marginTop:10,
    },

    detailsBox:{
        width:DevWH.sW-60,
        alignItems:'center',
        marginTop:10,
        borderWidth:1,
        borderColor:'#efefef'
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
        flex:.775
    },
    detailsFooter:{
        flex:.1
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
    search_show:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
    },
    search_btn:{
        alignItems:'center',
        marginTop:7
    },
    load:{
        width:7,
        height:14,
    },
    pad:{
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        padding:15
    },
    pads:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginTop:10,
        padding:15
    },
    payDetails:{
        flex:.3,
        marginTop:5
    },
    detailsText:{
        flex:.7
    },
    payDetailsMessage:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'center',
        fontSize:12
        
    },
    payDetailsImg:{
        width:DevWH.sW-70,
        height:150,
        resizeMode:'contain',
        marginTop:10
    },
    payDetailsComodity:{
        width:70,
        height:50,
    },
    detailsMessage:{
        marginTop:10
    },
    font:{
        fontSize:12,
        color:'#666666',
        lineHeight:20,
    },
    delete:{
        height:10,
        width: 10,
    },
    deleteOption:{
        position:'absolute',
        zIndex:10,
        right:10,
        top:5
    },
    detailsBtn:{
        backgroundColor:'#ed452d',
        position:'absolute',
        zIndex:10,
        width:DevWH.sW,
        height:40,
        bottom:0,
        alignItems:'center',
    },
    chouseBtn:{
        backgroundColor:'#009f31',
        position:'absolute',
        zIndex:10,
        width:DevWH.sW,
        height:40,
        bottom:0,
        alignItems:'center',
    },
    sedBtn:{
        backgroundColor:'#b0b0b0',
        position:'absolute',
        zIndex:10,
        width:DevWH.sW,
        height:40,
        bottom:0,
        alignItems:'center',
    },
    chouse:{
        height:15,
        width:15
    },
    btn:{
        color:'#fff',
        fontSize:16,
        marginLeft:5
    },
    yeJiDan:{
        fontSize:12,
        color:"#ed452d",
        alignItems:'center',
        marginTop:30
    }
    
})