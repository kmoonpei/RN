import React, {
    Component
} from 'react'
import {
    View, Image,Text, TouchableOpacity,StyleSheet,ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'
import { Variable } from '../../variables'
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'

let DevWH = DeviceRn().getWidHig();
class detailsBePay extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	payState : '0',
        	detailsType:'1'
        };
        
    }

    render() {
        return (
            <View style={styles.bg}>
            	<View style={styles.detailsMessage}>
                    <Text style={styles.font}>订单编号：<Text style={styles.font}>1234567890</Text></Text>
                    <Text style={styles.font}>支付状态：<Text style={styles.font}>您接受了易客科技有限公司的报价 待支付</Text></Text> 
                    <Text style={styles.font}>下单时间：<Text style={styles.font}>2018-01-30 12:12</Text></Text> 
                    <Text style={styles.font}>订单总额：<Text style={styles.font}>16000.00元</Text></Text> 
                    <Text style={styles.font}>支付方式：<Text style={styles.font}>分期付款</Text></Text> 
                    <View style={styles.payHistory}>
						<Text style={styles.font}>您向 易客网络科技公司 支付了 10000.00 元</Text> 
						<Text style={styles.font,styles.colorDetails}>微信支付 2018.01.31 09:23</Text> 
						<Text style={styles.font}>您向 易客网络科技公司 支付了 2000.00 元</Text>            
						<Text style={styles.font,styles.colorDetails}>微信支付 2018.01.31 09:23</Text> 
						<Text style={styles.font}>您向 易客网络科技公司 支付了 2000.00 元</Text> 
						<Text style={styles.font,styles.colorDetails}>微信支付 2018.01.31 09:23</Text> 
                    </View> 
                </View>
                {this._showAddress()}
                {this._renderPayView()}
            </View >
        )
    }
	_renderPayView(){
		if(this.state.payState == '0'){
			return (
                <TouchableOpacity style={[styles.deleteOption]} onPress={() => { }}>
                    <Text style={styles.messgesView}> 支付进行中，不可删除订单</Text>
                </TouchableOpacity> 
			)
		}else{
			return (
                <TouchableOpacity style={[styles.deleteOption]} onPress={() => { }}>
                    <Image style={[styles.delete]} source={require('../../assets/details/delete.png')} />
                </TouchableOpacity>    
			)
		}
	}
	_showAddress(){
		if(this.state.detailsType != '0' && this.state.payState == '2'){
			return(
				<View style={styles.payAdress}>
					<Image style={[styles.line]} source={require('../../assets/details/line.png')} />
					<View style={styles.addressStyle}>
						<Text style={styles.font}>收件人：<Text style={styles.font}>徐磊</Text></Text>
	                    <Text style={styles.font}>联系电话：<Text style={styles.font}>12345678909</Text></Text> 
	                    <Text style={styles.font}>收货地址：<Text style={styles.font}>成都市高新区每年广场B座1029</Text></Text> 
	                    <Image style={[styles.line]} source={require('../../assets/details/line.png')} />
						<Text style={styles.font}>物流公司：<Text style={styles.font}>请输入您选择的物流公司</Text></Text>
	                    <Text style={styles.font}>物流单号：<Text style={styles.font}>请输入对应的物流单号</Text></Text> 
                    </View>
                </View> 
			)
		}else{
			return(
				<View style={styles.payAdress}>
					<Image style={[styles.line]} source={require('../../assets/details/line.png')} />
					<View style={styles.addressStyle}>
						<Text style={styles.font}>收件人：<Text style={styles.font}>徐磊</Text></Text>
	                    <Text style={styles.font}>联系电话：<Text style={styles.font}>12345678909</Text></Text> 
	                    <Text style={styles.font}>收货地址：<Text style={styles.font}>成都市高新区每年广场B座1029</Text></Text> 
						<Text style={styles.font}>物流公司：<Text style={styles.font}>请输入您选择的物流公司</Text></Text>
	                    <Text style={styles.font}>物流单号：<Text style={styles.font}>请输入对应的物流单号</Text></Text> 
                    </View>
                </View> 
			)
		}
	}
	_showlogistics(){

	}
}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(detailsBePay);

const styles = StyleSheet.create({
	bg:{

	},
    detailsMessage:{
        marginTop:20,
        marginLeft:30
    },
    addressStyle:{
    	marginLeft:30,
    	marginTop:10
    },
    payHistory:{
		marginTop:20,
		marginLeft:20
    },
    font:{
        fontSize:10,
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
        right:20,
        top:23
    },
    messgesView:{
		fontSize:10,
        color:'#666666',
    },
    colorDetails:{
    	color:'#b4acac',
    	fontSize:10
    },
    line:{
        width:DevWH.sW-30,
        height:1,
        alignItems:'center',
        marginTop:10
    },
    payAdress:{
    	marginBottom:40
    }
})