import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';
import CircleScreen from '../pages/circle/circle'
import PublishScreen from '../pages/publish/publish';
import NearbyScreen from '../pages/nearby/nearby'
import MeScreen from '../pages/me/me';
import DetailsScreen from '../pages/circle/details';


const Tabs = TabNavigator({
    circle: { screen: CircleScreen },
    publish: { screen: PublishScreen },
    nearby: { screen: NearbyScreen },
    me: { screen: MeScreen }
}, {
        animationEnabled: false, // 切换页面时是否有动画效果
        lazyLoad: true,
        swipeEnabled: false, // 是否可以左右滑动切换tab
        backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
        tabBarOptions: {
            // activeTintColor: '#ff8500', // 文字和图片选中颜色
            inactiveTintColor: '#999', // 文字和图片未选中颜色
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            showLabel: true,
            style: {
                backgroundColor: '#fff', // TabBar 背景色
                borderTopColor: '#e0e0e0',
                borderTopWidth: 1
            },
            labelStyle: {
                fontSize: 14, // 文字大小
            },
            indicatorStyle: {
                height: 0
            }
        }
    })
export const AppNavigator = StackNavigator({
    Tab: { screen: Tabs },
    details: { screen: DetailsScreen },
}, {
        navigationOptions: { // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
            // 导航栏相关设置项
            headerBackTitle: null, // 左上角返回键文字
        },
        cardStack: {
            gesturesEnabled: true
        },
        mode: 'card', // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        headerMode: 'screen',
    }
);

