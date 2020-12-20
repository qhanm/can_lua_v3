import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Color, DefaultStyle, Font, PageConstant} from "../../utils/Constant";
import {Icon} from "react-native-elements";

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
    render() {

        const {navigation, customer} = this.props;

        return (
            <View style={styles.container}>
                <View style={[DefaultStyle.Card, {width: '95%'}]}>
                    <View
                        style={[styles.column, {borderBottomColor: Color.Red,borderBottomWidth: 1}]}
                    >
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('CalculatorScreen', {customer_id: customer.id}) }}>
                                <Text style={[styles.text, {fontSize: 18, color: Color.Navy}]}>{ customer.ten } - { customer.ten_giong }</Text>
                            </TouchableOpacity>
                            <Icon name='delete' color={Color.White} style={styles.iconDelete}/>
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
        )
    }
}
