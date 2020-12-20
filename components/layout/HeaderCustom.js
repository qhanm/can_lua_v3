import React, {useContext} from 'react';
import {Header, Icon} from "react-native-elements";
import {Color, PageConstant} from "../../utils/Constant";
import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {SessionContext} from "../../context/SessionProvider";

const styles = StyleSheet.create({
    textRight: {
        borderRadius: 21,
        padding: 6,
        paddingLeft: 9,
        paddingRight: 9,
        backgroundColor: Color.Red,
    }
});

class HeaderCustom extends React.Component
{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { index, routes } = this.props.navigation.dangerouslyGetState();
        console.log(routes[index].name);
    }

    __renderLeftMenu = (sessionContext) => {
        if(sessionContext.screenName === PageConstant.ClientScreen)
        {
            return (
                <Icon
                    name='bars'
                    type='font-awesome'
                    color={Color.White}
                    size={28}
                    onPress={() => this.props.navigation.openDrawer()}
                    />
            )
        }else {
            return (
                <Icon
                    name='chevron-left'
                    type='font-awesome'
                    color={Color.White}
                    size={28}
                    onPress={() => this.__goBack(sessionContext)} />
            )
        }
    }

    __add = (sessionContext) => {
        const { index, routes } = this.props.navigation.dangerouslyGetState();
        if(routes[index].name === PageConstant.ClientScreen){
            this.props.navigation.navigate(PageConstant.AddClientScreen);
            sessionContext.setScreenName(PageConstant.AddClientScreen);
            return true;
        }

        if(routes[index].name === PageConstant.CustomerScreen){
            this.props.navigation.navigate(PageConstant.AddCustomerScreen);
            sessionContext.setScreenName(PageConstant.AddCustomerScreen);
            return true;
        }
    }

    __goBack = (sessionContext) => {
        const { index, routes } = this.props.navigation.dangerouslyGetState();
        if(routes[index].name === PageConstant.CustomerScreen){
            sessionContext.setScreenName(PageConstant.ClientScreen);
        }

        if(routes[index].name === PageConstant.AddClientScreen){
            sessionContext.setScreenName(PageConstant.ClientScreen);
        }

        this.props.navigation.goBack()
    }

    render() {
        return (
            <SessionContext.Consumer>
                {
                    sessionContext =>
                        <Header
                            leftComponent={
                                this.__renderLeftMenu(sessionContext)
                            }
                            centerComponent={
                                <Text style={{color: Color.White, fontSize: 20}}>{sessionContext.textHeader}</Text>
                            }
                            rightComponent={
                                <TouchableOpacity style={styles.textRight}>
                                    <Icon
                                        name='plus'
                                        type='font-awesome'
                                        color={Color.White}
                                        size={28}
                                        onPress={() => this.__add(sessionContext)} />
                                </TouchableOpacity>
                            }
                        />
                }
            </SessionContext.Consumer>
        )
    }
}

export default HeaderCustom;
