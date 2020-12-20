import React from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderCustom from "../components/layout/HeaderCustom";
import ListCustomer from "../components/customer/ListCustomer";

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

class CustomerScreen extends React.Component
{
    constructor(props) {
        super(props);
        let client_id = undefined;
        if(this.props.route.params !== undefined)
        {
            client_id = this.props.route.params.client_id;
        }


        this.state = {
            client_id: client_id,
        }
    }



    __handleClickBackToHome = () => {
        this.props.navigation.goBack();
    }

    __handleOnClickAddCustomer = () => {
        this.props.navigation.navigate('AddCustomerScreen', { client_id: this.state.client_id });
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
                        <Text style={{color: Color.White, fontSize: 20}}>Customer Screen</Text>
                    }

                    rightComponent={
                        <TouchableOpacity style={styles.textRight}>
                            <Icon
                                name='plus'
                                type='font-awesome'
                                color={Color.White}
                                size={28}
                                onPress={() => this.__handleOnClickAddCustomer() }
                            />
                        </TouchableOpacity>
                    }
                />
                <ListCustomer navigation={this.props.navigation} client_id={this.state.client_id}/>
            </View>
        )
    }
}

export default CustomerScreen;
