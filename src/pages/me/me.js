import React, {
    Component
} from 'react'
import {
    View,Button,
    Text,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import HeadrBar from '../../common/headerBar'

class MeScreen extends Component {
    static params = {
        Image: require('../../assets/tabs/me.png'),
        msg: '个人',
        header: null
    }
    static navigationOptions = ({ navigation, screenProps }) => HeadrBar(screenProps, MeScreen.params)
    constructor(props) {
        super(props);
        this.state = {

        };
        this.pnv = this.props.navigation;

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Button
                    title='登录'
                    onPress={this._goToDetails} />
                <Button
                    style={styles.btn}
                    title='订单详情'
                    onPress={this._goToOrderDetails} />
                <Button
                    style={styles.btn}
                    title='我的订单'
                    onPress={this._goToUserOrder} />
            </View >
        )
    }

    _goToDetails = () => {
        this.pnv.navigate('login');
    }
    _goToOrderDetails = () =>{
        this.pnv.navigate('OrderDetails')
    }
    _goToUserOrder = () =>{
        this.pnv.navigate('UserOrder')
    }
}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(MeScreen);

const styles = StyleSheet.create({

})