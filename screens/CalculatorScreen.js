import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import HeaderCustom from "../components/layout/HeaderCustom";
import CalculatorComponent from "../components/calculator/CalculatorComponent";
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

export default class CalculatorScreen extends React.Component
{
    constructor(props) {
        super(props);
        const customer = this.props.route.params.customer_id;
        this.state = {
            customer: customer,
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
                        <Text style={{color: Color.White, fontSize: 20}}>Result</Text>
                    }
                />
                <CalculatorComponent
                    customer={this.state.customer}
                    navigation={ this.props.navigation }
                />
            </View>
        )
    }
}
