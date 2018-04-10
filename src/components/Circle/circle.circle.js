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
import SingleTrend from './single.trend'

const imgs = [1, 1, 1, 1, 1, 1, 1, 1, 1];
let DevWH = DeviceRn().getWidHig();
class Circle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trends_data: [{ head_img: require('../../assets/publish/dongtai.png'), user_name: '书里的花', }, { head_img: require('../../assets/publish/dongtai.png'), user_name: '书里的花', context: '执行该命令后，会自动在resources文件夹下创建已添加的平台名称的文件夹，如：android，其中会自动将图片进行缩放、裁剪，生成不同分辨率的图片，并在config.xml中添加相应内容。' }]
        };
        this.pnv = this.props.navigation;
        this.theme = Variable.Default;
    }

    _keyExtractor = (item, index) => index.toString();


    render() {
        return (
            <View style={styles.bg}>
                <FlatList
                    data={this.state.trends_data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
            </View >
        )
    }
    _renderItem = ({ item }) => {
        return (
            <SingleTrend goTrendDetail={this.props.goTrendDetail}
                goOthersHomePage={this.props.goOthersHomePage} />
        )
    }



}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(Circle);

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },

})