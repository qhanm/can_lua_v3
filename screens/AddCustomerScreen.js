import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import HeaderCustom from "../components/layout/HeaderCustom";
import AddCustomerComponent from "../components/customer/AddCustomerComponent";
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
export default class AddCustomerScreen extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            client_id: this.props.route.params.client_id,
        }

    }

    __handleClickBackToCustomer = () => {
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
                            onPress={() => this.__handleClickBackToCustomer()}
                        />
                    }
                    centerComponent={
                        <Text style={{color: Color.White, fontSize: 20}}>Thêm Nông Dân</Text>
                    }
                />
                <AddCustomerComponent
                    client_id={ this.state.client_id }
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
}
