import React, {
    Component
} from 'react'
import {
    View, Image, TouchableHighlight,
    Text, TouchableOpacity, FlatList,
    StyleSheet, ScrollView, TextInput
} from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'
import { Variable } from '../../variables'
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'
import SingleTask from './single.task'

const imgs = [1, 1, 1, 1, 1, 1, 1, 1, 1];
let DevWH = DeviceRn().getWidHig();
class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trends_data: [1, 1],

        };
        this.pnv = this.props.navigation;
        this.theme = Variable.Default;
    }

    _keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View style={styles.bg}>
                <FlatList
                    extraData={this.props.market_type}
                    data={this.state.trends_data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._remderTrendsItem} />
            </View >
        )
    }

    _remderTrendsItem = ({ item }) => {
        return (
            <SingleTask market_type={this.props.market_type}
                goOthersHomePage={this.props.goOthersHomePage} />
        )
    }


}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(Market);

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },

})