import React from 'react';
import {Text, View, StyleSheet, TextInput, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import {Color, Font, DefaultStyle} from "../../utils/Constant";
import Close from "../icons/Close";
import {Button} from "react-native-elements";
import SheetsComponent from "./SheetsComponent";
import {createSheet, getOneCustomer, getSheets, updateUnBlockCustomer} from "../../databases/Setup";
import Helpers from "../../utils/Helper";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    rowResult: {
        width: '95%',
        // marginTop: 20,
        // borderWidth: 1,
        // paddingTop: 5,
        // paddingBottom: 5,
        // borderColor: Color.Silver,

        backgroundColor:"white",
        marginTop: 20,
        borderRadius:5,
        padding:10,
        elevation:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    rowHeader: {
        alignItems: 'center',
        borderBottomColor: Color.Red,
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    subRow: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    rowItem: {
        width: '90%',
        marginTop: 10,

    },
    item: {
        flexDirection: 'row',
        borderColor: Color.Silver,
        borderWidth: 1,
        marginBottom: 10,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftRow: {
        width: '30%',
        backgroundColor: Color.Sliver2,
        fontSize: 17,
        borderRightWidth: 1,
        borderRightColor: Color.Silver,
    },
    rightRow: {
        width: '70%',
        backgroundColor: Color.Sliver2,
        borderRightColor: Color.Silver,
        borderRightWidth: 1,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        fontWeight: 'bold',

    },
    textInput: {
        borderRadius: 0,
        borderColor: 0,
        color: Color.Black,
        backgroundColor: Color.Sliver3,
        fontSize: 17,
        fontFamily: Font,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    leftItem: {
        borderRightWidth: 1,
        borderRightColor: Color.Silver,
        backgroundColor: Color.Sliver2,
    },
    centerItem: {
        fontWeight: 'bold',
    },
    rightItem: {
        backgroundColor: Color.Sliver2,
        borderRightColor: Color.Silver,
        borderRightWidth: 1,
    },
    general: {
        paddingBottom: 5,
        paddingTop: 5,
        fontSize: 17,
        fontFamily: Font,
        textAlign: 'center',
    }

});

export default class CalculatorComponent extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            customer: {},
            sheets: [],
            tongKhoiLuong: 0
        }
    }

    componentDidMount() {
        this.loadCustomer(this.props.customer);
        this.loadSheet(this.props.customer);
    }

    loadCustomer = (customer_id) => {
        getOneCustomer(customer_id).then((customer) => {
            this.setState({ customer });
        }).catch((error) => {
            console.log(error);
        })
    }

    loadSheet = (customer_id) => {
        getSheets(customer_id).then((sheets) => {
            let tongKhoiLuong = 0;

            sheets.map((sheet) => {
                tongKhoiLuong = tongKhoiLuong + Helpers.ConvertStringToInt(sheet.result);
            })
            this.setState({ sheets, tongKhoiLuong })
        }).catch((error) => { console.log(error) })
    }
    __handleOnClickButton = () => {
        const { customer } = this.state;
        if(customer.is_unblock === 0){
            updateUnBlockCustomer(customer.id, 1).then((result) => {

            }).catch((error) => {
                console.log(error)
            })

            createSheet(1, customer.id).then((result) => {
                this.props.navigation.navigate('SheetScreen', { customer_id: customer.id, is_calculate: customer.is_calculate });
            }).catch((error) => {
                console.log(error);
            })
        }else{
            this.props.navigation.navigate('SheetScreen', { customer_id: customer.id, is_calculate: customer.is_calculate });
        }

    }

    render() {
        const { customer, sheets, tongKhoiLuong } = this.state;
        console.log(customer)
        return (
            <SafeAreaView>
                <ScrollView contentContainerStyle={{ paddingBottom: 200}}>
                    <View>
                        {/*<SheetsComponent />*/}
                        <View style={styles.container}>
                            <View style={styles.rowResult}>
                                <View style={styles.rowHeader}>
                                    <Text style={{fontSize: 22, color: Color.Red, fontWeight: 'bold'}}>Kết Quả</Text>
                                </View>
                                <View style={styles.subRow}>
                                    <View style={styles.rowItem}>
                                        <View style={[styles.item]}>
                                            <Text style={[styles.leftRow, styles.general]}>Ngày cân</Text>
                                            <Text style={[styles.rightRow, styles.general]}>
                                                { customer.ngay_can }
                                            </Text>
                                        </View>
                                        <View style={[styles.item]}>
                                            <Text style={[styles.leftRow, styles.general]}>Họ và tên</Text>
                                            <Text style={[styles.rightRow, styles.general]}>
                                                { customer.ten }
                                            </Text>
                                        </View>
                                        <View style={[styles.item]}>
                                            <Text style={[styles.leftRow, styles.general]}>Tên giống</Text>
                                            <Text style={[styles.rightRow, styles.general]}>
                                                { customer.ten_giong }
                                            </Text>
                                        </View>

                                        <View>
                                            <Text>{"\n"}</Text>
                                        </View>

                                        {/*Tong KL*/}
                                        <View style={[styles.item]}>
                                            <View style={{width: '30%'}}>
                                                <Text style={[styles.general, styles.leftItem, {color: Color.Red}]}>Tổng KL</Text>
                                            </View>
                                            <View style={{width: '50%'}}>
                                                <TextInput
                                                    style={[DefaultStyle.InputNumber, styles.textInput]}
                                                    //placeholder='0'
                                                    keyboardType='numeric'
                                                    value={ this.state.tongKhoiLuong.toString() }
                                                />
                                            </View>
                                            <View style={{width: '20%'}}>
                                                <Text style={[styles.general, styles.rightItem]}>
                                                    Kg
                                                </Text>
                                            </View>
                                        </View>

                                        {/*SL Bao*/}
                                        <View style={[styles.item]}>
                                            <View style={{width: '30%'}}>
                                                <Text style={[styles.general, styles.leftItem, {}]}>SL Bao</Text>
                                            </View>
                                            <View style={{width: '50%'}}>
                                                <TextInput
                                                    style={[DefaultStyle.InputNumber, styles.textInput, {color: Color.Red}]}
                                                    placeholder='0'
                                                    keyboardType='numeric'
                                                    placeholderTextColor={Color.Red}
                                                />
                                            </View>
                                            <View style={{width: '20%'}}>
                                                <Text style={[styles.general, styles.rightItem]}>
                                                    Cái
                                                </Text>
                                            </View>
                                        </View>

                                        {/*KL Bao Bi*/}
                                        <View style={[styles.item]}>
                                            <View style={{width: '30%'}}>
                                                <Text style={[styles.general, styles.leftItem, {}]}>KL Bao Bì</Text>
                                            </View>
                                            <View style={{width: '50%'}}>
                                                <TextInput
                                                    style={[DefaultStyle.InputNumber, styles.textInput, {color: Color.Red}]}
                                                    placeholder='0'
                                                    keyboardType='numeric'
                                                />
                                            </View>
                                            <View style={{width: '20%'}}>
                                                <Text style={[styles.general, styles.rightItem]}>
                                                    Kg
                                                </Text>
                                            </View>
                                        </View>

                                        {/*KL Con Lai*/}
                                        <View style={[styles.item]}>
                                            <View style={{width: '30%'}}>
                                                <Text style={[styles.general, styles.leftItem, {}]}>KL Còn Lại</Text>
                                            </View>
                                            <View style={{width: '50%'}}>
                                                <TextInput
                                                    style={[DefaultStyle.InputNumber, styles.textInput, {backgroundColor: Color.Yellow}]}
                                                    placeholder='0'
                                                    keyboardType='numeric'
                                                    editable={false}
                                                />
                                            </View>
                                            <View style={{width: '20%'}}>
                                                <Text style={[styles.general, styles.rightItem]}>
                                                    Kg
                                                </Text>
                                            </View>
                                        </View>

                                        {/*Gia Mua*/}
                                        <View style={[styles.item]}>
                                            <View style={{width: '30%'}}>
                                                <Text style={[styles.general, styles.leftItem, {color: Color.Blue}]}>Giá Mua</Text>
                                            </View>
                                            <View style={{width: '50%'}}>
                                                <TextInput
                                                    style={[DefaultStyle.InputNumber, styles.textInput, {}]}
                                                    value={ Helpers.ConvertStringToInt(customer.gia_mua).toString() }
                                                    keyboardType='numeric'
                                                    placeholderTextColor={Color.Blue}
                                                />
                                            </View>
                                            <View style={{width: '20%'}}>
                                                <Text style={[styles.general, styles.rightItem]}>
                                                    vnđ
                                                </Text>
                                            </View>
                                        </View>

                                        {/*Thanh Tien*/}
                                        <View style={[styles.item]}>
                                            <View style={{width: '30%'}}>
                                                <Text style={[styles.general, styles.leftItem, {color: Color.Red}]}>Thành Tiền</Text>
                                            </View>
                                            <View style={{width: '50%'}}>
                                                <TextInput
                                                    style={[DefaultStyle.InputNumber, styles.textInput, {backgroundColor: Color.Yellow}]}
                                                    placeholder='0'
                                                    keyboardType='numeric'
                                                    placeholderTextColor={Color.Red}
                                                    editable={false}
                                                />
                                            </View>
                                            <View style={{width: '20%'}}>
                                                <Text style={[styles.general, styles.rightItem]}>
                                                    vnđ
                                                </Text>
                                            </View>
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor: 'red',
                                                }}
                                                onPress={ this.__handleOnClickButton }
                                            >
                                                <Text style={{
                                                    textAlign: 'center',
                                                    paddingTop: 8,
                                                    paddingBottom: 8,
                                                    color: Color.White,
                                                    fontWeight: 'bold',
                                                    fontSize: 17
                                                }}>{ customer.is_unblock === 0 ? 'Mở Khóa' : 'Tiếp tục cân' }</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>


        )
    }
}
