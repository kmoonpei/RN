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

class CircleScreen extends Component {
    static params = {
        Image: require('../../assets/tabs/circle.png'),
        msg: '圈子',
        header: null
    }
    static navigationOptions = ({ navigation, screenProps }) => HeadrBar(screenProps, CircleScreen.params)
    constructor(props) {
        super(props);
        this.state = {

        };
        this.pnv = this.props.navigation;

    }

    render() {
        return (
            <View>
                <Text> 圈子 </Text>
            </View >
        )
    }
}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(CircleScreen);

const styles = StyleSheet.create({

})