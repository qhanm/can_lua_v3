import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import HeaderCustom from "../components/layout/HeaderCustom";
import ListClientComponent from "../components/client/ListClientComponent";
import {Header, Icon} from "react-native-elements";
import { Color } from "../utils/Constant";
import SheetsComponent from "../components/calculator/SheetsComponent";

class SheetScreen extends React.Component
{
    constructor(props) {
        super(props);

        let customer_id = this.props.route.params.customer_id;
        this.state = {
            customer_id: customer_id,
        }
    }
    __handleClickGoBackCustomer = () => {
        this.props.navigation.navigate('CustomerScreen');
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
                            onPress={() => this.__handleClickGoBackCustomer()}
                        />
                    }
                    centerComponent={
                        <Text style={{color: Color.White, fontSize: 20}}>NULL</Text>
                    }
                />
                <SheetsComponent
                    navigation={this.props.navigation}
                    customer_id={ this.state.customer_id }
                />
            </View>
        );
    }
}

export default SheetScreen;
