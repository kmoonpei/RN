import React, {
    Component
} from 'react'
import {
    View, Text, Button,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'

class CircleScreen extends Component {
    static params = {
        Image: require('../../assets/tabs/circle.png'),
        msg: '圈子',
        header: null
    }
    static navigationOptions = ({ navigation, screenProps }) => HeaderBar(screenProps, CircleScreen.params)
    constructor(props) {
        super(props);
        this.state = {

        };
        this.pnv = this.props.navigation;

    }

    render() {
        return (
            <View style={styles.bg}>
                <Text> 圈子 </Text>
                <Button
                    style={styles.btn}
                    title='go to details page'
                    onPress={this._goToDetails} />
            </View >
        )
    }

    _goToDetails = () => {
        this.pnv.navigate('details');
    }
}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(CircleScreen);

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        backgroundColor: '#f00',
    }
})