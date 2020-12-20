import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput} from "react-native";
import {Color, DefaultStyle} from "../../utils/Constant";
import {createSheet, getSettingByKey, getSheets, Setting_Quy_Cach_Ma_Can} from "../../databases/Setup";
import SheetItemComponent from "./SheetItemComponent";

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
    row: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    result: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.Yellow,
        paddingTop: 7,
        paddingBottom: 7,
    },
    rowItem: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: 55,
        textAlign: 'center',
        height: 35,
        fontSize: 18,
        backgroundColor: Color.Sliver3,
        color: Color.Black,
        fontWeight: 'bold',
    },
    textResult: {
        fontWeight: 'bold',
        fontSize: 18,
    }
})

export default class SheetsComponent extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            sheets: [],
            qcmc: '',
            isCreateNewSheet: false,
            countSheet: 0,
        }
    }

    componentDidMount() {
        this.loadSheet(this.props.customer_id);
        this.loadSetting(Setting_Quy_Cach_Ma_Can);
    }

    loadSheet = (customer_id) => {
        getSheets(customer_id).then((sheets) => {
            this.setState({ sheets, countSheet: sheets.length })
        }).catch((error) => {
            console.log(error);
        })
    }

    loadSetting = (key) => {
        getSettingByKey(key).then((setting) => {
            this.setState({ qcmc: setting.value });
        }).catch((error) => {
            console.log(error);
        })
    }

    __renderSheets = () => {
        const { sheets, qcmc, isCreateNewSheet } = this.state;

        return sheets.map((sheet, key) => {
            return (
                <SheetItemComponent
                    key={'sheet___' + key}
                    sheet_id={ sheet.id }
                    qcmc={ qcmc }
                    sheet_no={ sheet.sheet_no }
                    handleUpdateIsCreateNewSheet={ this.handleUpdateIsCreateNewSheet }
                />
            )
        })
    }

    __createNewSheetItem = () => {
        console.log(this.state.isCreateNewSheet);
    }

    handleUpdateIsCreateNewSheet = (isCreateNewSheet, sheetNo) => {
        if(isCreateNewSheet === true && sheetNo === this.state.countSheet){
            createSheet(this.state.countSheet + 1, this.props.customer_id).then((sheet) => {
                this.setState(event => ({
                    sheets: [...event.sheets, sheet]
                }));
            })
            console.log('You need create new sheet item');

        }
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView contentContainerStyle={{ paddingBottom: 200}}>
                    <View>
                        <View style={styles.container}>
                            {  this.__renderSheets() }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

        )
    }
}
