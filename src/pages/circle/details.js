import React, { Component } from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../common/headerBar'

class DetailsScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const params = navigation.state.params || {};
        return HeaderBar(screenProps, {
            title: '详情',
            header_right: (<Button onPress={params.increaseCount} title='+1' color='#f00' />)
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            count: 3,
        }

    }

    componentWillMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }

    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 });
    }
    render() {
        return (
            <View style={styles.bg}>
                <Text>count：{this.state.count}</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title='返回' />
            </View>
        )
    }
}

mapStoreState = (store) => ({

});
export default connect(mapStoreState)(DetailsScreen);

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#36ad87',
        alignItems: 'center',
        justifyContent: 'center'
    }
})