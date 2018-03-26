import React, {
    Component
} from 'react'
import {
    View, Image, TouchableHighlight,
    Text, TouchableOpacity,
    StyleSheet, ScrollView, TextInput
} from 'react-native'
import { connect } from 'react-redux'
import HeadrBar from '../../common/headerBar'
import { Variable } from '../../variables';
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'
import ImgPic from '../../components/imagepicker/image.picker'

let DevWH = DeviceRn().getWidHig();
const imgs = [require('../../assets/publish/xuqiu.png'), require('../../assets/publish/dongtai.png')]
class EditingTrendsScreen extends Component {
    static params = {
        header: null
    }
    static navigationOptions = ({ navigation, screenProps }) => HeadrBar(screenProps, EditingTrendsScreen.params)
    constructor(props) {
        super(props);
        this.state = {

        };
        this.pnv = this.props.navigation;
        this.img_list = [1];
    }
    componentDidMount() {

    }
    _onBack() {
        this.pnv.goBack();
    }

    render() {
        return (
            <View style={[styles.center]}>
                <ScrollView>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.back_wrap} onPress={() => { this._onBack() }}>
                            <Image style={styles.back} source={require('../../assets/publish/arrows_left.png')} />
                        </TouchableOpacity>
                        <View style={[styles.header_txt_wrap, styles.center]}>
                            <Text style={styles.header_txt}>发布动态</Text>
                        </View >
                    </View>
                    <View style={[styles.content_box, styles.center]}>
                        <View style={styles.title_wrap}><Text style={styles.title_txt1}>内容填写</Text></View>
                        <View style={[styles.title_wrap, { borderColor: '#fff', marginTop: 0, }]}><Text style={styles.title_txt2}>请填写您要发布的动态内容</Text></View>
                        <View style={styles.input_wrap}>
                            <TextInput
                                style={styles.txt_input}
                                multiline={true}
                                underlineColorAndroid="transparent"
                                placeholder={'您想说的。。。'}
                                placeholderTextColor="#888"
                                onChangeText={(text) => this.setState({ pwd: parseInt(text) })} />
                        </View>
                    </View>
                    <View style={[styles.content_box, styles.center]}>
                        <View style={styles.title_wrap}><Text style={styles.title_txt1}>添加图片</Text></View>
                        <View style={[styles.title_wrap, { borderColor: '#fff', borderLeftWidth: 0, marginTop: 0, }]}><Text style={styles.title_txt2}>请添加参考图片（选填）</Text></View>
                        {/* <View style={styles.img_content}>
                            {this.img_list.map((item, i) => {
                                return <TouchableOpacity key={i} style={styles.img_wrap} onPress={() => { }}>
                                    <Image style={styles.add_img} />
                                </TouchableOpacity>
                            })}
                            <TouchableOpacity style={styles.add_img_wrap} onPress={() => { }}>
                                <Image style={styles.add_img} source={require('../../assets/publish/add_new.png')} />
                            </TouchableOpacity>
                        </View> */}
                        <ImgPic />
                    </View>
                    <View style={[styles.content_box, styles.pub_wrap, styles.center]}>
                        <TouchableOpacity style={[styles.pub, styles.center]} onPress={() => { }}>
                            <Text style={{ color: '#fff' }}>发布</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View >
        )
    }
}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(EditingTrendsScreen);

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
    content_box: {
        backgroundColor: '#fff',
        marginTop: 8,
    },
    title_wrap: {
        width: DevWH.sW,
        paddingLeft: 14,
        borderColor: Variable.Default.themeColor,
        borderLeftWidth: 2,
        marginTop: 10,
        marginBottom: 2,
    },
    title_txt1: {
        fontSize: 14 / Tools.Font(),
        color: '#333',
    },
    title_txt2: {
        fontSize: 11 / Tools.Font(),
        color: '#aaa',
    },
    input_wrap: {
        width: DevWH.sW - 30,
        height: 120,
        borderColor: "#eee",
        borderWidth: 1,
        margin: 10,
    },
    txt_input: {
        padding: 20,
    },
    pub_wrap: {
        flexDirection: 'row',
        width: DevWH.sW,
        height: 70,
    },
    pub: {
        // width:220,
        flex: .66,
        height: 35,
        borderRadius: 2,
        backgroundColor: Variable.Default.themeColor,
    },
    // img_content: {
    //     width: DevWH.sW - 10,
    //     flexDirection: 'row',
    //     flexWrap: 'wrap',
    //     padding: 10,
    // },
    // img_wrap: {
    //     width: 80,
    //     height: 80,
    //     borderColor: '#aaa',
    //     borderWidth: 1,
    //     margin: 10,
    //     borderRadius: 4,
    // },
    // add_img_wrap: {
    //     width: 80,
    //     height: 80,
    //     margin: 10,
    // },
    // add_img: {
    //     width: 80,
    //     height: 80,
    // },

})