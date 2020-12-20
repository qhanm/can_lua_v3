import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {Color, DefaultStyle} from "../../utils/Constant";
import {getSheetItems, updateSheetItem} from "../../databases/Setup";
import Helpers from "../../utils/Helper";

export default class SheetItemComponent extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            sheetItems: [],
            tempSheetItems: [],
            sheetItemFocus: [],
            rowResult: [],
            totalResult: 0,
        }

        this.__updateSheetItem = this.__updateSheetItem.bind(this);
    }

    componentDidMount() {
        this.loadSheetItems(this.props.sheet_id);
    }

    loadSheetItems = (sheet_id) => {
        getSheetItems(sheet_id).then((sheetItems) => {
            let tempItems = [];
            let sheetItemFocus = [];
            let rowResult = [0, 0, 0, 0, 0];
            let flagIndexRowResult = 0;

            sheetItems.map((sheetItem, index) => {

                if(index === 0){
                    sheetItemFocus.push({
                        autoFocus: true,
                    })
                }else{
                    sheetItemFocus.push({ autoFocus: false })
                }

                tempItems.push({
                    s_is: sheetItem.id,
                    value: sheetItem.value,
                })

                if(index % 5 === 0 && index !== 0){
                    flagIndexRowResult = flagIndexRowResult + 1;
                }

                let tempValue = Helpers.ConvertStringToInt(sheetItem.value);

                rowResult[flagIndexRowResult] = parseInt(rowResult[flagIndexRowResult]) + parseInt(tempValue);

            })

            this.setState({ sheetItems, tempSheetItems: tempItems, sheetItemFocus, rowResult });
        }).catch((error) => {
            console.log(error);
        })
    }

    __updateSheetItem = (value, iFor) => {
        let { tempSheetItems, sheetItemFocus, rowResult } = this.state;
        tempSheetItems[iFor].value = value;

        let lengthInput = this.props.qcmc === '0' ? 2 : 3;

        if(lengthInput === value.length){
            if(iFor !== 24){
                this.refs['next'+(iFor+1)].focus();
                sheetItemFocus[iFor + 1].autoFocus = true;
            }
            if(iFor === 24){
                this.props.handleUpdateIsCreateNewSheet(true, this.props.sheet_no);
            }
            sheetItemFocus[iFor].autoFocus = false;

            updateSheetItem(tempSheetItems[iFor].s_is, value.toString()).then((result) => {

            }).catch((error) => {
                console.log('Error update sheet item: ', error);
            })
        }

        // update by row
        let result = 0;
        for(let i = 0; i < 25; i++)
        {
            if(Math.floor(i / 5) === this.__detectRowCalculate(iFor)){
                let tempValue = Helpers.ConvertStringToInt(tempSheetItems[i].value);

                result = result + parseInt(tempValue);
            }
        }

        rowResult[this.__detectRowCalculate(iFor)] = result;

        this.setState({ tempSheetItems, sheetItemFocus, rowResult });

    }

    __focusNextField = (nextField) => {
        this.refs[nextField].focus();
    }

    __detectRowCalculate = (needRow) => {
        return Math.floor(needRow / 5);
    }

    __renderBoxContent = (iFor) => {
        let content = [];

        let tempSheetItems = this.state.tempSheetItems;

        if(tempSheetItems.length > 0)
        {
            for(let i = (iFor * 5); i < (iFor * 5) + 5; i++)
            {
                content[i] = (
                    <View style={[styles.rowItem]} key={ 'box_' + i }>
                        <TextInput
                            style={[DefaultStyle.InputNumber, styles.textInput]}
                            keyboardType='numeric'
                            value={tempSheetItems[i].value}
                            autoFocus = { this.state.sheetItemFocus[i].autoFocus }
                            // returnKeyType = {"next" + i}
                            ref = {"next" + i}
                            //blurOnSubmit={false}
                            //onSubmitEditing={() => this.__focusNextField(i)}
                            //onChangeText={(text) => { this.__updateSheetItem(text, i) }}
                            //blurOnSubmit={false}
                            onChangeText={(val) => {
                                this.__updateSheetItem(val, i)
                            }}
                        />
                    </View>
                )
            }
        }
        return content;
    }

    __renderRowResult = () => {
        let arrRowResult = [];
        for(let i = 0; i < 5; i++){
            arrRowResult.push(
                <View key={'row_result' + i} style={[styles.result]}>
                    <Text style={styles.textResult}>{ this.state.rowResult[i] }</Text>
                </View>
            )
        }

        return arrRowResult;
    }

    render () {
        let contentRender = [];

        for(let i = 0; i < 5; i++)
        {
            contentRender[i] = (
                <View style={[styles.rowColumn]} key={'row_' + i}>
                    { this.__renderBoxContent(i) }
                </View>
            );
        }

        return (
            <View>
                <View style={[styles.row, {alignItems: 'center', justifyContent: 'center'}]}>
                    <Text style={{textAlign: 'center', fontSize: 22, fontWeight: 'bold'}}>Trang Tính { this.props.sheet_no }</Text>
                </View>
                <View style={[styles.row]}>
                    <View style={[styles.result]}>
                        <Text style={styles.textResult}>C1</Text>
                    </View>
                    <View style={[styles.result, {borderLeftWidth: 1, borderLeftColor: Color.White}]}>
                        <Text style={styles.textResult}>C2</Text>
                    </View>
                    <View style={[styles.result, {borderLeftWidth: 1, borderLeftColor: Color.White}]}>
                        <Text style={styles.textResult}>C3</Text>
                    </View>
                    <View style={[styles.result, {borderLeftWidth: 1, borderLeftColor: Color.White}]}>
                        <Text style={styles.textResult}>C4</Text>
                    </View>
                    <View style={[styles.result, {borderLeftWidth: 1, borderLeftColor: Color.White}]}>
                        <Text style={styles.textResult}>C5</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row'}}>
                    {contentRender}
                </View>
                <View style={[styles.row]}>
                    { this.__renderRowResult() }
                </View>
            </View>
        )
    }
}

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
    rowColumn: {
        width: '20%',
        flexDirection: 'column',
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    textInput: {
        width: 60,
        textAlign: 'center',
        height: 40,
        fontSize: 20,
        backgroundColor: Color.Sliver3,
        color: Color.Black,
        fontWeight: 'bold',
    },
    textResult: {
        fontWeight: 'bold',
        fontSize: 18,
    }
})
