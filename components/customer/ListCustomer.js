import React from 'react';
import {ScrollView, View, SafeAreaView, TouchableOpacity, Text, Alert, StyleSheet} from "react-native";
import CustomerComponent from "./CustomerComponent";
import {deleteCustomer, getCustomerByClient, getSheets} from "../../databases/Setup";
import {SessionContext} from "../../context/SessionProvider";
import Helpers from "../../utils/Helper";
import {Color, DefaultStyle, Font} from "../../utils/Constant";
import {Icon} from "react-native-elements";
import {ToastContext} from "react-native-styled-toast";

class ListCustomer extends React.Component
{
    isSetState = false;

    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
        //console.log(this.props.client_id);
    }

    componentDidMount() : void {
        this.isSetState = true;
        this.loadCustomer(this.props.client_id);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    }

    componentWillUnmount() {
        this.isSetState = false;
    }

    loadCustomer = (client_id) => {
        getCustomerByClient(client_id).then((customers) => {
            if(this.isSetState){
                this.setState({ customers });
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    __renderCustomer = () => {
        let { customers } = this.state;
        let arrCustomer = [];
        customers.map((customer, key) => {
            arrCustomer.push(
                <CustomerComponent
                    navigation={this.props.navigation}
                    customer={customer} key={key}
                    clientId={this.props.client_id}
                    handleDeleteCustomer={ this.__handleDeleteCustomer }
                />
            )
        })

        return arrCustomer;
    }

    __handleDeleteCustomer = (toast, customer_id) => {
        deleteCustomer(customer_id).then((result) => {
            return toast(Helpers.ToastSuccess('Xóa nông dân thành công'));
        }).catch((error) => {
            return toast(Helpers.ToastError(error.toString()));
        })
    }

    render() {

        const { navigation } = this.props;
       console.log(this.state.customers);

        return (
            <SessionContext.Consumer>
                {
                    sessionContext => (
                        <SafeAreaView>
                            <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
                                <ToastContext.Consumer>
                                    {({ toast }) => {
                                        return (
                                            this.state.customers.map((customer, index) => {
                                                return (
                                                    <View style={styles.container} key={index}>
                                                        <View style={[DefaultStyle.Card, {width: '95%'}]}>
                                                            <View
                                                                style={[styles.column, {borderBottomColor: Color.Red,borderBottomWidth: 1}]}
                                                            >
                                                                <View style={styles.row}>
                                                                    <TouchableOpacity onPress={() => { navigation.navigate('CalculatorScreen', {customer_id: customer.id}) }}>
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
                                                                        KL: { customer.klcl } Kg x { customer.gia_mua } VND
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
                                                                        TT: { Helpers.formatCurrency(customer.tt, '') } VND
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        )
                                    }}

                                </ToastContext.Consumer>
                            </ScrollView>
                        </SafeAreaView>
                    )
                }
            </SessionContext.Consumer>
        )
    }
}

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

export default ListCustomer;
