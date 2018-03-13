import React, { Component } from 'react';
import {
    Platform,
    Text, Image,
} from 'react-native';
import { Variable } from '../variables';
let theme = Variable.Default;
export default function HeaderBar(screenProps = {}, params = {}, navigation = {}, ) {
    return ({
        title: params.title,
        header: params.header,
        headerRight: params.header_right,
        headerLeft: params.header_left,
        headerTitleStyle: {
            color: theme.hdtxt,
        },
        headerStyle: {
            backgroundColor: theme.themeColor,
        },
        headerTintColor: theme.hdtxt,
        tabBarLabel: ({ focused, tintColor }) => (
            <Text style={[Variable.df, focused ? { color: theme.themeColor } : { color: tintColor }, Platform.OS === 'ios' ? { marginTop: 15 } : null]}>{params.msg}</Text>
        ),
        tabBarIcon: ({ focused, tintColor }) => (
            <Image source={params.Image}
                style={[focused ? { tintColor: theme.themeColor } : { tintColor: tintColor }, Variable.icon]}
            />
        ),
    })
}
