import React from 'react';
import {View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import HeaderCustom from "../components/layout/HeaderCustom";
import ListClientComponent from "../components/client/ListClientComponent";
import {Header, Icon} from "react-native-elements";
import { Color } from "../utils/Constant";

const styles = StyleSheet.create({
    textRight: {
        borderRadius: 21,
        padding: 6,
        paddingLeft: 9,
        paddingRight: 9,
        backgroundColor: Color.Red,
    }
});

class HomeScreen extends React.Component
{
    constructor(props) {
        super(props);
    }


    __handleOnClickAddClient = () => {
        this.props.navigation.navigate('AddClientScreen');
    }

    render() {
        return (
            <View>
                <Header
                    leftComponent={
                        <Icon
                            name='bars'
                            type='font-awesome'
                            color={Color.White}
                            size={28}
                            onPress={() => this.props.navigation.openDrawer()}
                        />
                    }
                    centerComponent={
                        <Text style={{color: Color.White, fontSize: 20}}>NULL</Text>
                    }
                    rightComponent={
                        <TouchableOpacity style={styles.textRight}>
                            <Icon
                                name='plus'
                                type='font-awesome'
                                color={Color.White}
                                size={28}
                                onPress={() => this.__handleOnClickAddClient() }
                            />
                        </TouchableOpacity>
                    }
                />
                <ListClientComponent navigation={this.props.navigation}/>
            </View>
        )
    }
}

export default HomeScreen;
