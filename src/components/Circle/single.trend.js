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

const imgs = [1, 1, 1, 1, 1, 1, 1];
let DevWH = DeviceRn().getWidHig();
class SingleTrend extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.pnv = this.props.navigation;
        this.theme = Variable.Default;
    }



    render() {
        return (
            <View style={styles.bg}>
                <View style={styles.trends_bg}>
                    <View style={styles.trends_head}>
                        <TouchableOpacity onPress={() => { this.props.goOthersHomePage() }}>
                            <Image style={styles.trends_head_img} source={require('../../assets/publish/dongtai.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.goOthersHomePage() }}>
                            <Text style={styles.trends_username_txt}>在下版本达拉</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.trends_context}>
                        <TouchableOpacity onPress={() => { this.props.goTrendDetail() }}>
                            <Text style={styles.trends_context_txt}>执行该命令后，会自动在resources文件夹下创建已添加的平台名称的文件夹，如：android，其中会自动将图片进行缩放、裁剪，生成不同分辨率的图片，并在config.xml中添加相应内容。也可分开执行</Text>
                        </TouchableOpacity>
                        <View style={styles.trends_imgs_wrap}>
                            {imgs.map((item, i) => { return <Image key={i} style={styles.trends_img} source={require('../../assets/publish/xuqiu.png')} /> })}
                        </View>
                        <View style={styles.trends_time_wrap}>
                            <Text style={styles.trends_time}>10分钟之前</Text>
                            <View style={styles.trends_icons}>
                                <TouchableOpacity>
                                    <Image style={styles.trends_like} source={require('../../assets/circle/like.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image style={styles.trends_say} source={require('../../assets/circle/say.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {[1, 1].map((item, i) => {
                        return <View key={i} style={styles.comments}>
                            <TouchableOpacity>
                                <Image style={styles.comments_head_img} source={require('../../assets/publish/dongtai.png')} />
                            </TouchableOpacity>
                            <View style={styles.comments_content}>
                                <Text style={styles.comments_username_txt}>在下版本达拉</Text>
                                <Text style={styles.comments_txt}>执行该命令后，建已图片进行缩放、裁剪，生成不同分辨率的图片，并在config.xml中添加相应内容。也可分开执行</Text>
                                <View style={styles.comments_reply}>
                                    <Text style={[styles.comments_txt, { marginBottom: 0, }]}>执行该进行缩放、裁剪，生成不同分辨率的图片，并在config.xml中添加相应内容。也可分开执行</Text>
                                </View>
                            </View>
                        </View>
                    })}
                </View>
            </View >
        )
    }



}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(SingleTrend);

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    trends_bg: {
        width: DevWH.sW,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderBottomWidth: 6,
    },
    trends_head: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trends_head_img: {
        width: 40,
        height: 40,
        margin: 15,
        marginBottom: 8,
    },
    trends_username_txt: {
        color: '#333',
    },
    trends_context: {
        padding: 15,
        paddingTop: 0,
        alignItems: 'center',
    },
    trends_context_txt: {
        color: '#666',
        fontSize: 12 / Tools.Font(),
    },
    trends_imgs_wrap: {
        width: DevWH.sW - 20,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    trends_img: {
        width: 100,
        height: 90,
        margin: 5,
        borderRadius: 5,
    },
    trends_time_wrap: {
        width: DevWH.sW - 40,
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        borderColor: '#eee',
        borderBottomWidth: 1,
        paddingBottom: 8,
    },
    trends_time: {
        flex: .9,
        color: '#aaa',
        fontSize: 12 / Tools.Font(),
    },
    trends_icons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    trends_like: {
        width: 16.7,
        height: 20,
    },
    trends_say: {
        width: 20,
        height: 18,
        marginLeft: 20,
    },
    comments: {
        width: DevWH.sW - 10,
        flexDirection: 'row',
    },
    comments_head_img: {
        width: 30,
        height: 30,
        marginLeft: 10,
        marginRight: 10,
    },
    comments_content: {
        flex: 1,
    },
    comments_username_txt: {
        color: '#555',
        marginTop: 5,
        marginBottom: 5,
    },
    comments_txt: {
        color: '#666',
        fontSize: 11 / Tools.Font(),
        marginBottom: 5,
    },
    comments_reply: {
        backgroundColor: '#eee',
        padding: 4,
        paddingLeft: 8,
    },
})