import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {Color, DefaultStyle, Font, PageConstant} from "../../utils/Constant";
import {Icon} from "react-native-elements";
import {deleteCustomer} from "../../databases/Setup";
import Helpers from "../../utils/Helper";
import {ToastContext} from "react-native-styled-toast";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        padding: 6,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {

    },
    text: {
        fontWeight: 'bold',
        fontFamily: Font,
    },
    iconDelete: {
        backgroundColor: Color.Red,
        textAlign: 'left',
        padding: 3,
    },
    borderRow: {
        borderBottomColor: Color.Silver,
        borderBottomWidth: 1
    }
});

export default class CustomerComponent extends Component
{
    constructor(props) {
        super(props);
    }

    __handleDeleteCustomer = (toast, customer_id) => {
        this.props.handleDeleteCustomer(toast, customer_id);
    }

    render() {

        const {navigation, customer} = this.props;

        return (
            <ToastContext.Consumer>
                {({ toast }) => {
                    return <View style={styles.container}>
                        <View style={[DefaultStyle.Card, {width: '95%'}]}>
                            <View
                                style={[styles.column, {borderBottomColor: Color.Red,borderBottomWidth: 1}]}
                            >
                                <View style={styles.row}>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('CalculatorScreen', {customer_id: customer.id}) }}>
                                        <Text style={[styles.text, {fontSize: 18, color: Color.Navy}]}>{ customer.ten } - { customer.ten_giong }</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Alert.alert(
                                                "Thông báo",
                                                `Bạn có chắc muốn xóa nông dân "${ customer.ten }" ?`,
                                                [
                                                    {
                                                        text: "Hủy",
                                                        onPress: () => console.log("Cancel Pressed"),
                                                        style: "cancel"
                                                    },
                                                    { text: "Xóa", onPress: () => { this.__handleDeleteCustomer(toast, customer.id) } }
                                                ],
                                                { cancelable: false }
                                            );
                                        }}
                                    >
                                        <Icon name='delete' color={Color.White} style={styles.iconDelete}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.column, styles.borderRow]}>
                                <View style={[styles.row, {justifyContent: 'flex-start', alignItems: 'center'}]}>
                                    <Icon name='today' color={Color.Silver}/>
                                    <Text style={[styles.text ,{marginLeft: 10, fontSize: 15}]}>{ customer.ngay_can }</Text>
                                </View>
                            </View>
                            <View style={[styles.column, styles.borderRow]}>
                                <View style={[styles.row, {justifyContent: 'flex-start', alignItems: 'center'}]}>
                                    <Icon name='calculator'
                                          type='font-awesome'
                                          color={Color.Blue}
                                    />
                                    <Text style={[styles.text, {marginLeft: 10, fontSize: 15}]}>
                                        KL: { customer.tong_kl } Kg x { customer.gia_mua } VND
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.column, styles.borderRow]}>
                                <View style={[styles.row, {justifyContent: 'flex-start', alignItems: 'center'}]}>
                                    <Icon
                                        name='money'
                                        type='font-awesome'
                                        color={Color.Red}
                                    />
                                    <Text style={[styles.text, {marginLeft: 10, fontSize: 15}]}>
                                        TT: { customer.tt } VND
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                }}
            </ToastContext.Consumer>
        )
    }
}
