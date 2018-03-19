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

        };
        this.pnv = this.props.navigation;

    }

    render() {
        return (
            <View style={{flex:1}}>
                <Text> 附近 </Text>
            </View >
        )
    }
}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(NearbyScreen);

const styles = StyleSheet.create({

})