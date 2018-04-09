import React, {
    Component
} from 'react'
import {
    View, Text, Button, StatusBar, Image, ScrollView,
    StyleSheet, TouchableOpacity, TextInput, Modal,
} from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'
import { Variable } from '../../variables'
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'

let DevWH = DeviceRn().getWidHig();
const imgs = [1, 1, 1, 1, 1, 1, 1, 1, 1];
class TrendDetails extends Component {
    static params = {
        header: null
    }
    static navigationOptions = ({ navigation, screenProps }) => HeaderBar(screenProps, TrendDetails.params)
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
        this.pnv = this.props.navigation;
        this.theme = Variable.Default;
    }
    _onBack() {
        this.pnv.goBack();
    }
    _openShareModal() {
        this.setState({ modalVisible: true });
    }
    _goOtherHP() {
        this.pnv.navigate('othersHP');
    }
    _onShare() {
        this.setState({ modalVisible: false });
    }
    
    render() {
        return (
            <View style={styles.center}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back_wrap} onPress={() => { this._onBack() }}>
                        <Image style={styles.back} source={require('../../assets/publish/arrows_left.png')} />
                    </TouchableOpacity>
                    <View style={[styles.header_txt_wrap, styles.center]}>
                        <Text style={styles.header_txt}>详情</Text>
                    </View >
                    <TouchableOpacity style={[styles.share_wrap, styles.center]} onPress={() => { this._openShareModal() }}>
                        <Image style={styles.share_img} source={require('../../assets/circle/share.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.trends_bg}>
                        <View style={styles.trends_head}>
                            <TouchableOpacity onPress={() => { this._goOtherHP() }}>
                                <Image style={styles.trends_head_img} source={require('../../assets/publish/dongtai.png')} />
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity onPress={() => { this._goOtherHP() }}>
                                    <Text style={styles.trends_username_txt}>在下版本达拉</Text>
                                </TouchableOpacity>
                                <View style={styles.tags}>
                                    <Text style={styles.tags_txt}>材料商</Text>
                                    <Text style={[styles.tags_txt, { backgroundColor: Variable.Default.themeColor, color: '#fff', }]}>粉丝数123</Text>
                                </View>
                            </View>
                            <View style={[styles.tags_sj, styles.center]}>
                                <Text style={styles.tags_sj_txt}>设计</Text>
                            </View>
                        </View>
                        <View style={styles.trends_context}>
                            <View>
                                <Text style={styles.trends_context_txt}>执行该命令后，会自动在resources文件夹下创建已添加的平台名称的文件夹，如：android，其中会自动将图片进行缩放、裁剪，生成不同分辨率的图片，并在config.xml中添加相应内容。也可分开执行</Text>
                            </View>
                            <View style={styles.trends_imgs_wrap}>
                                {imgs.map((item, i) => { return <Image key={i} style={styles.trends_img} source={require('../../assets/publish/xuqiu.png')} /> })}
                            </View>
                            <View style={styles.trends_time_wrap}>
                                <Text style={styles.trends_time}>3评论</Text>
                            </View>
                        </View>
                        {[1, 1].map((item, i) => {
                            return <View key={i} style={styles.comments}>
                                <TouchableOpacity>
                                    <Image style={styles.comments_head_img} source={require('../../assets/publish/dongtai.png')} />
                                </TouchableOpacity>
                                <View style={styles.comments_content}>
                                    <View style={styles.comments_name_time}>
                                        <TouchableOpacity>
                                            <Text style={styles.comments_username_txt}>在下版本达拉</Text>
                                        </TouchableOpacity>
                                        <View style={styles.comments_time_wrap}>
                                            <Text style={styles.comments_time}>2018.02.24 09:00</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.comments_txt}>执行该命令后，建已图片进行缩放、裁剪，生成不同分辨率的图片，并在config.xml中添加相应内容。也可分开执行</Text>
                                    <View style={styles.comments_reply}>
                                        <Text style={[styles.comments_txt, { marginBottom: 0, }]}>执行该进行缩放、裁剪，生成不同分辨率的图片，并在config.xml中添加相应内容。也可分开执行</Text>
                                    </View>
                                </View>
                            </View>
                        })}
                    </View>
                </ScrollView>
                {this._renderModal()}
            </View >
        )
    }

    _renderModal() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => { this.setState({ modalVisible: false }) }}
            >
                <View style={styles.types_wrap}>
                    <View style={styles.types_box}>
                        <View style={[styles.title_wrap, styles.center]}>
                            <Text>分享到</Text>
                        </View>
                        <View style={styles.imgs_wrap}>
                            <TouchableOpacity style={[styles.img_wrap, styles.center]} onPress={() => { this._onShare() }}>
                                <Image style={styles.img_wechat} source={require('../../assets/circle/wechat.png')} />
                                <Text style={styles.img_txt}>微信</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.img_wrap, styles.center]} onPress={() => { this._onShare() }}>
                                <Image style={styles.img_freindCirl} source={require('../../assets/circle/friendsCirl.png')} />
                                <Text style={styles.img_txt}>朋友圈</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }


}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(TrendDetails);

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        width: DevWH.sW,
        height: 50,
    },
    back_wrap: {
        position: 'absolute',
        margin: 20,
        zIndex: 1,
        width: 50,
        height: 20,
    },
    back: {
        width: 8,
        height: 16,
    },
    header_txt_wrap: {
        flex: 1,

        backgroundColor: Variable.Default.themeColor,
    },
    header_txt: {
        color: '#fff',
        fontSize: 16 / Tools.Font()
    },
    share_wrap: {
        position: 'absolute',
        right: 0,
        margin: 20,

    },
    share_img: {
        width: 18,
        height: 18,
    },

    trends_bg: {
        flex: 1,
        width: DevWH.sW,
        marginTop: 6,
        marginBottom: 6,
        paddingBottom: 20,
        backgroundColor: '#fff',
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
    tags: {
        flexDirection: 'row',
    },
    tags_txt: {
        backgroundColor: '#eee',
        color: '#555',
        fontSize: 10 / Tools.Font(),
        padding: 2,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 20,
        margin: 5,
    },
    tags_sj: {
        position: 'absolute',
        width: 50,
        height: 20,
        right: 30,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderColor: Variable.Default.themeColor,
        borderWidth: 1,
    },
    tags_sj_txt: {
        color: Variable.Default.themeColor,
        fontSize: 11 / Tools.Font(),

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
        color: '#555',
        fontSize: 12 / Tools.Font(),
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
    comments_name_time: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    comments_username_txt: {
        color: '#555',
        marginTop: 5,
        marginBottom: 5,
    },
    comments_time_wrap: {
        flex: 1,
        alignItems: 'flex-end',
    },
    comments_time: {
        fontSize: 11 / Tools.Font(),
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
    types_wrap: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    types_box: {
        position: 'absolute',
        width: DevWH.sW,
        height: 180,
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    title_wrap: {
        width: DevWH.sW - 100,
        padding: 20,
        borderColor: '#eee',
        borderBottomWidth: 1,
    },
    imgs_wrap: {
        flexDirection: 'row',
        width: DevWH.sW - 100,
    },
    img_wrap: {
        flex: 1,
        height: 100,
    },
    img_wechat: {
        width: 36,
        height: 30,
    },
    img_freindCirl: {
        width: 30,
        height: 30,
    },
    img_txt: {
        fontSize: 12 / Tools.Font(),
    },
})