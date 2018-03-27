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
let dataToPost = [];
const options = ['取消', '拍照', '从相册选取'];
const CANCEL_INDEX = 0;
export default class ImgPic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
        };
    }

    //从相机获取图片
    pickSingleWithCamera() {
        ImagePicker.openCamera({
            cropping: true,
            // width: Math.round((Dimensions.get('window').width - 20)),
            width:300,
            height: 300,
        }).then(image => {
            dataToPost.push({
                uri: image.path,
                width: image.width,
                height: image.height,
            });
            this.setState({ images: dataToPost });
        }).catch(e => alert(e));
    }

    //从图库或者相机进行获取,因为安卓平台不能进行多图选择，所以，需要区分不同平台
    openPicLib() {
        if (Platform.OS === 'ios') {
            ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
            }).then(images => {
                for (var i = 0; i < images.length; i++) {
                    dataToPost.push({
                        uri: images[i].path,
                        width: images[i].width,
                        height: images[i].height,
                        mime: images[i].mime,
                    });
                }
                this.setState({ images: dataToPost });
            }).catch(e => alert(e));

        } else {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: false,
                cropperCircleOverlay: false,
                compressImageMaxWidth: 480,
                compressImageMaxHeight: 640,
                compressImageQuality: 0.5,
                mediaType: 'photo',
                compressVideoPreset: 'MediumQuality'
            }).then(image => {
                dataToPost.push({
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime
                });
                this.setState({ images: dataToPost });
            }).catch(e => {
                alert(e.message ? e.message : e);
            });
        }
    }


    _handlePress(item) {
        switch (item) {
            case 1: this.pickSingleWithCamera.bind(this); break;
            case 2: this.openPicLib.bind(this); break;
        }
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
                    return <TouchableOpacity key={i} style={styles.img_wrap} onPress={() => { }}>
                        <Image style={styles.add_img} source={item.uri} />
                    </TouchableOpacity>
                })}
                <TouchableOpacity style={styles.add_img_wrap} onPress={() => { this.ActionSheet.show() }}>
                    <Image style={styles.add_img} source={require('../../assets/publish/add_new.png')} />
                </TouchableOpacity>
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