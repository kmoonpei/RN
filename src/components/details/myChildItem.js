import React, {
    Component
} from 'react'
import {
    View, Image,Text, TouchableOpacity,StyleSheet,ScrollView,Button
} from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'
import { Variable } from '../../variables'
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'
let DevWH = DeviceRn().getWidHig();

class MyChildItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '1' //服务为0，商品为1
        }
    }


    render() {
        return (
            <View style={styles.bg}>
                <ScrollView>
                    <View style={styles.content}>
                    	<View style={styles.detailsHeader} >
                            <View style={styles.detailsTop} >
                                <Image style={[styles.detailsLogo]} source={require('../../assets/details/logo.png')} />
                            </View>
                            <View style={styles.detailsCenter} >
                                <Text style={styles.detailsTitle} >易客网络科技有限公司</Text>
                                <Text style={styles.detailsTitlse} >2018-01-30 12:12</Text>
                            </View>
                            <View style={styles.detailsFooter} >
                                <Text style={styles.detailsTitles} >待支付</Text>
                            </View>
                        </View>
                        <View style={styles.lineBg}></View>
                        <View style={styles.pads}>
		                    <View style={styles.payDetails}>
		                        <Image style={styles.payDetailsComodity}  source={require('../../assets/details/detailsImg.png')}/>
		                    </View>
		                    <View style={styles.detailsText}>
		                    	{this.state.data == '0'
		                    	?
		                    	<View>
			                    	<Text style={[styles.font]}> 马克菠萝瓷砖 </Text>
			                        <View style={[styles.fontStyle]}>  
			                        	<Text style={[styles.fonts]}> 装修 </Text> 
			                        	<Text style={[styles.font]}> 订单号：1234567890 </Text> 
			                        </View>
		                        </View>
		                        :
		                        <View>
			                        <View style={[styles.fontStyles]}>  
			                        	<Text style={[styles.font]}> 马克菠萝瓷砖 </Text> 
			                        	<Text style={[styles.font]}> 22.00元 </Text> 
			                        </View>
			                        <Text style={[styles.font]}> *10 </Text> 
			                        <View style={[styles.fontStyles]}>  
			                        	<Text style={[styles.fonts]}> 材料 </Text> 
			                        	<Text style={[styles.font]}> 订单号：1234567890 </Text> 
			                        </View>
		                        </View>}
		                        
		                    </View>

		                </View>
		                <View style={styles.lineBg}></View>
		                <View style={styles.orderFooter}>
		                	<Text style={styles.footerFont}>
								用户1234567890接受了您的报价，待支付220.00元		                		
		                	</Text>
		                	<TouchableOpacity  onPress={() => { }}>
			                	<Text style={styles.button}>
									确认完成		                		
			                	</Text>
		                	</TouchableOpacity>
		                </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(MyChildItem);

const styles = StyleSheet.create({
	orderFooter:{
		flexDirection: 'row',
		justifyContent:'space-between',
		height:30,
		lineHeight:30
	},
	button:{
		paddingLeft: 5,
		paddingRight:5,
        borderColor: '#7fcf98',
        borderWidth: 1,
        borderRadius: 2,
        color:"#7fcf98",
        marginTop:5,
        marginRight:10
	},
	ng:{
		backgroundColor:'#b6b5b5',
		width: DevWH.sW,
        height: DevWH.sH,
	},
	content:{
		paddingTop:10,
        marginTop:20,
        marginLeft:20,
        marginRight:20,
        backgroundColor: '#ffffff',
	},
	lineBg:{
		flexDirection: 'row',
		height:1,
		marginTop:10,
		marginLeft:10,
		marginRight:10,
		backgroundColor:'#f0f0f0',

	},
	fontStyle:{
		flexDirection: 'row',
		justifyContent:'space-between',
		marginTop:20,
		// textAligin:'center',
	},
	fontStyles:{
		flexDirection: 'row',
		justifyContent:'space-between',
		// textAligin:'center',
	},
    detailsHeader:{
        height:30,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    detailsTop:{
        flex:.15,
    },
    detailsCenter:{
        flex:.7
    },
    detailsFooter:{
        flex:.15,
        justifyContent:'flex-end'
    },
    detailsLogo:{
        width:30,
        height:30,
        marginLeft:10,
    },
    detailsTitle:{
        color:'#666666',
        fontSize:12,
    },
    detailsTitlse:{
        color:'#696767',
        fontSize:10,
    },
    detailsTitles:{
        color:'#f01313',
        fontSize:12,
        lineHeight:30,
    },
    pads:{
        flexDirection:'row',
        justifyContent:'flex-start',
        padding:10
    },
    payDetails:{
        flex:.3,
        marginTop:5
    },
    detailsText:{
        flex:.7
    },
    payDetailsImg:{
        width:DevWH.sW-70,
        height:150,
        resizeMode:'contain',
        marginTop:10,
        borderRadius:10
    },
    payDetailsComodity:{
        width:70,
        height:50,
    },
    font:{
        fontSize:12,
        color:'#666666',
        lineHeight:20,
        height:20
    },
    fonts:{
    	height:20,
        fontSize:12,
        color:'#666666',
        lineHeight:20,
        borderWidth:1,
        borderRadius:20,
        // textAligin:'center',
        borderColor:"#f37f6f",
        width:60,
        paddingLeft:15
    },
    footerFont:{
    	fontSize:10,
    	marginTop:10,
    	marginLeft:10
    },
    red:{
    	color:"#ed452d"
    },
    gary:{
    	color:"#cbcaca"
    }
})