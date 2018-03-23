import React, {
    Component
} from 'react'
import {
    View, Image, TouchableHighlight,
    Text,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import HeadrBar from '../../common/headerBar'
import { Variable } from '../../variables';
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'

let DevWH = DeviceRn().getWidHig();
const imgs = [require('../../assets/publish/xuqiu.png'), require('../../assets/publish/dongtai.png')]
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
    componentDidMount() {

    }
    _onSelected(tag) {
        let target = '';
        switch (tag) {
            case 0:target = 'editdemand';break;
            case 1:target = 'edittrends';break;
            default:
                break;
        }
        this.pnv.navigate(target);
    }

    render() {
        return (
            <View style={[styles.center]}>
                <View style={[styles.header, styles.center]}>
                    <Text style={styles.header_txt}>发布选择</Text>
                </View >
                <View style={[styles.title, styles.center]}>
                    <Text style={styles.title_txt1}>请选择您要发布的类型</Text>
                    <Text style={styles.title_txt2}>发布动态到朋友圈，发布需求到集市</Text>
                </View >
                <View style={[styles.selected, styles.center]}>
                    <Text style={styles.selected_txt}>选择类型</Text>
                    <View style={styles.line}></View>
                </View >
                {imgs.map((item, i) => {
                    return (
                        <View key={i} style={[styles.img_wrap, styles.center]} >
                            <TouchableHighlight onPress={() => { this._onSelected(i) }}>
                                <Image style={styles.img} source={item} />
                            </TouchableHighlight>
                        </View>
                    )
                })}
            </View >
        )
    }
}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(PublishScreen);

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: DevWH.sW,
        height: 50,
        backgroundColor: Variable.Default.themeColor,
    },
    header_txt: {
        color: '#fff',
        fontSize: 16 / Tools.Font()
    },
    title: {
        marginTop: 20,
        marginBottom: 30,
    },
    title_txt1: {
        fontSize: 20 / Tools.Font(),
        color: '#444',
    },
    title_txt2: {
        marginTop: 8,
        fontSize: 11 / Tools.Font(),
    },
    selected_txt: {
        color: '#444',
        fontSize: 14 / Tools.Font(),
    },
    line: {
        width: 28,
        borderColor: Variable.Default.themeColor,
        borderBottomWidth: 2.5,
        marginTop: 6,
    },
    img_wrap: {
        width: DevWH.sW,
        marginTop: 20,
    },
    img: {
        width: 340,
        height: 144,
        resizeMode: 'contain',
    },
})