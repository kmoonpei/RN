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
const imgs = [require('../../assets/publish/xuqiu.png'), require('../../assets/publish/dongtai.png')];
const tags = ['设计', '装修', '材料', '其他']
class EditingDemandScreen extends Component {
    static params = {
        header: null
    }
    static navigationOptions = ({ navigation, screenProps }) => HeadrBar(screenProps, EditingDemandScreen.params)
    constructor(props) {
        super(props);
        this.state = {
            demand_type: '设计',
            isProduct: false,
        };
        this.pnv = this.props.navigation;
        this.img_list = [1];

    }
    componentDidMount() {

    }

    _onBack() {
        this.pnv.goBack();
    }

    _onChangeDemandType(item) {
        this.setState({ demand_type: item });
    }

    render() {
        return (
            <View style={[styles.center]}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back_wrap} onPress={() => { this._onBack() }}>
                        <Image style={styles.back} source={require('../../assets/publish/arrows_left.png')} />
                    </TouchableOpacity>
                    <View style={[styles.header_txt_wrap, styles.center]}>
                        <Text style={styles.header_txt}>{this.state.isProduct ? '商品售卖' : '发布需求'}</Text>
                    </View >
                </View>
                {/* 详尽的商品描述，更便于您的商品售卖服务 */}
                <View style={styles.hint_wrap}><Text style={styles.hint_txt}>{this.state.isProduct ? '详尽的商品描述，更便于您的商品售卖服务' : '定制需求，让更专业的人为您服务'}</Text></View>
                <ScrollView style={{marginBottom:40,}}>

                    {!this.state.isProduct ? (<View style={[styles.content_box, styles.center, { marginTop: 0, marginBottom: 6 }]}>
                        <View style={styles.title_wrap}><Text style={styles.title_txt1}>我想要做</Text></View>
                        <View style={[styles.title_wrap, { borderColor: '#fff', marginTop: 0, }]}><Text style={styles.title_txt2}>请选择所需要的项目</Text></View>
                        <View style={[styles.tag_type_wrap, styles.center]}>
                            {tags.map((item, i) => {
                                return <TouchableOpacity key={i} style={[styles.tag_wrap, styles.center, { borderColor: this.state.demand_type == item ? Variable.Default.themeColor : '#aaa' }]} onPress={() => { this._onChangeDemandType(item) }}>
                                    <Text style={{ color: this.state.demand_type == item ? Variable.Default.themeColor : '#888' }}>{item}</Text>
                                </TouchableOpacity>

                            })}
                        </View>
                    </View>) : <View></View>}

                    {this.state.isProduct ? this._renderItem('商品名称', '请输入商品名称', false) : this._renderItem('您的预算', '请选择您的预算（选填）', true)}
                    <View style={styles.line}></View>
                    {this.state.isProduct ? this._renderItem('商品单价', '请输入商品单价', true) : null}

                    <View style={[styles.content_box, styles.center]}>
                        <View style={styles.title_wrap}><Text style={styles.title_txt1}>{this.state.isProduct ? '商品介绍' : '需求详情'}</Text></View>
                        <View style={[styles.title_wrap, { borderColor: '#fff', marginTop: 0, }]}><Text style={styles.title_txt2}>{this.state.isProduct ? '商品简短的介绍' : '请填写详细需求，以便最合适的人才为您服务'}</Text></View>
                        <View style={styles.input_wrap}>
                            <TextInput
                                style={styles.txt_input}
                                multiline={true}
                                underlineColorAndroid="transparent"
                                placeholder={this.state.isProduct ? '商品简短的介绍' : '例如需要房屋精装修设计。'}
                                placeholderTextColor="#888"
                                onChangeText={(text) => this.setState({ pwd: parseInt(text) })} />
                        </View>
                    </View>
                    <View style={[styles.content_box, styles.center]}>
                        <View style={styles.title_wrap}><Text style={styles.title_txt1}>添加图片</Text></View>
                        <View style={[styles.title_wrap, { borderColor: '#fff', marginTop: 0, }]}><Text style={styles.title_txt2}>请添加参考图片（选填）</Text></View>
                        <ImgPic />
                    </View>
                    <View style={[styles.content_box, styles.center, { width: DevWH.sW, flexDirection: 'row', }]}>
                        <View style={[styles.title_wrap, { flex: .25, marginBottom: 10, }]}><Text style={styles.title_txt1}>联系电话</Text></View>
                        <View style={[styles.phone]}>
                            <TextInput
                                style={styles.txt_input1}
                                underlineColorAndroid="transparent"
                                maxLength={11}
                                placeholder={'请输入手机号码'}
                                placeholderTextColor="#aaa"
                                keyboardType={'phone-pad'}
                                onChangeText={(text) => this.setState({ phone: parseInt(text) })}
                            />
                        </View>
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

    _renderItem(title, pl_txt, tag) {
        return (
            <View style={[styles.content_box, styles.center, { width: DevWH.sW, flexDirection: 'row', marginTop: 0 }]}>
                <View style={[styles.title_wrap, { flex: .25, marginBottom: 10, }]}><Text style={styles.title_txt1}>{title}</Text></View>
                <View style={[styles.phone]}>
                    <TextInput
                        style={styles.txt_input1}
                        underlineColorAndroid="transparent"
                        maxLength={20}
                        placeholder={pl_txt}
                        placeholderTextColor="#aaa"
                        keyboardType={tag ? 'phone-pad' : 'default'}
                        onChangeText={(text) => this.setState({ phone: parseInt(text) })}
                    />
                </View>
                <Text style={{ flex: .1 }}>{tag ? '元' : ''}</Text>
            </View>
        )
    }
}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(EditingDemandScreen);

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
    hint_wrap: {
        width: DevWH.sW,
        backgroundColor: '#ffebeb',
        padding: 4,
        paddingLeft: 16,
    },
    hint_txt: {
        fontSize: 12 / Tools.Font(),
    },
    content_box: {
        backgroundColor: '#fff',
        marginTop: 6,
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
    phone: {
        flex: .75,
        borderColor: '#aaa',
        borderLeftWidth: 1,
        paddingLeft: 20,
    },
    txt_input1: {
        width: 180,
        height: 20,
        padding: 0,
    },
    line: {
        borderColor: '#eee',
        borderBottomWidth: 1,
    },
    pub_wrap: {
        flexDirection: 'row',
        width: DevWH.sW,
        height: 70,
    },
    pub: {
        flex: .66,
        height: 35,
        borderRadius: 2,
        backgroundColor: Variable.Default.themeColor,
    },
    tag_type_wrap: {
        // width:DevWH.sW,
        flexDirection: 'row',
    },
    tag_wrap: {
        flex: 1,
        borderColor: '#aaa',
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
    },
    img_content: {
        width: DevWH.sW - 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    img_wrap: {
        width: 80,
        height: 80,
        borderColor: '#aaa',
        borderWidth: 1,
        margin: 10,
        borderRadius: 4,
    },
    add_img_wrap: {
        width: 80,
        height: 80,
        margin: 10,
    },
    add_img: {
        width: 80,
        height: 80,
    },
})