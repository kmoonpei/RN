import React, {
    Component
} from 'react'
import {
    View, Image, TouchableHighlight,
    Text, TouchableOpacity, Platform,
    StyleSheet, ScrollView, TextInput
} from 'react-native'
import ActionSheet from 'react-native-actionsheet';
import { connect } from 'react-redux'
import HeadrBar from '../../common/headerBar'
import { Variable } from '../../variables';
import DeviceRn from '../../components/Tools/device'
import Tools from '../../components/Tools/tools'
import ImagePicker from 'react-native-image-crop-picker';

let DevWH = DeviceRn().getWidHig();
const options = ['取消', '拍照', '从相册选取'];
const CANCEL_INDEX = 0;
export default class ImgPic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
        };
        this.dataToPost = [];

    }
    componentWillMount() {
        this.dataToPost = [];
    }
    //从相机获取图片
    pickSingleWithCamera() {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            includeBase64: true,
        }).then(image => {
            this.dataToPost.push({
                uri: image.path,
                width: image.width,
                height: image.height,
            });
            this.setState({ images: this.dataToPost });
        }).catch(e => alert(e));
    }

    //从图库或者相机进行获取,因为安卓平台不能进行多图选择，所以，需要区分不同平台
    openPicLib(num) {
        if (Platform.OS === 'ios') {
            ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
                includeBase64: true,
                maxFiles: num,
            }).then(images => {
                for (var i = 0; i < images.length; i++) {
                    this.dataToPost.push({
                        uri: images[i].path,
                        width: images[i].width,
                        height: images[i].height,
                        mime: images[i].mime,
                    });
                }
                this.setState({ images: this.dataToPost });
            }).catch(e => alert(e));
        } else {
            ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
                includeBase64: true,
                maxFiles: num,
            }).then(images => {
                for (var i = 0; i < images.length && (this.dataToPost.length + 1) <=9; i++) {
                    this.dataToPost.push({
                        uri: images[i].path,
                        width: images[i].width,
                        height: images[i].height,
                        mime: images[i].mime,
                    });
                }
                this.setState({ images: this.dataToPost });
            }).catch(e => {
                alert(e.message ? e.message : e);
            });
        }
    }


    _handlePress(item) {
        switch (item) {
            case 1: this.pickSingleWithCamera(); break;
            case 2: this.openPicLib((9 - this.state.images.length)); break;
        }
    }

    _onDeleteImg(i) {
        this.dataToPost.splice(i, 1);
        this.setState({ images: this.dataToPost });
    }

    _actionSheet() {
        return (
            <View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={this._handlePress.bind(this)}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.img_content}>
                {this.state.images.map((item, i) => {
                    return <View key={i} style={styles.img_wrap}>
                        <Image style={styles.add_img} source={item} />
                        {this.props.isEditingImg ? <TouchableOpacity style={[styles.add_img, styles.close_wrap]} onPress={() => { this._onDeleteImg(i) }}>
                            <Image style={styles.delete_img} source={require('../../assets/login/close.png')} />
                        </TouchableOpacity> : null}
                    </View>
                })}
                {this.state.images.length < 9 ? <TouchableOpacity style={styles.add_img_wrap} onPress={() => { this.ActionSheet.show() }}>
                    <Image style={styles.add_img} source={require('../../assets/publish/add_new.png')} />
                </TouchableOpacity> : null}
                {this._actionSheet()}
            </View>
        )
    }
}
// mapStoreState = (store) => ({

// });
// export default connect(mapStoreState)(ImgPic);

const styles = StyleSheet.create({
    img_content: {
        width: DevWH.sW - 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    img_wrap: {
        width: 80,
        height: 80,
        margin: 10,
    },
    add_img_wrap: {
        width: 80,
        height: 80,
        margin: 10,
    },
    add_img: {
        width: 80,
        height: 80,
        borderRadius: 4,
    },
    delete_img: {
        width: 24,
        height: 24,
    },
    close_wrap: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
})