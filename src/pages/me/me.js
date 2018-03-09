import React, {
    Component
} from 'react'
import {
    View,
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
            <View>
                <Text> 个人 </Text>
            </View >
        )
    }
}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(MeScreen);

const styles = StyleSheet.create({

})