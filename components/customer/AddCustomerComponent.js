import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from "react-native";
import {Color, DefaultStyle} from "../../utils/Constant";
import { Button } from 'react-native-elements';
import {IconCustom} from "../layout/IconCustom";
import {
    getAllSettings,
    getSettingByKey,
    insertCustomer,
    Setting_Quy_Cach_Ma_Can,
    Setting_Tru_Bi_Bao
} from "../../databases/Setup";
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

export default class AddCustomerComponent extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ten_giong: '',
            gia_mua: 0,
            errName: false,
            errTenGiong: false,
            tbb: 0,
            qcmc: 0,
        }
    }

    componentDidMount() {
        this.loadSetting();
    }

    loadSetting  = () => {
        getAllSettings().then((settings) => {
            let { qcmc, tbb } = this.state;
            settings.map((setting) => {
                if(setting.key === Setting_Quy_Cach_Ma_Can){
                    qcmc = parseInt(setting.value);
                }

                if(setting.key === Setting_Tru_Bi_Bao){
                    tbb = parseInt(setting.value);
                }
            })

            this.setState({
                qcmc, tbb
            })
        })
    }
    __handleOnSave = () => {

        const { name, ten_giong, gia_mua, tbb, qcmc } = this.state;

        let { errName, errTenGiong } = this.state;

        if(name.length === 0){
            errName = true;
        }

        if( ten_giong.length === 0 ){
            errTenGiong = true;
        }

        if(errTenGiong === true ||  errName === true){
            this.setState({errName, errTenGiong});
            return false;
        }

        let customer = {
            id: Helpers.Guid1('customer'),
            client_id: this.props.client_id,
            ten: name,
            ten_giong: ten_giong,
            gia_mua: parseFloat(gia_mua),
            ngay_can: Helpers.GetFullDateCurrent(),
            tbb: tbb,
            qcmc: qcmc,
            //tong_kl: 0,
            //slb: 0,
            //klbb: 0,
            //klcl: 0,
            //tt: 0,
            is_unblock: 0,
            //is_calculate: 0,
        }

        insertCustomer(customer).then((customer) => {
            this.props.navigation.navigate('CustomerScreen', { client_id: this.props.client_id });
        }).catch((error) => {
            console.log(error);
        })
        //console.log(this.props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[DefaultStyle.Card, {width: '95%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.left]}>
                            <Text style={{color: Color.White, textAlign: 'center'}}>Nông dân</Text>
                        </View>
                        <View style={styles.right}>
                            <TextInput
                                style={[DefaultStyle.InputNumber, styles.input]}
                                onChangeText={(event) => {
                                    if(event.length > 0){
                                        this.setState({name: event, errName: false});
                                    }else{
                                        this.setState({name: event, errName: true});
                                    }
                                }}
                            />
                        </View>
                    </View>
                    {
                        this.state.errName ? (
                            <View style={[styles.row, { marginTop: 5 }]}>
                                <View style={[styles.left, { backgroundColor: 'fff' }]}>
                                </View>
                                <View style={styles.right}>
                                    <Text style={{ color: Color.Red }}>Tên nông dân không được bỏ trống</Text>
                                </View>
                            </View>
                        ) : null
                    }

                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{color: Color.White, textAlign: 'center'}}>Tên giống</Text>
                        </View>
                        <View style={styles.right}>
                            <TextInput
                                style={[DefaultStyle.InputNumber, styles.input]}
                                onChangeText={(event) => {
                                    if(event.length > 0){
                                        this.setState({ten_giong: event, errTenGiong: false})
                                    }else{
                                        this.setState({ten_giong: event, errTenGiong: true})
                                    }
                                }}
                            />
                        </View>
                    </View>
                    {
                        this.state.errTenGiong ? (
                            <View style={[styles.row, { marginTop: 5 }]}>
                                <View style={[styles.left, { backgroundColor: 'fff' }]}>
                                </View>
                                <View style={styles.right}>
                                    <Text style={{ color: Color.Red }}>Tên giống không được bỏ trống</Text>
                                </View>
                            </View>
                        ) : null
                    }
                    <View style={styles.row}>
                        <View style={[styles.left, {backgroundColor: Color.Silver}] }>
                            <Text style={{color: Color.White, textAlign: 'center'}}>Giá mua</Text>
                        </View>
                        <View style={styles.right}>
                            <TextInput
                                style={[DefaultStyle.InputNumber, styles.input]}
                                keyboardType = 'numeric'
                                onChangeText={(event) => this.setState({gia_mua: event})}
                            />
                        </View>
                    </View>
                    <View style={[styles.row, {width: '100%', justifyContent: 'center'}]}>
                        <Button
                            icon={ IconCustom.Save }
                            title="Lưu"
                            onPress={ () => { this.__handleOnSave() } }
                            buttonStyle={{paddingLeft: 50, paddingRight: 50}}
                        />
                    </View>

                </View>
            </View>
        )
    }
}
