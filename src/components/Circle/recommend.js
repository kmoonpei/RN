import React, {
    Component
} from 'react'
import {
    View, Image, TouchableHighlight,
    Text, TouchableOpacity,
    StyleSheet, ScrollView, TextInput
} from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'
import { Variable } from '../../variables'
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'

let DevWH = DeviceRn().getWidHig();
class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.pnv = this.props.navigation;
        this.theme = Variable.Default;
        
    }

    render() {
        return (
            <View style={styles.box}>
                <Text style={styles.title_txt}>推荐用户</Text>
                <Text style={styles.hint_txt}>根据您的喜好，推荐的近期热门用户</Text>
                <View style={styles.content}>
                    {this.props.recommend_data.map((item, i) => {
                        return <TouchableOpacity key={i} style={styles.head_img_wrap} onPress={()=>{}}>
                            <Image style={styles.head_img} source={item.head_img} />
                            <Text style={styles.username_txt}>{item.user_name}</Text>
                        </TouchableOpacity>
                    })}
                </View>
            </View >
        )
    }

    _goToDetails = () => {
        this.pnv.navigate('login');
    }
}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(Recommend);

const styles = StyleSheet.create({
    box: {
        width: DevWH.sW,
        backgroundColor: '#fff',
        marginTop: 3,
        marginBottom:6,
    },
    title_txt: {
        color: '#333',
        marginTop: 6,
        marginLeft:15,
    },
    hint_txt: {
        color: '#888',
        fontSize: 11 / Tools.Font(),
        marginLeft: 15,
    },
    content: {
        flexDirection: 'row',
        padding:10,
    },
    head_img_wrap: {
        flex: 1,
        alignItems: 'center',
        borderColor: '#eee',
        borderWidth: 1,
        marginLeft: 4,
        marginRight:4,
        paddingBottom:4,
    },
    head_img: {
        width: 30,
        height: 30,
        margin: 5,
    },
    username_txt: {
        color: '#666',
        fontSize: 12 / Tools.Font(),
    },
})