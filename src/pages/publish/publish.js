import React, {
    Component
} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import {connect} from 'react-redux'
import HeadrBar from '../../common/headerBar'

class PublishScreen extends Component {
    static params = {
        Image: require('../../assets/tabs/publish.png'),
        msg: '发布',
        header: null
    }
    static navigationOptions = ({ navigation, screenProps }) => HeadrBar(screenProps, PublishScreen.params)
    constructor(props) {
        super(props);
        this.state = {

        };
        this.pnv = this.props.navigation;

    }
    componentDidMount(){

    }

    render() {
        return ( 
            <View> 
                <Text> 发布 </Text>
            </View >
        )
    }
}

mapStoreState = (store)=>({

});
export default connect(mapStoreState)(PublishScreen);

const styles=StyleSheet.create({
    
})