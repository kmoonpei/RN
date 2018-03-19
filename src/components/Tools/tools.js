import React, { Component } from 'react';
import {
  PixelRatio,
  AsyncStorage,
} from 'react-native';
export default class Tools {
  //获取字体比值大小
  static Font() {
    let PF = PixelRatio.getFontScale();
    let PG = PixelRatio.get();
    //  console.log(PixelRatio.get(),PixelRatio.getFontScale());
    return PF
  }

  //格式化日期
  static Format(time = '') {
    let date, M, D, h, m, str;
    date = new Date(time * 1000);
    M = date.getMonth() + 1;
    D = date.getDay();
    h = date.getHours();
    m = date.getMinutes();
    str = `${M}-${D} ${h}:${m}`;
    return str;
  }

    //数据存储
    static storageSave(key,data) {
      return AsyncStorage.setItem(key, data);
    }
    //数据获取
    static storageGet(key) {
        return AsyncStorage.getItem(key);
    }
    //清除数据
    static storageClear(){
      return AsyncStorage.clear();
    }
    static storageRemove(key){
      return AsyncStorage.removeItem(key);
    }
    static storageGetM(key){
      return AsyncStorage.multiGet(key)
    }
}