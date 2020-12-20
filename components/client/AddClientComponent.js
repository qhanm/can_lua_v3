import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from "react-native";
import {Color, DefaultStyle} from "../../utils/Constant";
import { Button } from 'react-native-elements';
import {IconCustom} from "../layout/IconCustom";
import { insertClient } from "../../databases/Setup";
import { SessionContext }  from '../../context/SessionProvider';
import Helpers from "../../utils/Helper";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
    },
    left: {
        width: '30%',
        backgroundColor: Color.Red,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8,
        color: Color.White,
    },
    right: {
      width: '70%'
    },
    input: {
        width: '100%',
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        color: Color.Black,
        fontWeight: 'bold'
    }
})

export default class AddClientComponent extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            isError: false
        }
    }

    __handleOnClickSave = (e, sessionContext) => {
        if(this.state.name.length === 0){
            this.setState({
                isError: true,
            });

            return false;
        }

        let {name} = this.state;

        insertClient(name.trim()).then((result) => {
            sessionContext.setIsLoadingClient(true);
            sessionContext.setClientGroupCurrent(Helpers.GetDateCurrent());
            this.props.navigation.goBack();
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <SessionContext.Consumer>
                {
                    sessionContext => (
                        <View style={styles.container}>
                            <View style={[DefaultStyle.Card, {width: '95%'}]}>
                                <View style={styles.row}>
                                    <View style={styles.left}>
                                        <Text style={{color: Color.White, textAlign: 'center'}}>Tên nhóm</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <TextInput
                                            style={[DefaultStyle.InputNumber, styles.input]}
                                            onChangeText={(event) => { this.setState({name: event}) }}
                                        />
                                    </View>
                                </View>
                                {
                                    this.state.isError ? (
                                        <View style={[styles.row, { marginTop: 3 }]}>
                                            <View style={[styles.left, {backgroundColor: 'fff'}]}>
                                            </View>
                                            <View style={styles.right}>
                                                <Text style={{ color: Color.Red }}>Tên nhóm không được để trống</Text>
                                            </View>
                                        </View>
                                    ) : null
                                }
                                <View style={[styles.row, {width: '100%', justifyContent: 'center'}]}>
                                    <Button
                                        icon={ IconCustom.Save }
                                        title="Lưu"
                                        buttonStyle={{paddingLeft: 50, paddingRight: 50}}
                                        onPress={(e) => this.__handleOnClickSave(e, sessionContext)}
                                    />
                                </View>

                            </View>
                        </View>
                    )
                }
            </SessionContext.Consumer>
        )
    }
}
