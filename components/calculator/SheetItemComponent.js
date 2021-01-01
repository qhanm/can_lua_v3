import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {Color, DefaultStyle} from "../../utils/Constant";
import {getSheetItems, updateIsCalculateCustomer, updateSheetItem, updateToTalResultSheet} from "../../databases/Setup";
import Helpers from "../../utils/Helper";

export default class SheetItemComponent extends React.Component
{
    _isSetState = false;
    constructor(props) {
        super(props);
        this.state = {
            sheetItems: [],
            tempSheetItems: [],
            sheetItemFocus: [],
            rowResult: [],
            totalResult: 0,
            is_calculate: this.props.is_calculate,
            qcmc: this.props.qcmc,
        }

        this.__updateSheetItem = this.__updateSheetItem.bind(this);
    }

    componentDidMount() {
        this._isSetState = true;
        this.loadSheetItems(this.props.sheet_id);
    }

    componentWillUnmount() {
        this._isSetState = false;
    }

    loadSheetItems = (sheet_id) => {
        getSheetItems(sheet_id).then((sheetItems) => {
            let tempItems = [];
            let sheetItemFocus = [];
            let rowResult = [0, 0, 0, 0, 0];
            let flagIndexRowResult = 0;
            let totalResult = 0;
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
            totalResult = (rowResult.reduce((a, b) => a + b, 0));

            if(this._isSetState === true){
                this.setState({ sheetItems, tempSheetItems: tempItems, sheetItemFocus, rowResult, totalResult });
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    __updateSheetItem = (value, iFor) => {
        let { tempSheetItems, sheetItemFocus, rowResult, totalResult, is_calculate } = this.state;
        tempSheetItems[iFor].value = value;

        let lengthInput = this.state.qcmc == 0 ? 2 : 3;
        console.log(this.state.qcmc, lengthInput);
        if(lengthInput <= value.length){
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
        let totalBao = 0;
        for(let i = 0; i < 25; i++)
        {
            if(Math.floor(i / 5) === this.__detectRowCalculate(iFor)){
                let tempValue = Helpers.ConvertStringToInt(tempSheetItems[i].value);

                result = result + parseInt(tempValue);
            }

            if(
                !isNaN(tempSheetItems[i].value)
                && !(tempSheetItems[i].value === '')
                && !(tempSheetItems[i].value === null)
                && !(tempSheetItems[i].value === undefined)
            ){
                totalBao = totalBao + 1;
            }
        }

        rowResult[this.__detectRowCalculate(iFor)] = result;
        totalResult = (rowResult.reduce((a, b) => a + b, 0));
        updateToTalResultSheet(this.props.sheet_id, totalResult, totalBao).then((result) => { }).catch((error) => {
            console.log(error);
        })

        // update is calculate for customer
        if(is_calculate === 0){
            updateIsCalculateCustomer(this.props.customer_id, 1).then((result) => { }).catch((error) => {
                console.log(error);
            })
        }

        if(this._isSetState === true){
            this.setState({ tempSheetItems, sheetItemFocus, rowResult, totalResult, is_calculate: 1 });
        }
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
                let customStyle;

                let min = this.state.qcmc == 0 ? 40 : 400;
                let max = this.state.qcmc == 0 ? 80 : 800;

                if((Helpers.ConvertStringToInt(tempSheetItems[i].value) >= max || Helpers.ConvertStringToInt(tempSheetItems[i].value) <= min) && tempSheetItems[i].value !== ''){
                    customStyle = [DefaultStyle.InputNumber, styles.textInputRed];
                }else{
                    customStyle = [DefaultStyle.InputNumber, styles.textInput];
                }

                content[i] = (
                    <View style={[styles.rowItem]} key={ 'box_' + i }>
                        <TextInput
                            style={customStyle}
                            keyboardType='numeric'
                            value={tempSheetItems[i].value}
                            autoFocus = { this.state.sheetItemFocus[i].autoFocus }
                            // returnKeyType = {"next" + i}
                            ref = {"next" + i}
                            //onSubmitEditing={() => this.__focusNextField(i)}
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
                <View style={[styles.row, { width: '100%' }]}>
                    <View style={[styles.result, { width: '100%' }]}>
                        <Text style={styles.textResult}>{ this.state.totalResult }</Text>
                    </View>
                </View>
            </View>
        )
    }
}

let styles = StyleSheet.create({
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
    textInputRed: {
        width: 60,
        textAlign: 'center',
        height: 40,
        fontSize: 20,
        backgroundColor: Color.Red,
        color: Color.Black,
        fontWeight: 'bold',
    },
    textResult: {
        fontWeight: 'bold',
        fontSize: 18,
    }
})
