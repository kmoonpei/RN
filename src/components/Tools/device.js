import React, { Component } from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
  AsyncStorage,
} from 'react-native';
class DeviceRn {
  //获取屏幕的尺寸
  getWidHig() {
    let sW = Dimensions.get('window').width;
    let sH = Dimensions.get('window').height;
    return { sW, sH };
  }
  //时间格式化
  timeFormat(intDiff) {
    var day = 0, hour = 0, minute = 0, second = 0;//时间默认值
    day = Math.floor(intDiff / (60 * 60 * 24));
    hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
    minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
    second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    second <= 9 ? second = '0' + second : '';
    if (hour <= 9) hour = '0' + hour;
    if (minute <= 9) minute = '0' + minute;
    return hour + ':' + minute + ':' + second;
  }
  //数据存储
  storageSave(key, data) {
    return AsyncStorage.setItem(key, data);
  }
  //数据获取
   storageGet(key) {
    //let value = await AsyncStorage.getItem(key);
    //console.log(value)
    return AsyncStorage.getItem(key);
  }
  //清除数据
  storageClear() {
    return AsyncStorage.clear();
  }
  storageRemove(key) {
    return AsyncStorage.removeItem(key);
  }
  storageGetM(key) {
    return AsyncStorage.multiGet(key)
  }
}
let Device = new DeviceRn();
function DeviceXn() {
  return Device;
}
export default DeviceXn;