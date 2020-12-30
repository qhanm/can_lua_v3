import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import AddClientComponent from "../components/client/AddClientComponent";
import {Header, Icon} from "react-native-elements";
import {Color} from "../utils/Constant";

const styles = StyleSheet.create({
    textRight: {
        borderRadius: 21,
        padding: 6,
        paddingLeft: 9,
        paddingRight: 9,
        backgroundColor: Color.Red,
    }
});

export default class AddClientScreen extends Component
{
    constructor(props) {
        super(props);
    }

    __handleClickBackToHome = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View>
                <Header
                    leftComponent={
                        <Icon
                            name='chevron-left'
                            type='font-awesome'
                            color={Color.White}
                            size={28}
                            onPress={() => this.__handleClickBackToHome()}
                        />
                    }
                    centerComponent={
                        <Text style={{color: Color.White, fontSize: 20}}>Thêm Bảng Tính</Text>
                    }
                />
                <AddClientComponent navigation={ this.props.navigation }/>
            </View>
        )
    }
}
